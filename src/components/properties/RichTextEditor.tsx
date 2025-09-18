// src/components/properties/RichTextEditor.tsx
import React, { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...'
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isHtmlMode && editorRef.current) {
      editorRef.current.innerHTML = content;
    } else if (isHtmlMode && textareaRef.current) {
      textareaRef.current.value = content;
    }
  }, [content, isHtmlMode]);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatHeading = (tag: string) => {
    if (tag) {
      formatText('formatBlock', tag);
    } else {
      formatText('formatBlock', 'div');
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const toggleMode = () => {
    if (isHtmlMode) {
      // Switching to visual mode
      const htmlValue = textareaRef.current?.value || '';
      setHtmlContent(htmlValue);
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlValue;
      }
      onChange(htmlValue);
    } else {
      // Switching to HTML mode
      const visualContent = editorRef.current?.innerHTML || '';
      setHtmlContent(visualContent);
      onChange(visualContent);
    }
    setIsHtmlMode(!isHtmlMode);
  };

  const handleContentChange = () => {
    if (isHtmlMode && textareaRef.current) {
      const newContent = textareaRef.current.value;
      setHtmlContent(newContent);
      onChange(newContent);
    } else if (!isHtmlMode && editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('bold')} 
            title="Bold"
          >
            <i className="fas fa-bold"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('italic')} 
            title="Italic"
          >
            <i className="fas fa-italic"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('underline')} 
            title="Underline"
          >
            <i className="fas fa-underline"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('strikeThrough')} 
            title="Strikethrough"
          >
            <i className="fas fa-strikethrough"></i>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('insertOrderedList')} 
            title="Numbered List"
          >
            <i className="fas fa-list-ol"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('insertUnorderedList')} 
            title="Bullet List"
          >
            <i className="fas fa-list-ul"></i>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('justifyLeft')} 
            title="Align Left"
          >
            <i className="fas fa-align-left"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('justifyCenter')} 
            title="Align Center"
          >
            <i className="fas fa-align-center"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={() => formatText('justifyRight')} 
            title="Align Right"
          >
            <i className="fas fa-align-right"></i>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button 
            type="button" 
            className="editor-btn" 
            onClick={insertLink} 
            title="Insert Link"
          >
            <i className="fas fa-link"></i>
          </button>
          <button 
            type="button" 
            className="editor-btn" 
            onClick={insertImage} 
            title="Insert Image"
          >
            <i className="fas fa-image"></i>
          </button>
        </div>
        
        <div className="toolbar-group">
          <select 
            className="format-select" 
            onChange={(e) => formatHeading(e.target.value)}
            defaultValue=""
          >
            <option value="">Normal Text</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="blockquote">Quote</option>
          </select>
        </div>
        
        <div className="toolbar-group">
          <button 
            type="button" 
            className="editor-btn" 
            onClick={toggleMode} 
            title="Toggle HTML/Visual"
          >
            <i className="fas fa-code"></i> 
            {isHtmlMode ? 'Visual' : 'HTML'}
          </button>
        </div>
      </div>

      {isHtmlMode ? (
        <textarea
          ref={textareaRef}
          className="editor-html"
          value={htmlContent}
          onChange={handleContentChange}
          placeholder={`HTML code for: ${placeholder}`}
        />
      ) : (
        <div
          ref={editorRef}
          className="editor-content"
          contentEditable
          onInput={handleContentChange}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      )}
    </div>
  );
};