
const Header = ({ className = '', ...props }) => {
    const headerStyles = {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingTop: '28px',
        paddingBottom: '28px'
    };

    return (
        <header
            style={headerStyles}
            className={`header-component ${className}`}
            {...props}
        >
            <div className="header-container">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src="/images/img_header_logo.png"
                            alt="RedSeam Clothing Logo"
                            className="header-logo"
                        />
                    </div>

                    {/* Login Section */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        <img
                            src="/images/img_heroicons_mini_users.svg"
                            alt="User Icon"
                            className="header-user-icon"
                            style={{ flexShrink: 0 }}
                        />
                        <span
                            className="hidden"
                            style={{
                                fontSize: '12px',
                                fontFamily: 'Poppins',
                                fontWeight: '500',
                                lineHeight: '18px',
                                textAlign: 'left',
                                color: '#10151f'
                            }}
                        >
                            Log in
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;