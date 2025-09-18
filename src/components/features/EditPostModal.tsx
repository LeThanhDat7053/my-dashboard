import React, { useState, useRef, useEffect } from 'react';
import '../../styles/EditPostModal.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  locale: string;
  localeName: string;
  flagClass: string;
  status: 'published' | 'draft';
  updatedAt: string;
  content?: string;
}

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (postData: any) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post, onSave }) => {
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [editorContent, setEditorContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [postForm, setPostForm] = useState({
    locale: '',
    title: '',
    slug: '',
    target: 'self',
    content: '',
    status: 'draft'
  });

  useEffect(() => {
    if (post) {
      setPostForm({
        locale: post.locale,
        title: post.title,
        slug: '',
        target: 'self',
        content: post.content || '',
        status: post.status
      });
      setEditorContent(post.content || '');
      setHtmlContent(post.content || '');
    } else {
      setPostForm({
        locale: '',
        title: '',
        slug: '',
        target: 'self',
        content: '<p>Start writing your content here...</p>',
        status: 'draft'
      });
      setEditorContent('<p>Start writing your content here...</p>');
      setHtmlContent('<p>Start writing your content here...</p>');
    }
    setEditorMode('visual');
  }, [post]);

  // Rich text editor functions
  const formatText = (command: string, value?: string) => {
    if (editorMode === 'html') return;
    document.execCommand(command, false, value);
    syncContentToHTML();
  };

  const formatHeading = (tag: string) => {
    if (editorMode === 'html' || !tag) return;
    if (tag === 'blockquote') {
      document.execCommand('formatBlock', false, '<blockquote>');
    } else {
      document.execCommand('formatBlock', false, `<${tag}>`);
    }
    syncContentToHTML();
  };

  const insertLink = () => {
    if (editorMode === 'html') return;
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      syncContentToHTML();
    }
  };

  const insertImage = () => {
    if (editorMode === 'html') return;
    const url = prompt('Enter the image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
      syncContentToHTML();
    }
  };

  const insertTable = () => {
    if (editorMode === 'html') return;
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    
    if (rows && cols) {
      let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML += '<td style="padding: 8px; border: 1px solid #ddd;">Cell</td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table>';
      
      document.execCommand('insertHTML', false, tableHTML);
      syncContentToHTML();
    }
  };

  const toggleEditorMode = () => {
    if (editorMode === 'visual') {
      setEditorMode('html');
      syncContentToHTML();
    } else {
      setEditorMode('visual');
      syncContentFromHTML();
    }
  };

  const syncContentToHTML = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlContent(content);
      setEditorContent(content);
    }
  };

  const syncContentFromHTML = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = htmlContent;
      setEditorContent(htmlContent);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorMode === 'html' ? htmlContent : editorContent;
    onSave({ ...postForm, content });
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-post-modal-overlay" onClick={handleModalClick}>
      <div className="edit-post-modal-content">
        <div className="edit-post-modal-header">
          <h3 className="edit-post-modal-title">
            {post ? `Edit Post #${post.id}` : 'Add New Post'}
          </h3>
          <button className="edit-post-close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Language</label>
            <select
              className="edit-post-form-input"
              value={postForm.locale}
              onChange={(e) => setPostForm(prev => ({ ...prev, locale: e.target.value }))}
              required
            >
              <option value="">Select language...</option>
              <option value="vi">🇻🇳 Vietnamese</option>
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 French</option>
              <option value="jp">🇯🇵 Japanese</option>
            </select>
          </div>

          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Post Title</label>
            <input
              type="text"
              className="edit-post-form-input"
              value={postForm.title}
              onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Slug / External Link *</label>
            <input
              type="text"
              className="edit-post-form-input"
              value={postForm.slug}
              onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="e.g., swimming-pool or https://example.com/pool"
              required
            />
            <small className="edit-post-form-hint">
              <i className="fas fa-link"></i> Enter a slug for internal page or a full URL for external link
            </small>
          </div>

          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Open Link In</label>
            <div className="edit-post-radio-group">
              <label className="edit-post-radio-option">
                <input
                  type="radio"
                  name="target"
                  value="self"
                  checked={postForm.target === 'self'}
                  onChange={(e) => setPostForm(prev => ({ ...prev, target: e.target.value }))}
                />
                <span>Current Page</span>
              </label>
              <label className="edit-post-radio-option">
                <input
                  type="radio"
                  name="target"
                  value="blank"
                  checked={postForm.target === 'blank'}
                  onChange={(e) => setPostForm(prev => ({ ...prev, target: e.target.value }))}
                />
                <span>New Tab</span>
              </label>
            </div>
          </div>

          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Content</label>
            <div className="edit-post-editor-container">
              <div className="edit-post-editor-toolbar">
                <div className="edit-post-toolbar-group">
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('bold')} title="Bold">
                    <i className="fas fa-bold"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('italic')} title="Italic">
                    <i className="fas fa-italic"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('underline')} title="Underline">
                    <i className="fas fa-underline"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('strikeThrough')} title="Strikethrough">
                    <i className="fas fa-strikethrough"></i>
                  </button>
                </div>
                <div className="edit-post-toolbar-group">
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('insertOrderedList')} title="Numbered List">
                    <i className="fas fa-list-ol"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('insertUnorderedList')} title="Bullet List">
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('indent')} title="Indent">
                    <i className="fas fa-indent"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('outdent')} title="Outdent">
                    <i className="fas fa-outdent"></i>
                  </button>
                </div>
                <div className="edit-post-toolbar-group">
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('justifyLeft')} title="Align Left">
                    <i className="fas fa-align-left"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('justifyCenter')} title="Align Center">
                    <i className="fas fa-align-center"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={() => formatText('justifyRight')} title="Align Right">
                    <i className="fas fa-align-right"></i>
                  </button>
                </div>
                <div className="edit-post-toolbar-group">
                  <button type="button" className="edit-post-editor-btn" onClick={insertLink} title="Insert Link">
                    <i className="fas fa-link"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={insertImage} title="Insert Image">
                    <i className="fas fa-image"></i>
                  </button>
                  <button type="button" className="edit-post-editor-btn" onClick={insertTable} title="Insert Table">
                    <i className="fas fa-table"></i>
                  </button>
                </div>
                <div className="edit-post-toolbar-group">
                  <select className="edit-post-format-select" onChange={(e) => formatHeading(e.target.value)}>
                    <option value="">Normal Text</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="blockquote">Quote</option>
                  </select>
                </div>
                <div className="edit-post-toolbar-group">
                  <button
                    type="button"
                    className={`edit-post-editor-btn ${editorMode === 'html' ? 'active' : ''}`}
                    onClick={toggleEditorMode}
                    title="Toggle HTML/Visual"
                  >
                    <i className="fas fa-code"></i>
                    {editorMode === 'html' ? 'Visual' : 'HTML'}
                  </button>
                </div>
              </div>
              
              {editorMode === 'visual' ? (
                <div
                  ref={editorRef}
                  className="edit-post-editor-content"
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: editorContent }}
                  onInput={syncContentToHTML}
                />
              ) : (
                <textarea
                  className="edit-post-editor-html"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  required
                />
              )}
            </div>
          </div>

          <div className="edit-post-form-group">
            <label className="edit-post-form-label">Status</label>
            <select
              className="edit-post-form-input"
              value={postForm.status}
              onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="edit-post-modal-actions">
            <button type="button" className="edit-post-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="edit-post-btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;