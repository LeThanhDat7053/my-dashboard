// src/pages/Dashboard.tsx
import React from "react";
import ChartCard from "../components/ChartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPuzzlePiece, faEye, faPlus, faEdit, faImage, faUserPlus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from "react-router-dom"; // 👈 thêm cái này

interface ActivityItem {
  id: string;
  type: "add" | "edit" | "upload" | "user" | "system";
  text: string;
  time: string;
  icon: IconProp;
  iconBg: string;
  iconColor: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // 👈 hook để điều hướng
  const dashboardData = [
    {
      title: "Total Categories",
      value: "10",
      change: "2 new this month",
      changeType: "positive" as const,
      icon: faLayerGroup,
      iconBg: "#3b82f6",
    },
    {
      title: "Active Features",
      value: "47",
      change: "5 added this week",
      changeType: "positive" as const,
      icon: faPuzzlePiece,
      iconBg: "#10b981",
    },
    {
      title: "Page Views",
      value: "2,847",
      change: "18% vs last month",
      changeType: "positive" as const,
      icon: faEye,
      iconBg: "#8b5cf6",
    },
  ];

  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "add",
      text: 'New feature "WiFi Information" was added to Services category',
      time: "2 hours ago",
      icon: faPlus,
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
    },
    {
      id: "2",
      type: "edit",
      text: 'Post "Check-in Process" was updated with new translations',
      time: "4 hours ago",
      icon: faEdit,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      id: "3",
      type: "upload",
      text: "5 new images uploaded to media library",
      time: "6 hours ago",
      icon: faImage,
      iconBg: "#fef3c7",
      iconColor: "#d97706",
    },
    {
      id: "4",
      type: "user",
      text: 'New admin user "Jane Smith" was added',
      time: "1 day ago",
      icon: faUserPlus,
      iconBg: "#fce7f3",
      iconColor: "#be185d",
    },
    {
      id: "5",
      type: "system",
      text: "Korean language support was enabled",
      time: "2 days ago",
      icon: faGlobe,
      iconBg: "#f3e8ff",
      iconColor: "#7c3aed",
    },
  ];

  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title} card`);
    // Add navigation or modal logic here
  };

  const handleQuickAction = (action: string) => {
    if (action === "Add Feature") {
      navigate("/features"); // 👈 nhảy qua Features.tsx
    }
    if (action === "Upload Media") {
      navigate("/media"); // 👈 nhảy qua Media.tsx
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <section className="p-8 mb-6 text-white bg-blue-600 rounded-2xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">Welcome back, John! 👋</h2>
          <p className="mt-2 text-blue-100">
            Here's what's happening with your hotel management system today.
          </p>
          <div className="flex gap-3 mt-5">
            <button
              className="px-4 py-2 text-sm font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50"
              onClick={() => handleQuickAction("Add Feature")}
            >
              Add Feature
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-400"
              onClick={() => handleQuickAction("Upload Media")}
            >
              Upload Media
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="p-6 bg-white border border-slate-200 rounded-xl">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: activity.iconBg,
                  color: activity.iconColor,
                }}
              >
                <FontAwesomeIcon icon={activity.icon} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-700">{activity.text}</div>
                <div className="text-xs text-slate-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;