
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface CategoryDropdownProps {
  category: string;
  subcategories: string[];
  onCategorySelect: (category: string, subcategory?: string) => void;
  isSelected: boolean;
}

const CategoryDropdown = ({ category, subcategories, onCategorySelect, isSelected }: CategoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 ${
            isSelected ? "bg-black text-white hover:bg-gray-800" : "text-gray-700"
          }`}
        >
          {category}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white border border-gray-200 shadow-lg z-50"
        align="start"
      >
        <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Browse {category}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onCategorySelect(category)}
          className="font-medium text-black hover:bg-gray-50 cursor-pointer"
        >
          All {category}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {subcategories.map((subcategory) => (
          <DropdownMenuItem
            key={subcategory}
            onClick={() => onCategorySelect(category, subcategory)}
            className="text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            {subcategory}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
