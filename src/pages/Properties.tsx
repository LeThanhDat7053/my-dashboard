// src/pages/Properties.tsx - Updated with wrapper class
import React, { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import { SearchFilters } from "../components/properties/SearchFilters";
import { HotelItem } from "../components/properties/HotelItem";
import { AddHotelModal } from "../components/properties/AddHotelModal";
import { EditHotelPostModal } from "../components/properties/EditHotelPostModal";
import { TranslateModal } from "../components/properties/TranslateModal";
import type { HotelPost, TranslationData } from "../types/properties";
import {
  faHotel,
  faHome,
  faLayerGroup,
  faPuzzlePiece,
  faBuilding,
  faImages,
  faChartBar,
  faUsers,
  faCog,
  faSignOutAlt,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Properties.css";

const Properties: React.FC = () => {
  const {
    hotels,
    loading,
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    createHotel,
    createHotelPost,
    updateHotelPost,
    deleteHotelPost,
    translatePost,
    toggleHotelExpansion,
    isHotelExpanded,
  } = useProperties();

  // Modal states
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);

  // Current editing states
  const [currentEditingPost, setCurrentEditingPost] = useState<HotelPost | null>(null);
  const [currentTranslatingPost, setCurrentTranslatingPost] = useState<HotelPost | null>(null);
  const [currentHotelId, setCurrentHotelId] = useState<string>("");

  // Notification system
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers
  const handleOpenAddHotelModal = () => setIsAddHotelModalOpen(true);
  const handleCloseAddHotelModal = () => setIsAddHotelModalOpen(false);

  const handleAddPost = (hotelId: string) => {
    setCurrentHotelId(hotelId);
    setCurrentEditingPost(null);
    setIsEditPostModalOpen(true);
  };

  const handleEditPost = (post: HotelPost) => {
    setCurrentEditingPost(post);
    setCurrentHotelId(post.hotelId);
    setIsEditPostModalOpen(true);
  };

  const handleTranslatePost = (post: HotelPost) => {
    setCurrentTranslatingPost(post);
    setIsTranslateModalOpen(true);
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this hotel post?")) {
      try {
        await deleteHotelPost(postId);
        showNotification("Hotel post deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting post:", error);
        showNotification("Error deleting post. Please try again.", "error");
      }
    }
  };

  const handleSaveHotel = async (formData: any) => {
    try {
      await createHotel(formData);
      handleCloseAddHotelModal();
      showNotification("Hotel created successfully!", "success");
    } catch (error) {
      console.error("Error creating hotel:", error);
      showNotification("Error creating hotel. Please try again.", "error");
    }
  };

  const handleSavePost = async (postData: HotelPost) => {
    try {
      if (currentEditingPost) {
        await updateHotelPost(postData);
      } else {
        await createHotelPost(currentHotelId, {
          title: postData.title,
          content: postData.content,
          locale: postData.locale,
          status: postData.status,
          address: postData.address,
          phone: postData.phone,
          vrLink: postData.vrLink,
        });
      }
      setIsEditPostModalOpen(false);
      setCurrentEditingPost(null);
      setCurrentHotelId("");
      showNotification("Hotel post saved successfully!", "success");
    } catch (error) {
      console.error("Error saving post:", error);
      showNotification("Error saving post. Please try again.", "error");
    }
  };

  const handleAcceptTranslation = async (translationData: TranslationData) => {
    if (!currentTranslatingPost) return;
    try {
      await translatePost(currentTranslatingPost.id, translationData);
      setIsTranslateModalOpen(false);
      setCurrentTranslatingPost(null);
      showNotification("Translation accepted! New post created successfully.", "success");
    } catch (error) {
      console.error("Error creating translation:", error);
      showNotification("Error creating translation. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="properties-loading">
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
        <p>Loading hotels...</p>
      </div>
    );
  }

  return (
    // Thêm wrapper class để target CSS
    <div className="properties-page">
      <div className="app-layout"  style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">
                <FontAwesomeIcon icon={faHotel} />
              </div>
              <div className="logo-text">HotelLink360</div>
            </div>
          </div>

          <div className="property-selector">
            <div className="property-label">Current Property</div>
            <div className="property-name">Tabi Tower Hotel</div>
          </div>

          <nav className="nav-menu">
            <div className="nav-section">
              <div className="nav-section-title">Main</div>
              <a href="/dashboard" className="nav-item">
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </a>
              <a href="/categories" className="nav-item">
                <FontAwesomeIcon icon={faLayerGroup} /> Categories
              </a>
              <a href="/features" className="nav-item">
                <FontAwesomeIcon icon={faPuzzlePiece} /> Features
              </a>
              <a href="/properties" className="nav-item active">
                <FontAwesomeIcon icon={faBuilding} /> Properties
              </a>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Content</div>
              <a href="/media" className="nav-item">
                <FontAwesomeIcon icon={faImages} /> Media Library
              </a>
              <a href="/analytics" className="nav-item">
                <FontAwesomeIcon icon={faChartBar} /> Analytics
              </a>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Management</div>
              <a href="/users" className="nav-item">
                <FontAwesomeIcon icon={faUsers} /> Users & Roles
              </a>
              <a href="/settings" className="nav-item">
                <FontAwesomeIcon icon={faCog} /> Settings
              </a>
              <a href="/login" className="nav-item logout">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </a>
            </div>
          </nav>
        </div>

        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">Hotel Properties</h1>
            <div className="breadcrumb">Home / Hotels</div>
          </div>

          <div className="header-right">
            <button className="btn-primary" onClick={handleOpenAddHotelModal}>
              <FontAwesomeIcon icon={faPlus} /> Add Hotel
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="hotels-header">
            <div>
              <h2 className="hotels-title">Hotel Properties & Information</h2>
              <p className="hotels-subtitle">Manage hotel information and edit their content directly</p>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchFilters
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onStatusChange={setStatusFilter}
          />

          {/* Hotels List */}
          <div className="hotels-container">
            {hotels.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FontAwesomeIcon icon={faHotel} />
                </div>
                <h3>No hotels found</h3>
                <p>
                  {searchQuery || statusFilter
                    ? "Try adjusting your search filters."
                    : "Get started by adding your first hotel property."}
                </p>
                {!searchQuery && !statusFilter && (
                  <button className="btn-primary" onClick={handleOpenAddHotelModal}>
                    <FontAwesomeIcon icon={faPlus} /> Add Your First Hotel
                  </button>
                )}
              </div>
            ) : (
              <div className="hotels-list">
                {hotels.map((hotel) => (
                  <HotelItem
                    key={hotel.id}
                    hotel={hotel}
                    isExpanded={isHotelExpanded(hotel.id)}
                    onToggle={() => toggleHotelExpansion(hotel.id)}
                    onAddPost={() => handleAddPost(hotel.id)}
                    onEditPost={handleEditPost}
                    onTranslatePost={handleTranslatePost}
                    onDeletePost={handleDeletePost}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals - Ngoài app-layout để không bị ảnh hưởng */}
      <AddHotelModal isOpen={isAddHotelModalOpen} onClose={handleCloseAddHotelModal} onSave={handleSaveHotel} />

      <EditHotelPostModal
        isOpen={isEditPostModalOpen}
        onClose={() => {
          setIsEditPostModalOpen(false);
          setCurrentEditingPost(null);
          setCurrentHotelId("");
        }}
        post={currentEditingPost}
        onSave={handleSavePost}
      />

      <TranslateModal
        isOpen={isTranslateModalOpen}
        onClose={() => {
          setIsTranslateModalOpen(false);
          setCurrentTranslatingPost(null);
        }}
        post={currentTranslatingPost}
        onAccept={handleAcceptTranslation}
      />

      {/* Notification */}
      {notification && (
        <div 
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: notification.type === 'success' ? '#10b981' : 
                       notification.type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            zIndex: 1001,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100px); }
        }
        .notification { animation: slideInRight 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Properties;