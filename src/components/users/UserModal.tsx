// src/components/users/UserModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { User, UserFormData, Role } from '../../types/users';

interface UserModalProps {
  isOpen: boolean;
  initialData?: User | null;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void> | void;
}

const roleDescriptions: Record<Role, string> = {
  admin: 'Full property management and user control. Can manage all content and users.',
  editor: 'Can create and edit content, features, and posts. Cannot manage users.',
  viewer: 'Read-only access to view content and analytics. Cannot make changes.',
  owner: 'Full system access and tenant management',
};

const defaultPermissions = {
  categories: false,
  features: false,
  posts: true,
  media: true,
  analytics: false,
  users: false,
};

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  initialData = null,
  onClose,
  onSave,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    ...defaultPermissions,
  });

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setEmail(initialData.email ?? '');
      setRole(initialData.role ?? '');
      setStatus(initialData.status ?? 'active');
      setPermissions({
        ...defaultPermissions,
        ...(initialData.permissions ?? {}),
      });
    } else {
      setName('');
      setEmail('');
      setRole('');
      setStatus('active');
      setPermissions({ ...defaultPermissions });
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!overlayRef.current) return;
      if (e.target === overlayRef.current) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isOpen, onClose]);

  const togglePermission = (key: string) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UserFormData = {
      id: initialData?.id,
      name: name.trim(),
      email: email.trim(),
      role: (role || '') as Role | '',
      status,
      permissions: role === 'editor' ? permissions : undefined,
    };
    await onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">
            {initialData ? 'Edit User' : 'Add New User'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              required
            >
              <option value="">Select a role</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            {role && (
              <p className="mt-1 text-xs text-gray-500">
                {roleDescriptions[role as Role]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'active' | 'inactive')
              }
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Permissions */}
          {role === 'editor' && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Permissions
              </h4>
              <div className="space-y-2">
                {Object.keys(defaultPermissions).map((permKey) => (
                  <label
                    key={permKey}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="capitalize">{permKey}</span>
                    <input
                      type="checkbox"
                      checked={permissions[permKey]}
                      onChange={() => togglePermission(permKey)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {initialData ? 'Save Changes' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // ✅ thêm container đúng chỗ
  );
};

export default UserModal;