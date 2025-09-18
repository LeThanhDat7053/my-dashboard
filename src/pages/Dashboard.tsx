// src/pages/Dashboard.tsx
import React from "react";
import ChartCard from "../components/ChartCard";

interface ActivityItem {
  id: string;
  type: "add" | "edit" | "upload" | "user" | "system";
  text: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const Dashboard: React.FC = () => {
  const dashboardData = [
    {
      title: "Total Categories",
      value: "10",
      change: "2 new this month",
      changeType: "positive" as const,
      icon: "fas fa-layer-group",
      iconBg: "#3b82f6",
    },
    {
      title: "Active Features",
      value: "47",
      change: "5 added this week",
      changeType: "positive" as const,
      icon: "fas fa-puzzle-piece",
      iconBg: "#10b981",
    },
    {
      title: "Page Views",
      value: "2,847",
      change: "18% vs last month",
      changeType: "positive" as const,
      icon: "fas fa-eye",
      iconBg: "#8b5cf6",
    },
  ];

  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "add",
      text: 'New feature "WiFi Information" was added to Services category',
      time: "2 hours ago",
      icon: "fas fa-plus",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
    },
    {
      id: "2",
      type: "edit",
      text: 'Post "Check-in Process" was updated with new translations',
      time: "4 hours ago",
      icon: "fas fa-edit",
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      id: "3",
      type: "upload",
      text: "5 new images uploaded to media library",
      time: "6 hours ago",
      icon: "fas fa-image",
      iconBg: "#fef3c7",
      iconColor: "#d97706",
    },
    {
      id: "4",
      type: "user",
      text: 'New admin user "Jane Smith" was added',
      time: "1 day ago",
      icon: "fas fa-user-plus",
      iconBg: "#fce7f3",
      iconColor: "#be185d",
    },
    {
      id: "5",
      type: "system",
      text: "Korean language support was enabled",
      time: "2 days ago",
      icon: "fas fa-globe",
      iconBg: "#f3e8ff",
      iconColor: "#7c3aed",
    },
  ];

  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title} card`);
    // Add navigation or modal logic here
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Add quick action logic here
  };

  return (
    <div>
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">Welcome back, John! 👋</h2>
          <p className="welcome-subtitle">
            Here's what's happening with your hotel management system today.
          </p>
          <div className="quick-actions">
            <button
              className="quick-action-btn"
              onClick={() => handleQuickAction("Add Feature")}
            >
              Add Feature
            </button>
            <button
              className="quick-action-btn"
              onClick={() => handleQuickAction("Upload Media")}
            >
              Upload Media
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="dashboard-cards">
        {dashboardData.map((card, index) => (
          <ChartCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType}
            icon={card.icon}
            iconBg={card.iconBg}
            onClick={() => handleCardClick(card.title)}
          />
        ))}
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <div className="activity-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div
                className="activity-icon"
                style={{
                  background: activity.iconBg,
                  color: activity.iconColor,
                }}
              >
                <i className={activity.icon}></i>
              </div>
              <div className="activity-content">
                <div className="activity-text">{activity.text}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;