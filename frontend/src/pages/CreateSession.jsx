import React, { useState } from 'react';
import axios from '../api/axios'; // ✅ Use secured Axios instance
import '../styles/CreateSession.css';

function CreateSession() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonFileUrl, setJsonFileUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    try {
      const res = await axios.post('/api/sessions/save', {
        title,
        tags: tags.split(',').map((tag) => tag.trim()),
        json_file_url: jsonFileUrl,
      });

      setMessage('✅ Session created successfully!');
      setTitle('');
      setTags('');
      setJsonFileUrl('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ Failed to create session.');
    }
  };

  return (
    <div className="create-session-container">
      <h2>Create New Wellness Session</h2>

      <input
        type="text"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <input
        type="text"
        placeholder="JSON File URL"
        value={jsonFileUrl}
        onChange={(e) => setJsonFileUrl(e.target.value)}
      />

      <button onClick={handleCreate}>Create Session</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateSession;
