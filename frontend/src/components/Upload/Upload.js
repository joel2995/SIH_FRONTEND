import React, { useState } from 'react';
import './Upload.css';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileMetadata, setFileMetadata] = useState({});
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            getFileMetadata(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            getFileMetadata(file);
        }
    };

    const handleBrowseClick = () => {
        document.getElementById('fileInput').click();
    };

    const getFileMetadata = (file) => {
        const metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        };
        setFileMetadata(metadata);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('File successfully uploaded');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-header">
                <h2>Uploads</h2>
                <p>Your uploads must be 800x600</p>
                <p>Accepted formats: JPG, PNG, PDF</p>
            </div>
            <div
                className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
            >
                <img src="your-image-path.jpg" alt="Upload formats" className="upload-icon" />
                <p>
                    Drag your file here or <span className="browse-link" onClick={handleBrowseClick}>browse</span> for a file.
                </p>
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            {selectedFile && (
                <div className="file-metadata">
                    <h2>File Metadata:</h2>
                    <p>Name: {fileMetadata.name}</p>
                    <p>Size: {fileMetadata.size} bytes</p>
                    <p>Type: {fileMetadata.type}</p>
                    <p>Last Modified: {new Date(fileMetadata.lastModified).toLocaleString()}</p>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            )}
        </div>
    );
};

export default UploadPage;