import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event?.target?.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event?.target?.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Login logic would go here
    };

    return (
        <>
            <Helmet>
                <title>Login | RedSeam Clothing - Access Your Fashion Account</title>
                <meta name="description" content="Login to your RedSeam Clothing account to access exclusive fashion collections, track orders, and enjoy personalized shopping experience. Secure authentication for premium clothing enthusiasts." />
                <meta property="og:title" content="Login | RedSeam Clothing - Access Your Fashion Account" />
                <meta property="og:description" content="Login to your RedSeam Clothing account to access exclusive fashion collections, track orders, and enjoy personalized shopping experience. Secure authentication for premium clothing enthusiasts." />
            </Helmet>

            <main className="login-container">
                <Header />
                <section className="login-main-content">
                    <div className="login-layout">
                        <div className="login-image-section">
                            <img
                                src="/images/img_rectangle_10.png"
                                alt="RedSeam Clothing Fashion Models"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>

                        {/* Right Login Form Section */}
                        <div className="login-form-section">
                            <div className="login-form-content">
                                {/* Login Title */}
                                <h1
                                    style={{
                                        fontSize: '42px',
                                        fontFamily: 'Poppins',
                                        fontWeight: '600',
                                        lineHeight: '63px',
                                        color: '#10151f',
                                        textAlign: 'left',
                                        width: 'auto'
                                    }}
                                >
                                    Log in
                                </h1>

                                {/* Form Container */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                    {/* Input Fields */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                        {/* Email Input */}
                                        <input
                                            className="input"
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />

                                        <div className="relative w-full">
                                            <input
                                                className="input"
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={handlePasswordChange}
                                                style={{ paddingRight: '40px' }}
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
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                        <button
                                            className="btn btn-primary btn-block"
                                            onClick={handleLogin}
                                            type="button"
                                        >
                                            Log in
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;