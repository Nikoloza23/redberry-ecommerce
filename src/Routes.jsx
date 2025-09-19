import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import RegistrationPage from './pages/Registration/index';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;