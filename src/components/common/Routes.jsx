import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/Login/index';
import RegistrationPage from '../../pages/Registration/index';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>

        </>
    );
};

export default AppRoutes;