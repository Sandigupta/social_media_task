import React, { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialMediaHandle: '',
    images: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.every(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    if (!validFiles) {
      setError('Please upload only images under 5MB each');
      return;
    }

    setFormData({ ...formData, images: files });
    setError('');

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialMediaHandle', formData.socialMediaHandle);
    
    if (formData.images) {
      for (let file of formData.images) {
        data.append('images', file);
      }
    }

    try {
      await  fetch(`${process.env.REACT_APP_API_URL}/submit`, {
        method: 'POST',
        body: data,
      });
      setSuccess(true);
      setFormData({ name: '', socialMediaHandle: '', images: null });
      setImagePreview([]);
    } catch (error) {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Submit Your Entry</h2>
      
      <form onSubmit={handleSubmit} className="submission-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="socialMediaHandle" className="form-label">
            Social Media Handle
          </label>
          <input
            id="socialMediaHandle"
            name="socialMediaHandle"
            type="text"
            value={formData.socialMediaHandle}
            onChange={handleInputChange}
            placeholder="@username"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="images" className="form-label">
            Upload Images
          </label>
          <div className="upload-container">
            <label className="upload-area">
              <div className="upload-content">
                <Upload className="upload-icon" />
                <p className="upload-text">Click to upload images</p>
                <p className="upload-subtext">Max 5MB per image</p>
              </div>
              <input
                id="images"
                type="file"
                name="images"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                required
                className="hidden-input"
              />
            </label>
          </div>
        </div>

        {imagePreview.length > 0 && (
          <div className="image-preview-grid">
            {imagePreview.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>Submission successful!</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`submit-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <div className="button-content">
              <Loader2 className="spinner" />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;