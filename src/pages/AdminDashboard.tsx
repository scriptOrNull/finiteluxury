import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, LogOut, Package, Tags } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';
import CSVProductImport from '@/components/CSVProductImport';

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  images: string[];
  sizes: string[];
  colors: string[] | null;
  description: string | null;
  is_active: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  sale_price: number | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category_id: '',
    images: [] as string[],
    sizes: '',
    colors: '',
    description: '',
    is_active: true,
    is_new_arrival: false,
    is_best_seller: false,
    is_on_sale: false,
    sale_price: '',
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  // Quick add category dialog
  const [showQuickAddCategory, setShowQuickAddCategory] = useState(false);
  const [quickCategoryName, setQuickCategoryName] = useState('');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      toast.error('Failed to fetch categories');
      return;
    }
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to fetch products');
      return;
    }
    setProducts(data || []);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: productForm.name.trim(),
      price: parseInt(productForm.price),
      category_id: productForm.category_id,
      images: productForm.images,
      sizes: productForm.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: productForm.colors ? productForm.colors.split(',').map(s => s.trim()).filter(Boolean) : null,
      description: productForm.description.trim() || null,
      is_active: productForm.is_active,
      is_new_arrival: productForm.is_new_arrival,
      is_best_seller: productForm.is_best_seller,
      is_on_sale: productForm.is_on_sale,
      sale_price: productForm.sale_price ? parseInt(productForm.sale_price) : null,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      
      if (error) {
        toast.error('Failed to update product');
        return;
      }
      toast.success('Product updated');
    } else {
      const { error } = await supabase
        .from('products')
        .insert(productData);
      
      if (error) {
        toast.error('Failed to create product');
        return;
      }
      toast.success('Product created');
    }

    resetProductForm();
    fetchProducts();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name: categoryForm.name.trim(),
      description: categoryForm.description.trim() || null,
    };

    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', editingCategory.id);
      
      if (error) {
        toast.error('Failed to update category');
        return;
      }
      toast.success('Category updated');
    } else {
      const { error } = await supabase
        .from('categories')
        .insert(categoryData);
      
      if (error) {
        if (error.message.includes('duplicate')) {
          toast.error('Category already exists');
        } else {
          toast.error('Failed to create category');
        }
        return;
      }
      toast.success('Category created');
    }

    resetCategoryForm();
    fetchCategories();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete product');
      return;
    }
    toast.success('Product deleted');
    fetchProducts();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('This will delete all products in this category. Continue?')) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete category');
      return;
    }
    toast.success('Category deleted');
    fetchCategories();
    fetchProducts();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      category_id: '',
      images: [],
      sizes: '',
      colors: '',
      description: '',
      is_active: true,
      is_new_arrival: false,
      is_best_seller: false,
      is_on_sale: false,
      sale_price: '',
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  const handleQuickAddCategory = async () => {
    if (!quickCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({ name: quickCategoryName.trim() })
      .select()
      .single();

    if (error) {
      if (error.message.includes('duplicate')) {
        toast.error('Category already exists');
      } else {
        toast.error('Failed to create category');
      }
      return;
    }

    toast.success('Category created');
    setQuickCategoryName('');
    setShowQuickAddCategory(false);
    fetchCategories();
    
    // Auto-select the new category
    if (data) {
      setProductForm(p => ({ ...p, category_id: data.id }));
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category_id: product.category_id,
      images: product.images,
      sizes: product.sizes.join(', '),
      colors: product.colors?.join(', ') || '',
      description: product.description || '',
      is_active: product.is_active,
      is_new_arrival: product.is_new_arrival,
      is_best_seller: product.is_best_seller,
      is_on_sale: product.is_on_sale,
      sale_price: product.sale_price?.toString() || '',
    });
    setShowProductForm(true);
  };

  const editCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || '',
    });
    setShowCategoryForm(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-light tracking-[0.15em] uppercase">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              View Store
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-2 text-sm tracking-wider uppercase flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package size={16} />
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 px-2 text-sm tracking-wider uppercase flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'categories'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Tags size={16} />
            Categories ({categories.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-lg font-light">Manage Products</h2>
              <div className="flex gap-2">
                <CSVProductImport 
                  categories={categories} 
                  onImportComplete={fetchProducts} 
                />
                <Button onClick={() => setShowProductForm(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <form onSubmit={handleProductSubmit} className="border border-border p-6 mb-8 space-y-4">
                <h3 className="text-sm tracking-wider uppercase mb-4">
                  {editingProduct ? 'Edit Product' : 'New Product'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name *</Label>
                    <Input
                      value={productForm.name}
                      onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Black Oxford Shirt"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Price (NGN) *</Label>
                    <Input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm(p => ({ ...p, price: e.target.value }))}
                      placeholder="25000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <div className="flex gap-2">
                      <Select
                        value={productForm.category_id}
                        onValueChange={(v) => setProductForm(p => ({ ...p, category_id: v }))}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length === 0 ? (
                            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                              No categories yet
                            </div>
                          ) : (
                            categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <Dialog open={showQuickAddCategory} onOpenChange={setShowQuickAddCategory}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" size="icon" title="Add new category">
                            <Plus size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Quick Add Category</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label>Category Name</Label>
                              <Input
                                value={quickCategoryName}
                                onChange={(e) => setQuickCategoryName(e.target.value)}
                                placeholder="e.g., Shirts, Shoes, Accessories"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleQuickAddCategory();
                                  }
                                }}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button type="button" variant="outline" onClick={() => setShowQuickAddCategory(false)}>
                                Cancel
                              </Button>
                              <Button type="button" onClick={handleQuickAddCategory}>
                                Create
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sizes (comma-separated) *</Label>
                    <Input
                      value={productForm.sizes}
                      onChange={(e) => setProductForm(p => ({ ...p, sizes: e.target.value }))}
                      placeholder="S, M, L, XL"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Product Images *</Label>
                    <ImageUpload
                      images={productForm.images}
                      onImagesChange={(images) => setProductForm(p => ({ ...p, images }))}
                      maxImages={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Colors (comma-separated)</Label>
                    <Input
                      value={productForm.colors}
                      onChange={(e) => setProductForm(p => ({ ...p, colors: e.target.value }))}
                      placeholder="Black, White"
                    />
                  </div>
                  
                  <div className="space-y-2 flex items-center gap-3 pt-6">
                    <Switch
                      checked={productForm.is_active}
                      onCheckedChange={(c) => setProductForm(p => ({ ...p, is_active: c }))}
                    />
                    <Label>Active (visible in store)</Label>
                  </div>

                  {/* Collection Tags */}
                  <div className="md:col-span-2 border border-border p-4 space-y-4">
                    <Label className="text-sm tracking-wider uppercase">Collection Tags</Label>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={productForm.is_new_arrival}
                          onCheckedChange={(c) => setProductForm(p => ({ ...p, is_new_arrival: c }))}
                        />
                        <Label>New Arrival</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={productForm.is_best_seller}
                          onCheckedChange={(c) => setProductForm(p => ({ ...p, is_best_seller: c }))}
                        />
                        <Label>Best Seller</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={productForm.is_on_sale}
                          onCheckedChange={(c) => setProductForm(p => ({ ...p, is_on_sale: c }))}
                        />
                        <Label>On Sale</Label>
                      </div>
                    </div>
                    {productForm.is_on_sale && (
                      <div className="space-y-2 max-w-xs">
                        <Label>Sale Price (NGN)</Label>
                        <Input
                          type="number"
                          value={productForm.sale_price}
                          onChange={(e) => setProductForm(p => ({ ...p, sale_price: e.target.value }))}
                          placeholder="Sale price"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                      placeholder="Product description..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetProductForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Products List */}
            {products.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border">
                <Package size={40} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No products yet</p>
                <p className="text-sm text-muted-foreground">Add your first product to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => {
                  const category = categories.find(c => c.id === product.category_id);
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-4 p-4 border border-border ${
                        !product.is_active ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {category?.name || 'No category'} • {formatPrice(product.price)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Sizes: {product.sizes.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => editProduct(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-light">Manage Categories</h2>
              <Button onClick={() => setShowCategoryForm(true)}>
                <Plus size={16} className="mr-2" />
                Add Category
              </Button>
            </div>

            {/* Category Form */}
            {showCategoryForm && (
              <form onSubmit={handleCategorySubmit} className="border border-border p-6 mb-8 space-y-4">
                <h3 className="text-sm tracking-wider uppercase mb-4">
                  {editingCategory ? 'Edit Category' : 'New Category'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category Name *</Label>
                    <Input
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm(c => ({ ...c, name: e.target.value }))}
                      placeholder="Shirts"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm(c => ({ ...c, description: e.target.value }))}
                      placeholder="Premium tailored shirts for the modern gentleman"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit">
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetCategoryForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Categories List */}
            {categories.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border">
                <Tags size={40} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No categories yet</p>
                <p className="text-sm text-muted-foreground">Add categories before adding products</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const productCount = products.filter(p => p.category_id === category.id).length;
                  return (
                    <div key={category.id} className="border border-border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.description || 'No description'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {productCount} product{productCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => editCategory(category)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteCategory(category.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
