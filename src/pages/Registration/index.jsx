import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';


const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e?.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e?.target?.result);
            };
            reader?.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        // Handle registration logic here
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Helmet>
                <title>Create Account | RedSeam Clothing - Join Premium Fashion Community</title>
                <meta name="description" content="Join RedSeam Clothing today! Create your account to access exclusive fashion collections, personalized recommendations, and premium shopping experience. Quick & secure registration process." />
                <meta property="og:title" content="Create Account | RedSeam Clothing - Join Premium Fashion Community" />
                <meta property="og:description" content="Join RedSeam Clothing today! Create your account to access exclusive fashion collections, personalized recommendations, and premium shopping experience. Quick & secure registration process." />
            </Helmet>
            <main className="page-main">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <section className="page-section">
                    <div className="layout-container">
                        {/* Left Image Section */}
                        <div className="image-section">
                            <img
                                src="/images/img_rectangle_10.png"
                                alt="Fashion models wearing RedSeam clothing in outdoor setting"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        {/* Right Registration Form Section */}
                        <div className="form-section">
                            <div className="form-content">
                                {/* Page Title */}
                                <h1 className="page-title">
                                    Registration
                                </h1>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                                    {/* Profile Image Upload Section */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
                                        {/* Profile Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="profile-image-container">
                                                {profileImage ? (
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile preview"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/images/img_ellipse_1.png"
                                                        alt="Default profile"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="file-input-overlay"
                                                aria-label="Upload profile image"
                                            />
                                        </div>

                                        {/* Upload Controls */}
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', padding: '0 14px', width: '100%' }}>
                                            <button
                                                type="button"
                                                onClick={() => document.querySelector('input[type="file"]')?.click()}
                                                className="transition-colors"
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400',
                                                    lineHeight: '21px',
                                                    textAlign: 'center',
                                                    color: '#3e424a',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Upload new
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="transition-colors"
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400',
                                                    lineHeight: '21px',
                                                    textAlign: 'center',
                                                    color: '#3e424a',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginLeft: '14px'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Registration Form */}
                                    <div className="form-container">
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                            {/* Form Fields */}
                                            <div className="form-fields">
                                                {/* Username Field */}
                                                <div className="w-full">
                                                    <input
                                                        className="input"
                                                        name="username"
                                                        placeholder="Username *"
                                                        value={formData?.username}
                                                        onChange={handleInputChange}
                                                        required
                                                        id="username"
                                                        autoComplete="username"
                                                    />
                                                </div>

                                                {/* Email Field */}
                                                <div className="w-full">
                                                    <input
                                                        className="input"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email *"
                                                        value={formData?.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        id="email"
                                                        autoComplete="email"
                                                    />
                                                </div>

                                                {/* Password Field */}
                                                <div className="w-full relative">
                                                    <input
                                                        className="input"
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Password *"
                                                        value={formData?.password}
                                                        onChange={handleInputChange}
                                                        required
                                                        id="password"
                                                        autoComplete="new-password"
                                                        style={{ paddingRight: '40px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="toggle-password-button"
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/img_search.svg"
                                                            alt="Toggle password visibility"
                                                            style={{ width: '20px', height: '20px' }}
                                                        />
                                                    </button>
                                                </div>

                                                {/* Confirm Password Field */}
                                                <div className="w-full relative">
                                                    <input
                                                        className="input"
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm password *"
                                                        value={formData?.confirmPassword}
                                                        onChange={handleInputChange}
                                                        required
                                                        id="confirmPassword"
                                                        autoComplete="new-password"
                                                        style={{ paddingRight: '40px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleConfirmPasswordVisibility}
                                                        className="toggle-password-button"
                                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/img_search.svg"
                                                            alt="Toggle password visibility"
                                                            style={{ width: '20px', height: '20px' }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Submit Button and Login Link */}
                                            <div className="form-actions">
                                                {/* Register Button */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                    onClick={handleSubmit}
                                                >
                                                    Register
                                                </button>

                                                {/* Login Link */}
                                                <div className="auth-link-container">
                                                    <span className="auth-link-text">
                                                        Already member?
                                                    </span>
                                                    <Link
                                                        to="/login"
                                                        className="auth-link"
                                                    >
                                                        Log in
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Registration;