import React, { useEffect, useState } from 'react';
import '../styles/MySessions.css';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function MySessions() {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await axios.get('/api/my-sessions');
        const all = res.data || [];
        setDrafts(all.filter(session => session.status === 'draft'));
        setPublished(all.filter(session => session.status === 'published'));
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchMySessions();
  }, []);

  const COLORS = ['#00C49F', '#FF8042'];

  const pieData = [
    { name: 'Drafts', value: drafts.length },
    { name: 'Published', value: published.length },
  ];

  return (
    <div className="mysessions-container">
      <h2 className="mysessions-heading">📋 My Wellness Sessions</h2>

      <div className="cards-wrapper">
        <div className="session-card draft-card">
          <h3>Drafted Sessions</h3>
          <p className="session-count">{drafts.length}</p>
          {drafts[0] && <p className="latest-title">📝 Latest: {drafts[0].title}</p>}

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
