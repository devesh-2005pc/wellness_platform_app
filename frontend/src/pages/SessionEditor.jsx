import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/SessionEditor.css';

function SessionEditor() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/api/my-sessions/${id}`);
        setSession(res.data);
      } catch {
        setMessage('Failed to fetch session');
      }
    };
    fetchSession();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.post('/api/my-sessions/save-draft', {
        ...session
      });
      setMessage('Session updated!');
    } catch {
      setMessage('Update failed.');
    }
  };

  if (!session) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-session-container">
      <h2>Edit Session</h2>
      <input
        type="text"
        placeholder="Title"
        value={session.title}
        onChange={(e) => setSession({ ...session, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={session.tags?.join(', ')}
        onChange={(e) =>
          setSession({ ...session, tags: e.target.value.split(',') })
        }
      />
      <input
        type="text"
        placeholder="JSON File URL"
        value={session.json_file_url}
        onChange={(e) =>
          setSession({ ...session, json_file_url: e.target.value })
        }
      />
      <button onClick={handleUpdate}>Update Session</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SessionEditor;
