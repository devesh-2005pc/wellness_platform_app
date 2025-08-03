import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { FaChartBar, FaPen, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // ✅ Use secured Axios
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [sessionStats, setSessionStats] = useState({ total: 0, drafts: 0, published: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/my-sessions/stats'); // ✅ Use user-specific stats route
        setSessionStats(res.data || { total: 0, drafts: 0, published: 0 });
      } catch (err) {
        console.error('Error fetching session stats:', err);
      }
    };
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Drafts', value: sessionStats?.drafts ?? 0 },
    { name: 'Published', value: sessionStats?.published ?? 0 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to Your Wellness Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <FaChartBar className="card-icon" />
          <h3>Total Sessions</h3>
          <p>{sessionStats?.total ?? 0}</p>
        </div>
        <div className="card">
          <FaPen className="card-icon" />
          <h3>Drafts</h3>
          <p>{sessionStats?.drafts ?? 0}</p>
        </div>
        <div className="card">
          <FaCheckCircle className="card-icon" />
          <h3>Published</h3>
          <p>{sessionStats?.published ?? 0}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="action-btn" onClick={() => navigate('/mysessions')}>My Sessions</button>
        <button className="action-btn" onClick={() => navigate('/explore')}>Explore Sessions</button>
        <button className="action-btn" onClick={() => navigate('/draftsession')}>Draft a Session</button>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Session Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00e6f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
