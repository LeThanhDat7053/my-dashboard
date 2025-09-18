// src/components/properties/HotelItem.tsx
import React from 'react';
import type { Hotel, HotelPost } from '../../types/properties';

interface HotelItemProps {
  hotel: Hotel;
  isExpanded: boolean;
  onToggle: () => void;
  onAddPost: () => void;
  onEditPost: (post: HotelPost) => void;
  onTranslatePost: (post: HotelPost) => void;
  onDeletePost: (postId: number) => void;
}

export const HotelItem: React.FC<HotelItemProps> = ({
  hotel,
  isExpanded,
  onToggle,
  onAddPost,
  onEditPost,
  onTranslatePost,
  onDeletePost
}) => {
  const getLocaleFlagClass = (locale: string) => {
    switch (locale) {
      case 'en': return 'locale-flag en';
      case 'vi': return 'locale-flag vi';
      case 'ja': return 'locale-flag ja';
      default: return 'locale-flag en';
    }
  };

  const getLocaleText = (locale: string) => {
    switch (locale) {
      case 'en': return 'English';
      case 'vi': return 'Tiếng Việt';
      case 'ja': return '日本語';
      default: return 'English';
    }
  };

  const statusClass = hotel.status === 'active' ? 'status-active' : 'status-inactive';
  const statusText = hotel.status === 'active' ? 'Active' : 'Inactive';

  return (
    <div className="hotel-item">
      <div 
        className={`hotel-header ${isExpanded ? 'expanded' : ''}`} 
        onClick={onToggle}
      >
        <div className="hotel-icon" style={{ background: hotel.color }}>
          <i className={`fas ${hotel.icon}`}></i>
        </div>
        <div className="hotel-info">
          <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <div className="hotel-meta">
              <div className="hotel-address">
                <i className="fas fa-map-marker-alt"></i>
                <span>{hotel.address}</span>
              </div>
              <div className="posts-count">
                <i className="fas fa-file-alt"></i>
                <span>{hotel.posts.length} posts</span>
              </div>
              {hotel.vrLink && (
                <a href={hotel.vrLink} className="vr-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-vr-cardboard"></i>
                  VR Tour
                </a>
              )}
              <span className={`status-badge ${statusClass}`}>{statusText}</span>
            </div>
          </div>
        </div>
        <i className="fas fa-chevron-down expand-icon"></i>
      </div>

      <div className={`hotel-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="posts-section">
          <div className="posts-header">
            <h4 className="posts-title">Posts for this Hotel</h4>
            <button className="add-post-btn" onClick={onAddPost}>
              <i className="fas fa-plus"></i>
              Add Post
            </button>
          </div>
          
          {hotel.posts.length === 0 ? (
            <div className="empty-posts">
              <div className="empty-icon">
                <i className="fas fa-file-plus"></i>
              </div>
              <p>No posts created yet for this hotel.</p>
              <p>Click "Add Post" to create the first post.</p>
            </div>
          ) : (
            <div className="posts-list">
              {hotel.posts.map((post) => (
                <div key={post.id} className="post-item">
                  <div className="post-header">
                    <div className="post-locale">
                      <div className={getLocaleFlagClass(post.locale)}>
                        {post.locale.toUpperCase()}
                      </div>
                      {getLocaleText(post.locale)}
                    </div>
                    <div className="post-actions">
                      <button 
                        className="btn-small btn-edit" 
                        onClick={() => onEditPost(post)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button 
                        className="btn-small btn-translate" 
                        onClick={() => onTranslatePost(post)}
                      >
                        <i className="fas fa-language"></i>
                        Translate
                      </button>
                      <button 
                        className="btn-small btn-delete" 
                        onClick={() => onDeletePost(post.id)}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="post-content">
                    <div className="post-title">{post.title}</div>
                    <div className="post-excerpt">
                      {post.content.substring(0, 200)}...
                    </div>
                  </div>
                  <div className="post-meta">
                    <div className="post-status">
                      <div className={`status-dot ${post.status === 'published' ? 'status-published' : 'status-draft'}`}></div>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </div>
                    <span>Updated: {post.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};