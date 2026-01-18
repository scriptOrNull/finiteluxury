-- Add collection tags to products table
ALTER TABLE public.products
ADD COLUMN is_new_arrival boolean NOT NULL DEFAULT false,
ADD COLUMN is_best_seller boolean NOT NULL DEFAULT false,
ADD COLUMN is_on_sale boolean NOT NULL DEFAULT false,
ADD COLUMN sale_price integer DEFAULT NULL;