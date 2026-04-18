import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/dashboard',  icon: '-', label: 'Dashboard' },
  { path: '/meal-plan',  icon: '-', label: 'Meal Plan' },
  { path: '/food-diary', icon: '-', label: 'Food Diary' },
  { path: '/water',      icon: '-', label: 'Water Tracker' },
  { path: '/progress',   icon: '-', label: 'Progress' },
  { path: '/profile',    icon: '-', label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">Y</div>
        <span className="logo-text">YumBowl</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            <span className="nav-indicator" />
          </NavLink>
        ))}
      </nav>

      {/* Bottom: user + logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">Member</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          ⏻
        </button>
      </div>
    </aside>
  );
}
