import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { routes } from './routes';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </Router>
    );
};

export default AppRouter;