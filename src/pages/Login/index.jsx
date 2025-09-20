import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '../../components/common/Header';
import '../../sass/pages/_login.scss'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError('');

        try {
            const response = await axios.post(
                'https://api.redseam.redberryinternship.ge/login',
                {
                    email: data.email,
                    password: data.password
                }
            );

            if (response.status === 200) {
                // Store token if needed
                localStorage.setItem('token', response.data.token);
                navigate('/'); // Redirect to main page
            }
        } catch (err) {
            setError(err.response?.data?.message || 'ავტორიზაცია ვერ მოხერხდა');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <main className="login-container">
                <Header />
                <div className="login-main-content">
                    <div className="login-image-section">
                        <img
                            src="/images/img_rectangle_10.png"
                            alt="RedSeam Clothing Fashion Models"
                        />
                    </div>

                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1
                                style={{
                                    fontSize: '62px',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: '600',
                                    lineHeight: '63px',
                                    color: '#10151f',
                                    marginBottom: "40px",
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                }}
                            >
                                Log in
                            </h1>

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

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                    <input
                                        className="input"
                                        placeholder="Email"
                                        type="email"
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

                                    <div>
                                        <input
                                            className="input"
                                            placeholder="Password"
                                            type={showPassword ? "text" : "password"}
                                            style={{ paddingRight: '40px' }}
                                            {...register('password', {
                                                required: 'Password აუცილებელია'
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleTogglePassword}
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
                                    {errors.password && (
                                        <span style={{ color: '#ff3f00', fontSize: '16px' }}>
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'ავტორიზაცია...' : 'Log in'}
                                    </button>

                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
                                        <span className="auth-link-text">
                                            Not a member?
                                        </span>
                                        <Link
                                            to="/register"
                                            className="auth-link"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
};

export default Login;
