// src/pages/Analytics.tsx
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import type { Chart as ChartJS } from "chart.js";
import "../styles/analytics.css";

const rnd = (min = 0, max = 1) => Math.random() * (max - min) + min;

const Analytics: React.FC = () => {
  // canvas refs
  const pageViewsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trafficCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const countriesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Chart instances (kept in refs so we can destroy them on cleanup)
  const pageViewsChartRef = useRef<ChartJS | null>(null);
  const trafficChartRef = useRef<ChartJS | null>(null);
  const countriesChartRef = useRef<ChartJS | null>(null);

  // UI state (filters)
  const [timeFilter, setTimeFilter] = useState<"7d" | "30d" | "90d">("30d");
  const [heatmapRange, setHeatmapRange] = useState<"week" | "month">("week");
  const [flowFilter, setFlowFilter] = useState<"all" | "new" | "returning">(
    "all"
  );
  const [heatmapData, setHeatmapData] = useState<number[]>(
    Array.from({ length: 28 }, () => Math.floor(rnd(0, 8)))
  );

  // thêm state monthData để branch "month" hiển thị được
  const [monthData, setMonthData] = useState<{ date: number; value: number }[]>(
    Array.from({ length: 30 }, (_, i) => ({ date: i + 1, value: Math.floor(rnd(0, 8)) }))
  );

  // Generate heatmap (28 days = 4 weeks)
  function regenerateHeatmap(range: "week" | "month") {
    if (range === "week") {
      // smaller range: show 7 days repeated 4 times (still 28 cells)
      setHeatmapData(Array.from({ length: 28 }, () => Math.floor(rnd(0, 8))));
    } else {
      // month: generate month-like data (28..31) but keep 30 for example
      setMonthData(Array.from({ length: 30 }, (_, i) => ({
        date: i + 1,
        value: Math.floor(rnd(0, 8)),
      })));
    }
  }

  // Create charts
  useEffect(() => {
    // destroy any existing charts (prevents "Canvas already in use" error)
    try {
      pageViewsChartRef.current?.destroy();
    } catch (e) {
      /* ignore */
    }
    try {
      trafficChartRef.current?.destroy();
    } catch (e) {
      /* ignore */
    }
    try {
      countriesChartRef.current?.destroy();
    } catch (e) {
      /* ignore */
    }

    // Page Views chart (line with two datasets)
    if (pageViewsCanvasRef.current) {
      pageViewsChartRef.current = new Chart(pageViewsCanvasRef.current, {
        type: "line",
        data: {
          labels: ["Dec 1", "Dec 3", "Dec 5", "Dec 7", "Dec 9", "Dec 11", "Dec 13", "Dec 15"],
          datasets: [
            {
              label: "Page Views",
              data: [1200, 1450, 1300, 1800, 1600, 2100, 1950, 2300],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.12)",
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
            },
            {
              label: "Unique Visitors",
              data: [800, 950, 850, 1200, 1050, 1400, 1300, 1500],
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.08)",
              fill: false,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { usePointStyle: true, padding: 12 } },
          },
          scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true } },
            // NOTE: Chart.js v4 typings disallow certain legacy props like borderDash on grid.
            // Use color and lineWidth for grid styling instead.
            y: { beginAtZero: true, grid: { display: true, color: "rgba(15,23,42,0.04)", lineWidth: 1 } },
          },
          elements: { point: { radius: 0 } },
        },
      });
    }

    // Traffic sources (doughnut)
    if (trafficCanvasRef.current) {
      trafficChartRef.current = new Chart(trafficCanvasRef.current, {
        type: "doughnut",
        data: {
          labels: ["QR Code Scan", "Direct Link", "Social Media", "Search", "Referral"],
          datasets: [
            {
              data: [45, 25, 15, 10, 5],
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { usePointStyle: true, padding: 10 } },
          },
          // cutout accepts string like '65%' in Chart.js v4
          cutout: "65%",
        } as any,
      });
    }

    // Countries bar chart (small)
    if (countriesCanvasRef.current) {
      countriesChartRef.current = new Chart(countriesCanvasRef.current, {
        type: "bar",
        data: {
          labels: ["USA", "UK", "Germany", "India", "Brazil"],
          datasets: [
            {
              label: "Users",
              data: [500, 300, 400, 250, 350],
              backgroundColor: "#10b981",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { display: false } },
        },
      });
    }

    // cleanup function
    return () => {
      try {
        pageViewsChartRef.current?.destroy();
      } catch (e) {
        /* ignore */
      }
      try {
        trafficChartRef.current?.destroy();
      } catch (e) {
        /* ignore */
      }
      try {
        countriesChartRef.current?.destroy();
      } catch (e) {
        /* ignore */
      }
      pageViewsChartRef.current = null;
      trafficChartRef.current = null;
      countriesChartRef.current = null;
    };
  }, [timeFilter]); // re-create when timeFilter changes (so buttons can simulate data change)

  // regenerate heatmap on heatmapRange change
  useEffect(() => {
    regenerateHeatmap(heatmapRange);
  }, [heatmapRange]);

  // small helpers (export, date)
  const exportData = () => {
    const csv = [
      ["Metric", "Value"],
      ["Total Page Views", "24,847"],
      ["Unique Visitors", "8,423"],
    ].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    alert("Exported (mock) CSV");
  };

  return (
    <div className="analytics-page">
      

      <div className="analytics-header">
        <div>
          <h2 className="analytics-title">Analytics Overview</h2>
          <div className="analytics-sub">
            Key metrics and performance insights
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div
            className="date-range-picker"
            style={{ alignItems: "center", display: "flex", gap: 8, cursor: "pointer" }}
            onClick={() => alert("Date picker placeholder")}
          >
            <i className="fas fa-calendar" />
            <span>Last 30 days</span>
          </div>
          <button className="export-btn" onClick={exportData}>
            <i className="fas fa-download" /> Export
          </button>
        </div>
      </div>

      {/* Top stats - 6 cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">24,847</div>
          <div className="stat-sub">Total Page Views</div>
          <div className="stat-change positive">▲ 18.5% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">8,423</div>
          <div className="stat-sub">Unique Visitors</div>
          <div className="stat-change positive">▲ 12.3% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">3m 42s</div>
          <div className="stat-sub">Avg. Session Duration</div>
          <div className="stat-change positive">▲ 8.2% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">28.3%</div>
          <div className="stat-sub">Bounce Rate</div>
          <div className="stat-change negative">▼ 5.4% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">15,673</div>
          <div className="stat-sub">Feature Clicks</div>
          <div className="stat-change positive">▲ 24.1% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">1,847</div>
          <div className="stat-sub">VR Tour Views</div>
          <div className="stat-change positive">▲ 31.7% from last month</div>
        </div>
      </div>

      {/* Charts */}
      <div className="layout-two-col">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Page Views Over Time</div>
            <div className="chart-filters">
              <button
                className={`filter-btn ${timeFilter === "7d" ? "active" : ""}`}
                onClick={() => setTimeFilter("7d")}
              >
                7D
              </button>
              <button
                className={`filter-btn ${timeFilter === "30d" ? "active" : ""}`}
                onClick={() => setTimeFilter("30d")}
              >
                30D
              </button>
              <button
                className={`filter-btn ${timeFilter === "90d" ? "active" : ""}`}
                onClick={() => setTimeFilter("90d")}
              >
                90D
              </button>
            </div>
          </div>
          <div className="chart-container" style={{ height: 300 }}>
            <canvas ref={pageViewsCanvasRef} />
          </div>
        </div>

        <div className="right-column">
          <div className="small-card" style={{ minHeight: 140 }}>
            <div className="chart-title">Traffic Sources</div>
            <div style={{ height: 160 }}>
              <canvas ref={trafficCanvasRef} />
            </div>
          </div>

          <div className="small-card" style={{ minHeight: 140 }}>
            <div className="chart-title">Top Countries</div>
            <div style={{ height: 140 }}>
              <canvas ref={countriesCanvasRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Two data tables side-by-side (gộp thành 2 cột) */}
      <div className="data-tables-row">
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Most Viewed Pages</div>
            <a className="view-all-btn" onClick={() => alert("View all (mock)")}>
              View all
            </a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a className="page-link" onClick={() => alert("Open: Welcome to Tabi Tower")}>
                    Welcome to Tabi Tower
                  </a>
                </td>
                <td>
                  <span className="metric-value">4,523</span>
                </td>
                <td>
                  <span className="trend-up">+15.2%</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a className="page-link" onClick={() => alert("Open: Hotel Amenities")}>
                    Hotel Amenities
                  </a>
                </td>
                <td>
                  <span className="metric-value">3,847</span>
                </td>
                <td>
                  <span className="trend-up">+8.7%</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a className="page-link" onClick={() => alert("Open: Restaurant & Dining")}>
                    Restaurant & Dining
                  </a>
                </td>
                <td>
                  <span className="metric-value">2,954</span>
                </td>
                <td>
                  <span className="trend-up">+22.1%</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a className="page-link" onClick={() => alert("Open: Spa & Wellness")}>
                    Spa & Wellness
                  </a>
                </td>
                <td>
                  <span className="metric-value">2,673</span>
                </td>
                <td>
                  <span className="trend-up">+5.3%</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a className="page-link" onClick={() => alert("Open: Room Types")}>
                    Room Types
                  </a>
                </td>
                <td>
                  <span className="metric-value">2,341</span>
                </td>
                <td>
                  <span className="trend-down">-3.2%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Most Clicked Features</div>
            <a className="view-all-btn" onClick={() => alert("View all (mock)")}>
              View all
            </a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Clicks</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WiFi Information</td>
                <td>
                  <span className="metric-value">1,847</span>
                </td>
                <td>
                  <span className="trend-up">12.4%</span>
                </td>
              </tr>
              <tr>
                <td>Room Service Menu</td>
                <td>
                  <span className="metric-value">1,623</span>
                </td>
                <td>
                  <span className="trend-up">10.8%</span>
                </td>
              </tr>
              <tr>
                <td>Pool Schedule</td>
                <td>
                  <span className="metric-value">1,354</span>
                </td>
                <td>
                  <span className="trend-up">9.1%</span>
                </td>
              </tr>
              <tr>
                <td>Concierge Contact</td>
                <td>
                  <span className="metric-value">1,267</span>
                </td>
                <td>
                  <span className="trend-up">8.5%</span>
                </td>
              </tr>
              <tr>
                <td>Gym Hours</td>
                <td>
                  <span className="metric-value">1,134</span>
                </td>
                <td>
                  <span className="trend-neutral">7.6%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap */}
      

      {/* User Flow */}
      <div className="table-card" style={{ marginTop: 18 }}>
        <div className="chart-header">
          <div className="chart-title">User Journey Flow</div>
          <div className="chart-filters">
            <button className={`filter-btn ${flowFilter === "all" ? "active" : ""}`} onClick={() => setFlowFilter("all")}>All Users</button>
            <button className={`filter-btn ${flowFilter === "new" ? "active" : ""}`} onClick={() => setFlowFilter("new")}>New Users</button>
            <button className={`filter-btn ${flowFilter === "returning" ? "active" : ""}`} onClick={() => setFlowFilter("returning")}>Returning</button>
          </div>
        </div>

        <div className="flow-step">
          <div className="step-info">
            <div className="step-number">1</div>
            <div className="step-details">
              <h4>Landing Page</h4>
              <p>Initial hotel information page</p>
            </div>
          </div>
          <div className="step-metrics">
            <div className="step-users">8,423</div>
            <div className="step-conversion">100.0%</div>
          </div>
        </div>

        <div className="flow-step">
          <div className="step-info">
            <div className="step-number">2</div>
            <div className="step-details">
              <h4>Feature Navigation</h4>
              <p>Users browse hotel features</p>
            </div>
          </div>
          <div className="step-metrics">
            <div className="step-users">6,847</div>
            <div className="step-conversion">81.3%</div>
          </div>
        </div>

        <div className="flow-step">
          <div className="step-info">
            <div className="step-number">3</div>
            <div className="step-details">
              <h4>Service Details</h4>
              <p>View specific service information</p>
            </div>
          </div>
          <div className="step-metrics">
            <div className="step-users">4,923</div>
            <div className="step-conversion">58.4%</div>
          </div>
        </div>

        <div className="flow-step">
          <div className="step-info">
            <div className="step-number">4</div>
            <div className="step-details">
              <h4>Contact/Action</h4>
              <p>Contact hotel or use services</p>
            </div>
          </div>
          <div className="step-metrics">
            <div className="step-users">2,847</div>
            <div className="step-conversion">33.8%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;