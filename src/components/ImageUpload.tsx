import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const filePath = `products/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        newImages.push(urlData.publicUrl);
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
        toast.success(`${newImages.length} image(s) uploaded`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-3">
      {/* Image Previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="w-20 h-20 border border-border overflow-hidden">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 p-1 bg-background border border-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-20 border-dashed"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                Uploading...
              </span>
            ) : (
              <span className="flex flex-col items-center gap-1">
                <Upload size={20} />
                <span className="text-xs">
                  Click to upload ({images.length}/{maxImages})
                </span>
              </span>
            )}
          </Button>
        </div>
      )}

      {images.length === 0 && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ImageIcon size={12} />
          Upload product images (max 5MB each)
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
