import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
}

interface CSVProductImportProps {
  categories: Category[];
  onImportComplete: () => void;
}

interface ParsedProduct {
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  sale_price: number | null;
  image_url: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

const CSVProductImport = ({ categories, onImportComplete }: CSVProductImportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<ParsedProduct[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const headers = [
      'name',
      'price',
      'category',
      'sizes',
      'colors',
      'description',
      'is_new_arrival',
      'is_best_seller',
      'is_on_sale',
      'sale_price',
      'image_url'
    ];
    
    const exampleRows = [
      'Black Oxford Shirt,25000,Shirts,"S,M,L,XL","Black,White",Premium cotton oxford shirt,true,false,false,,https://example.com/image.jpg',
      'White Sneakers,45000,Shoes,"40,41,42,43,44",White,Classic leather sneakers,false,true,true,38000,https://example.com/sneakers.jpg'
    ];
    
    const csvContent = [headers.join(','), ...exampleRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): ParsedProduct[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const products: ParsedProduct[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length < 3) continue;
      
      products.push({
        name: values[0]?.trim() || '',
        price: parseInt(values[1]) || 0,
        category: values[2]?.trim() || '',
        sizes: values[3] ? values[3].split(',').map(s => s.trim()).filter(Boolean) : [],
        colors: values[4] ? values[4].split(',').map(s => s.trim()).filter(Boolean) : [],
        description: values[5]?.trim() || '',
        is_new_arrival: values[6]?.toLowerCase() === 'true',
        is_best_seller: values[7]?.toLowerCase() === 'true',
        is_on_sale: values[8]?.toLowerCase() === 'true',
        sale_price: values[9] ? parseInt(values[9]) : null,
        image_url: values[10]?.trim() || '',
      });
    }
    
    return products;
  };

  // Handle CSV values with quotes and commas
  const parseCSVLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    
    return values;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      toast.error('Please select a CSV file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setPreview(parsed);
      setImportResult(null);
    };
    reader.readAsText(file);
  };

  const findCategoryId = (categoryName: string): string | null => {
    const category = categories.find(
      c => c.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category?.id || null;
  };

  const importProducts = async () => {
    if (preview.length === 0) {
      toast.error('No products to import');
      return;
    }
    
    setImporting(true);
    const result: ImportResult = { success: 0, failed: 0, errors: [] };
    
    for (const product of preview) {
      // Validate required fields
      if (!product.name) {
        result.failed++;
        result.errors.push(`Missing name for product`);
        continue;
      }
      
      if (!product.price || product.price <= 0) {
        result.failed++;
        result.errors.push(`Invalid price for "${product.name}"`);
        continue;
      }
      
      const categoryId = findCategoryId(product.category);
      if (!categoryId) {
        result.failed++;
        result.errors.push(`Category "${product.category}" not found for "${product.name}". Create it first.`);
        continue;
      }
      
      const productData = {
        name: product.name,
        price: product.price,
        category_id: categoryId,
        images: product.image_url ? [product.image_url] : [],
        sizes: product.sizes.length > 0 ? product.sizes : ['One Size'],
        colors: product.colors.length > 0 ? product.colors : null,
        description: product.description || null,
        is_active: true,
        is_new_arrival: product.is_new_arrival,
        is_best_seller: product.is_best_seller,
        is_on_sale: product.is_on_sale,
        sale_price: product.sale_price,
      };
      
      const { error } = await supabase.from('products').insert(productData);
      
      if (error) {
        result.failed++;
        result.errors.push(`Failed to import "${product.name}": ${error.message}`);
      } else {
        result.success++;
      }
    }
    
    setImporting(false);
    setImportResult(result);
    
    if (result.success > 0) {
      toast.success(`Imported ${result.success} product${result.success > 1 ? 's' : ''}`);
      onImportComplete();
    }
    
    if (result.failed > 0) {
      toast.error(`Failed to import ${result.failed} product${result.failed > 1 ? 's' : ''}`);
    }
  };

  const resetImport = () => {
    setPreview([]);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetImport();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload size={16} className="mr-2" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Products from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to bulk import products. Download the template first to see the required format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Step 1: Download Template */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Step 1: Download Template</h4>
            <Button variant="outline" onClick={downloadTemplate} className="w-full">
              <Download size={16} className="mr-2" />
              Download CSV Template
            </Button>
            <p className="text-xs text-muted-foreground">
              Use this template to format your products. Categories must match existing category names exactly.
            </p>
          </div>
          
          {/* Available Categories */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.length === 0 ? (
                <p className="text-xs text-muted-foreground">No categories yet. Create categories first.</p>
              ) : (
                categories.map(cat => (
                  <span key={cat.id} className="text-xs bg-muted px-2 py-1 rounded">
                    {cat.name}
                  </span>
                ))
              )}
            </div>
          </div>
          
          {/* Step 2: Upload File */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Step 2: Upload CSV File</h4>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <FileSpreadsheet size={32} className="text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to select CSV file</span>
            </label>
          </div>
          
          {/* Preview */}
          {preview.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Preview ({preview.length} products)</h4>
              <div className="border border-border rounded-lg max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((p, i) => {
                      const categoryExists = findCategoryId(p.category);
                      return (
                        <tr key={i} className="border-t border-border">
                          <td className="p-2">{p.name || <span className="text-destructive">Missing</span>}</td>
                          <td className="p-2">₦{p.price.toLocaleString()}</td>
                          <td className="p-2">
                            <span className={categoryExists ? 'text-green-600' : 'text-destructive'}>
                              {p.category || 'Missing'}
                            </span>
                          </td>
                          <td className="p-2">
                            {categoryExists && p.name && p.price > 0 ? (
                              <CheckCircle size={14} className="text-green-600" />
                            ) : (
                              <AlertCircle size={14} className="text-destructive" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Import Result */}
          {importResult && (
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  <span className="text-green-600 font-medium">{importResult.success}</span> imported
                </span>
                <span className="text-sm">
                  <span className="text-destructive font-medium">{importResult.failed}</span> failed
                </span>
              </div>
              {importResult.errors.length > 0 && (
                <div className="text-xs text-destructive space-y-1 max-h-24 overflow-y-auto">
                  {importResult.errors.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            {preview.length > 0 && !importResult && (
              <Button onClick={importProducts} disabled={importing}>
                {importing ? 'Importing...' : `Import ${preview.length} Products`}
              </Button>
            )}
            {importResult && (
              <Button onClick={resetImport}>
                Import More
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CSVProductImport;
