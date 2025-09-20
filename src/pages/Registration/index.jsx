import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import '../../sass/pages/_registration.scss'

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
            <main className="registration-container">
                <Header />
                <div className="registration-main-content">
                    <div className="registration-image-section">
                        <img
                            src="/images/img_rectangle_10.png"
                            alt="RedSeam Clothing Fashion Models"
                        />
                    </div>

                    <div className="registration-form-section">
                        <div className="registration-form-content">
                            <h1
                                style={{
                                    fontSize: '72px',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: '600',
                                    lineHeight: '73px',
                                    color: '#10151f',
                                    marginBottom: "40px",
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                }}
                            >
                                Registration
                            </h1>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
                                    <>
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
                                    </>

                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', padding: '0 14px', width: '100%' }}>
                                        <button
                                            type="button"
                                            onClick={() => document.querySelector('input[type="file"]')?.click()}
                                            className="transition-colors"
                                            style={{
                                                fontSize: '20px',
                                                fontFamily: 'Poppins',
                                                fontWeight: '400',
                                                lineHeight: '28px',
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
                                                fontSize: '20px',
                                                fontFamily: 'Poppins',
                                                fontWeight: '400',
                                                lineHeight: '28px',
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

                                <div className="form-container">
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div className="form-fields">
                                            <div>
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

                                            <div>
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
                                            <div className="password-wrapper">
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
                                                    style={{ paddingRight: '70px' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="toggle-password-button"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    <img
                                                        src="/images/img_search.svg"
                                                        alt="Toggle password visibility"
                                                    />
                                                </button>
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div className="password-wrapper">
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
                                                    style={{ paddingRight: '70px' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    className="toggle-password-button"
                                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                >
                                                    <img
                                                        src="/images/img_search.svg"
                                                        alt="Toggle password visibility"
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                                onClick={handleSubmit}
                                            >
                                                Register
                                            </button>

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
            </main >
        </>
    );
};

export default Registration;