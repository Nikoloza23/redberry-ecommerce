import React, { useState, useRef } from 'react';

const FileUpload = ({
    // Props
    accept = "image/*",
    multiple = false,
    maxSize = 5 * 1024 * 1024, // 5MB default
    onFileSelect,
    onError,
    variant = 'default',
    size = 'medium',
    className,
    disabled = false,
    children,
    ...props
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileSelect = (files) => {
        const fileArray = Array.from(files);
        const validFiles = [];
        const errors = [];

        fileArray?.forEach(file => {
            if (file?.size > maxSize) {
                errors?.push(`${file?.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
            } else {
                validFiles?.push(file);
            }
        });

        if (errors?.length > 0 && typeof onError === 'function') {
            onError(errors);
        }

        if (validFiles?.length > 0) {
            setSelectedFiles(validFiles);
            if (typeof onFileSelect === 'function') {
                onFileSelect(validFiles);
            }
        }
    };

    const handleDragOver = (event) => {
        event?.preventDefault();
        if (!disabled) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (event) => {
        event?.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event?.preventDefault();
        setIsDragOver(false);

        if (disabled) return;

        const files = event?.dataTransfer?.files;
        if (files?.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleInputChange = (event) => {
        const files = event?.target?.files;
        if (files && files?.length > 0) {
            handleFileSelect(files);
        }
    };

    const handleClick = () => {
        if (!disabled && fileInputRef?.current) {
            fileInputRef?.current?.click();
        }
    };

    const handleKeyDown = (event) => {
        if (event?.key === 'Enter' || event?.key === ' ') {
            event?.preventDefault();
            handleClick();
        }
    };

    const getContainerClass = () => {
        const classes = ['file-upload'];
        if (size === 'small') classes.push('size-small');
        if (size === 'large') classes.push('size-large');
        if (isDragOver) classes.push('is-dragover');
        if (disabled) classes.push('is-disabled');
        if (className) classes.push(className);
        return classes.join(' ');
    };

    return (
        <div
            className={getContainerClass()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-label="Upload files"
            {...props}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
                disabled={disabled}
                className="sr-only"
                aria-hidden="true"
            />
            {children || (
                <div style={{ textAlign: 'center' }}>
                    <div className="file-upload__icon">
                        <svg
                            style={{ width: '100%', height: '100%' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>
                    <div className="file-upload__text" style={{ marginBottom: '8px' }}>
                        <span className="file-upload__cta">
                            Click to upload
                        </span>
                        {' '}or drag and drop
                    </div>
                    <p className="file-upload__hint">
                        {accept?.includes('image') ? 'PNG, JPG, GIF up to' : 'Files up to'} {maxSize / (1024 * 1024)}MB
                    </p>

                    {selectedFiles?.length > 0 && (
                        <div className="file-upload__list">
                            <p className="file-upload__list-title">Selected files:</p>
                            <ul className="file-upload__list-items">
                                {selectedFiles?.map((file, index) => (
                                    <li key={index} className="file-upload__list-item">
                                        {file?.name} ({(file?.size / 1024)?.toFixed(1)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;