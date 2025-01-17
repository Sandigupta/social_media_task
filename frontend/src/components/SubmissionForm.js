import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialMediaHandle: '',
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialMediaHandle', formData.socialMediaHandle);
    for (let file of formData.images) {
      data.append('images', file);
    }
    try {
      await axios.post('http://localhost:5000/submit', data);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleInputChange} required />

      <label>Social Media Handle:</label>
      <input type="text" name="socialMediaHandle" onChange={handleInputChange} required />

      <label>Upload Images:</label>
      <input type="file" name="images" multiple onChange={handleFileChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;
