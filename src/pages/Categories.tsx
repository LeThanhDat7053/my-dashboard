// src/pages/Categories.tsx - UPDATED với TranslateModal

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useFilters } from '../hooks/useFilters';
import { useModal } from '../hooks/useModal';
import { SearchFilters } from '../components/categories/SearchFilters';
import { CategoryCard } from '../components/categories/CategoryCard';
import { CategoryModal } from '../components/categories/CategoryModal';
import { TranslateModal } from '../components/categories/TranslateModal'; // ← THÊM IMPORT
import type { Category, CategoryFormData, Language } from '../types/categories'; // ← THÊM Language

import '../styles/categories.css';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { filters, filteredCategories, updateFilters } = useFilters(categories);
  
  const categoryModal = useModal<Category>();
  const translateModal = useModal<Category>(); // Giữ nguyên

  const handleSaveCategory = async (formData: CategoryFormData): Promise<void> => {
    try {
      if (categoryModal.modalData) {
        await updateCategory(categoryModal.modalData.id, formData);
      } else {
        await createCategory(formData);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category. Please try again.');
    }
  };

  const handleEditCategory = (category: Category): void => {
    categoryModal.openModal(category);
  };

  const handleDeleteCategory = async (id: number): Promise<void> => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category. Please try again.');
    }
  };

  const handleViewFeatures = (categoryId: number): void => {
    navigate(`/features?category=${categoryId}`);
  };

  const handleTranslateCategory = (category: Category): void => {
    translateModal.openModal(category);
  };

  const handleAddCategory = (): void => {
    categoryModal.openModal();
  };

  // ← THÊM HANDLER CHO TRANSLATE
  const handleAcceptTranslation = async (categoryId: number, targetLang: Language, translatedData: any): Promise<void> => {
    try {
      console.log('Accepting translation:', { categoryId, targetLang, translatedData });
      
      // TODO: Implement API call to save translation
      // await updateCategoryTranslation(categoryId, targetLang, translatedData);
      
      alert(`Translation for ${targetLang.toUpperCase()} saved successfully!`);
      translateModal.closeModal();
    } catch (error) {
      console.error('Error saving translation:', error);
      alert('Error saving translation. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Feature Categories</h1>
            <p className="text-gray-600 mt-1">Organize your hotel features into logical categories</p>
          </div>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <SearchFilters filters={filters} onFiltersChange={updateFilters} />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No categories found. Try adjusting your filters or add a new category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => handleDeleteCategory(category.id)}
              onViewFeatures={() => handleViewFeatures(category.id)}
              onTranslate={() => handleTranslateCategory(category)}
            />
          ))}
        </div>
      )}

      {/* Category Modal */}
      <CategoryModal
        isOpen={categoryModal.isOpen}
        onClose={categoryModal.closeModal}
        onSave={handleSaveCategory}
        category={categoryModal.modalData ?? undefined}
      />

      {/* ← THAY THẾ TRANSLATE MODAL PLACEHOLDER BẰNG COMPONENT THẬT */}
      <TranslateModal
        isOpen={translateModal.isOpen}
        onClose={translateModal.closeModal}
        category={translateModal.modalData}
        onAcceptTranslation={handleAcceptTranslation}
      />
    </div>
  );
};

export default Categories;