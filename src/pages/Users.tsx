// src/pages/Users.tsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleCard from '../components/users/RoleCard';
import UserModal from '../components/users/UserModal';
import type { User, UserFormData } from '../types/users';
import '../styles/users.css';

const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@tabitower.com',
    role: 'owner',
    status: 'active',
    lastLogin: '2 hours ago',
    initials: 'JD',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@tabitower.com',
    role: 'admin',
    status: 'active',
    lastLogin: '1 day ago',
    initials: 'JS',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@tabitower.com',
    role: 'admin',
    status: 'active',
    lastLogin: '3 days ago',
    initials: 'MW',
  },
  {
    id: 4,
    name: 'Sarah Brown',
    email: 'sarah.brown@tabitower.com',
    role: 'editor',
    status: 'active',
    lastLogin: '5 hours ago',
    initials: 'SB',
  },
  {
    id: 5,
    name: 'Tom Johnson',
    email: 'tom.johnson@tabitower.com',
    role: 'editor',
    status: 'active',
    lastLogin: '1 week ago',
    initials: 'TJ',
  },
  {
    id: 6,
    name: 'Lisa Davis',
    email: 'lisa.davis@tabitower.com',
    role: 'editor',
    status: 'inactive',
    lastLogin: '1 month ago',
    initials: 'LD',
  },
  {
    id: 7,
    name: 'Bob Kim',
    email: 'bob.kim@tabitower.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2 days ago',
    initials: 'BK',
  }
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Derived: counts per role
  const counts = useMemo(() => {
    const map = { owner: 0, admin: 0, editor: 0, viewer: 0 } as Record<string, number>;
    users.forEach(u => {
      map[u.role] = (map[u.role] || 0) + 1;
    });
    return map;
  }, [users]);

  // Filtered user list
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter(u => {
      const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesRole = !roleFilter || u.role === roleFilter;
      const matchesStatus = !statusFilter || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const openAddModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const u = users.find(x => x.id === id) ?? null;
    setEditingUser(u);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to remove this user? This action cannot be undone.')) return;
    setUsers(prev => prev.filter(u => u.id !== id));
    alert(`User ${id} removed successfully!`);
  };

  const handleSave = async (data: UserFormData) => {
    // If id provided -> update, else create new 
    if (data.id) {
      setUsers(prev => prev.map(u => u.id === data.id ? {
        ...u,
        name: data.name,
        email: data.email,
        role: (data.role as User['role']) ?? u.role,
        status: data.status,
        permissions: data.permissions ?? u.permissions,
      } : u));
    } else {
      const newId = Math.max(0, ...users.map(u => u.id)) + 1;
      const initials = data.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
      const newUser: User = {
        id: newId,
        name: data.name,
        email: data.email,
        role: (data.role as User['role']) || 'viewer',
        status: data.status,
        lastLogin: 'Just now',
        initials,
        permissions: data.permissions,
      };
      setUsers(prev => [newUser, ...prev]);
    }
  };

  const handleViewFeatures = (categoryId: number) => {
    // from original users.html: not applicable here but keep function available
    navigate(`/features?category=${categoryId}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="users-header mb-6">
        <div>
          <h1 className="users-title">Team Management</h1>
          <p className="users-subtitle">Manage users and their permissions for your hotel property</p>
        </div>

        <div>
          <button className="btn-primary" onClick={openAddModal}>
            <i className="fas fa-user-plus"></i>
            Add User
          </button>
        </div>
      </div>

      {/* Roles Overview */}
      <div className="roles-overview mb-6">
        <RoleCard title="Owner" count={counts.owner} description="Full system access and tenant management" iconClass="fas fa-crown" iconBg="linear-gradient(135deg, #f59e0b, #d97706)" />
        <RoleCard title="Admin" count={counts.admin} description="Full property management and user control" iconClass="fas fa-user-shield" iconBg="linear-gradient(135deg, #3b82f6, #1d4ed8)" />
        <RoleCard title="Editor" count={counts.editor} description="Can create and edit content, features, and posts" iconClass="fas fa-user-edit" iconBg="linear-gradient(135deg, #10b981, #059669)" />
        <RoleCard title="Viewer" count={counts.viewer} description="Read-only access to view content and analytics" iconClass="fas fa-user" iconBg="linear-gradient(135deg, #8b5cf6, #7c3aed)" />
      </div>

      {/* Search & Filter */}
      <div className="search-filter-bar mb-6">
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select className="filter-select" id="roleFilter" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>

        <select className="filter-select" id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <div className="table-header">
          <h3 className="table-title">Team Members</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody id="usersTableBody">
            {filteredUsers.map(user => (
              <tr key={user.id} data-role={user.role} data-status={user.status}>
                <td>
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm flex items-center justify-center">
                      {user.initials ?? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                    </div>

                    {/* Tên + Email */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={`role-badge ${
                    user.role === 'owner' ? 'role-owner' :
                    user.role === 'admin' ? 'role-admin' :
                    user.role === 'editor' ? 'role-editor' : 'role-viewer'
                  }`}>{user.role[0].toUpperCase() + user.role.slice(1)}</span>
                </td>

                <td>
                  <span className={`status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td>
                  <div className="last-login">{user.lastLogin}</div>
                </td>

                <td>
                  <div className="action-buttons">
                    <button className="btn-secondary" onClick={() => openEditModal(user.id)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    {user.role !== 'owner' && (
                      <button className="btn-danger" onClick={() => handleDelete(user.id)}>
                        <i className="fas fa-user-times"></i> Remove
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={modalOpen}
        initialData={editingUser}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Users;