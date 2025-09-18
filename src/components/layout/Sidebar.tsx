// // src/components/layout/Sidebar.tsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar: React.FC = () => {
//   const location = useLocation();

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <div className="logo-icon">
//             <i className="fas fa-hotel"></i>
//           </div>
//           <div className="logo-text">HotelLink360</div>
//         </div>
//       </div>

//       <div className="property-selector">
//         <div className="property-label">Current Property</div>
//         <div className="property-name">Tabi Tower Hotel</div>
//       </div>

//       <nav className="nav-menu">
//         <div className="nav-section">
//           <div className="nav-section-title">Main</div>
//           <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
//             <i className="fas fa-home"></i>
//             Dashboard
//           </Link>
//           <Link to="/categories" className={`nav-item ${location.pathname.startsWith("/categories") ? "active" : ""}`}>
//             <i className="fas fa-layer-group"></i>
//             Categories
//           </Link>
//           <Link to="/features" className={`nav-item ${location.pathname.startsWith("/features") ? "active" : ""}`}>
//             <i className="fas fa-puzzle-piece"></i>
//             Features
//           </Link>
//           <Link to="/properties" className={`nav-item ${location.pathname.startsWith("/properties") ? "active" : ""}`}>
//             <i className="fas fa-building"></i>
//             Properties
//           </Link>
//         </div>

//         <div className="nav-section">
//           <div className="nav-section-title">Content</div>
//           <Link to="/media" className={`nav-item ${location.pathname === "/media" ? "active" : ""}`}>
//             <i className="fas fa-images"></i>
//             Media Library
//           </Link>
//           <Link to="/analytics" className={`nav-item ${location.pathname.startsWith("/analytics") ? "active" : ""}`}>
//             <i className="fas fa-chart-line"></i>
//             Analytics
//           </Link>
//         </div>

//         <div className="nav-section">
//           <div className="nav-section-title">Management</div>
//           <Link to="/users" className={`nav-item ${location.pathname === "/users" ? "active" : ""}`}>
//             <i className="fas fa-users"></i>
//             Users
//           </Link>
//           <Link to="/settings" className={`nav-item ${location.pathname.startsWith("/settings") ? "active" : ""}`}>
//             <i className="fas fa-cog"></i>
//             Settings
//           </Link>
//         </div>

//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
