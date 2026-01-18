import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  onToggleCategory,
  onSelectAll,
  onClearAll,
}: CategoryFilterProps) => {
  const allSelected = selectedCategories.length === categories.length;
  const noneSelected = selectedCategories.length === 0;

  return (
    <div className="bg-muted/30 border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-light tracking-[0.15em] uppercase">
          Filter by Category
        </h3>
        <div className="flex gap-3">
          <button
            onClick={onSelectAll}
            className={`text-xs tracking-wide uppercase transition-opacity ${
              allSelected ? 'opacity-40' : 'opacity-70 hover:opacity-100'
            }`}
            disabled={allSelected}
          >
            Select All
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={onClearAll}
            className={`text-xs tracking-wide uppercase transition-opacity ${
              noneSelected ? 'opacity-40' : 'opacity-70 hover:opacity-100'
            }`}
            disabled={noneSelected}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category) => {
          const isChecked = selectedCategories.includes(category.id);
          return (
            <div
              key={category.id}
              className={`flex items-center gap-3 p-3 border transition-all cursor-pointer ${
                isChecked
                  ? 'border-foreground bg-foreground/5'
                  : 'border-border hover:border-foreground/50'
              }`}
              onClick={() => onToggleCategory(category.id)}
            >
              <Checkbox
                id={`cat-${category.id}`}
                checked={isChecked}
                onCheckedChange={() => onToggleCategory(category.id)}
                className="data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
              />
              <Label
                htmlFor={`cat-${category.id}`}
                className="text-xs tracking-wide uppercase cursor-pointer flex-1"
              >
                {category.name}
              </Label>
            </div>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Showing {selectedCategories.length} of {categories.length} categories
        </p>
      )}
    </div>
  );
};

export default CategoryFilter;
