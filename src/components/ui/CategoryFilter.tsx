import { Category } from '@/types/wordpress';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryIds: string[]) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}: CategoryFilterProps) {
  
  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onCategoryChange(newSelection);
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-[#010B24] mb-4">Filters</h3>
            {/* Clear Filters */}
            {selectedCategories.length > 0 && (
                <button
                onClick={clearAllFilters}
                className="text-sm text-[#010B24] cursor-pointer underline"
                >
                Clear all filters
                </button>
            )}
        </div>

        {/* Category Bubbles */}
        <div className="space-y-2 flex flex-wrap">
            {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            
            return (
                <button
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`
                    text-left px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isSelected 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                `}
                >
                <span className="flex items-center justify-between gap-2">
                    <span>{category.name}</span>
                    {category.count && (
                    <span className={`text-xs ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                        {category.count}
                    </span>
                    )}
                </span>
                </button>
            );
            })}
        </div>

        {/* Mobile: Show selected categories count */}
        {selectedCategories.length > 0 && (
            <div className="lg:hidden bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
                {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
            </p>
            </div>
        )}
    </div>
  );
}
