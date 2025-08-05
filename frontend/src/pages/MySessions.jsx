// src/pages/MySessions.jsx
import React, { useEffect, useState } from 'react';
import '../styles/MySessions.css';
// use your axios instance (important for baseURL + auth header)
import axios from '../api/axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function MySessions() {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        setLoading(true);
        setError(null);
        // <-- correct protected route according to your server routes
        const res = await axios.get('/sessions/user');
        const all = res.data || [];
        setDrafts(all.filter(session => session.status === 'draft'));
        setPublished(all.filter(session => session.status === 'published'));
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, []);

  const COLORS = ['#00C49F', '#FF8042'];

  const pieData = [
    { name: 'Drafts', value: drafts.length },
    { name: 'Published', value: published.length },
  ];

  if (loading) return <div className="mysessions-container"><p>Loading your sessions…</p></div>;
  if (error) return <div className="mysessions-container"><p className="error">Error: {error}</p></div>;

  return (
    <div className="mysessions-container">
      <h2 className="mysessions-heading">📋 My Wellness Sessions</h2>

      <div className="cards-wrapper">
        <div className="session-card draft-card">
          <h3>Drafted Sessions</h3>
          <p className="session-count">{drafts.length}</p>
          {drafts[0] && <p className="latest-title">📝 Latest: {drafts[0].title}</p>}

          <div className="session-list">
            {drafts.map((d) => (
              <div
                key={d._id}
                className="session-list-item"
                onClick={() => navigate(`/edit-session/${d._id}`)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/edit-session/${d._id}`); }}
              >
                {d.title || 'Untitled draft'}
              </div>
            ))}
            {drafts.length === 0 && <p>No drafts yet — create one!</p>}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={drafts.map((d, i) => ({ name: `Draft ${i + 1}`, length: d.content?.length || 0 }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="length" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="session-card published-card">
          <h3>Published Sessions</h3>
          <p className="session-count">{published.length}</p>
          {published[0] && <p className="latest-title">✅ Latest: {published[0].title}</p>}

          <div className="session-list">
            {published.map((p) => (
              <div
                key={p._id}
                className="session-list-item"
                onClick={() => navigate(`/view-session/${p._id}`)} // or /edit-session if published should be editable
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/view-session/${p._id}`); }}
              >
                {p.title || 'Untitled session'}
              </div>
            ))}
            {published.length === 0 && <p>No published sessions yet.</p>}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={70}
                innerRadius={40}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MySessions;
