// src/hooks/useCategories.ts

import { useState, useEffect } from 'react';
import type { Category, CategoryFormData } from '../types/categories';
import { mockCategories } from '../data/mockCategories';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  createCategory: (formData: CategoryFormData) => Promise<Category>;
  updateCategory: (id: number, formData: CategoryFormData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const createCategory = async (formData: CategoryFormData): Promise<Category> => {
    const newCategory: Category = {
      id: Date.now(),
      slug: formData.slug,
      icon: formData.icon,
      status: 'active',
      type: 'custom',
      featureCount: 0,
      translations: formData.translations
    };
    
    setCategories((prev: Category[]) => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = async (id: number, formData: CategoryFormData): Promise<Category> => {
    let updatedCategory: Category | null = null;
    
    setCategories((prev: Category[]) => 
      prev.map((cat: Category) => {
        if (cat.id === id) {
          updatedCategory = {
            ...cat,
            slug: formData.slug,
            icon: formData.icon,
            translations: formData.translations
          };
          return updatedCategory;
        }
        return cat;
      })
    );
    
    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    return updatedCategory;
  };

  const deleteCategory = async (id: number): Promise<void> => {
    setCategories((prev: Category[]) => prev.filter((cat: Category) => cat.id !== id));
  };

  return {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory
  };
};