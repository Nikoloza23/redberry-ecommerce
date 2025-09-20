import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '../../components/common/Header';
import '../../sass/pages/_registration.scss'

const Registration = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const password = watch('password');

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

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);

            if (profileImage) {
                const response = await fetch(profileImage);
                const blob = await response.blob();
                formData.append('avatar', blob, 'avatar.jpg');
            }

            const response = await axios.post(
                'https://api.redseam.redberryinternship.ge/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'რეგისტრაცია ვერ მოხერხდა');
        } finally {
            setIsSubmitting(false);
        }
        console.log(data)
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
                                    {error && (
                                        <div style={{
                                            color: '#ff3f00',
                                            marginBottom: '20px',
                                            fontSize: '18px',
                                            textAlign: 'center'
                                        }}>
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div className="form-fields">
                                            <div>
                                                <input
                                                    className="input"
                                                    placeholder="Username *"
                                                    id="username"
                                                    autoComplete="username"
                                                    {...register('username', {
                                                        required: 'Username აუცილებელია',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'Username უნდა იყოს მინიმუმ 3 სიმბოლო'
                                                        }
                                                    })}
                                                />
                                                {errors.username && (
                                                    <span style={{ color: '#ff3f00', fontSize: '16px' }}>
                                                        {errors.username.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    className="input"
                                                    type="email"
                                                    placeholder="Email *"
                                                    id="email"
                                                    autoComplete="email"
                                                    {...register('email', {
                                                        required: 'Email აუცილებელია',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'არასწორი email ფორმატი'
                                                        }
                                                    })}
                                                />
                                                {errors.email && (
                                                    <span style={{ color: '#ff3f00', fontSize: '16px' }}>
                                                        {errors.email.message}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Password Field */}
                                            <div className="password-wrapper">
                                                <input
                                                    className="input"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password *"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    style={{ paddingRight: '70px' }}
                                                    {...register('password', {
                                                        required: 'Password აუცილებელია',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'Password უნდა იყოს მინიმუმ 3 სიმბოლო'
                                                        }
                                                    })}
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
                                            {errors.password && (
                                                <span style={{ color: '#ff3f00', fontSize: '16px' }}>
                                                    {errors.password.message}
                                                </span>
                                            )}

                                            {/* Confirm Password Field */}
                                            <div className="password-wrapper">
                                                <input
                                                    className="input"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm password *"
                                                    id="confirmPassword"
                                                    autoComplete="new-password"
                                                    style={{ paddingRight: '70px' }}
                                                    {...register('confirmPassword', {
                                                        required: 'Password confirmation აუცილებელია',
                                                        validate: value => value === password || 'Passwords არ ემთხვევა'
                                                    })}
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
                                            {errors.confirmPassword && (
                                                <span style={{ color: '#ff3f00', fontSize: '16px' }}>
                                                    {errors.confirmPassword.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-actions">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'რეგისტრაცია...' : 'Register'}
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