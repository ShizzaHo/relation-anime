import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalService from './services/global-service';

import App from './views/app';
import ServicesProvider from './components/servicesProvider';
import Auth from './views/auth';

const service = new GlobalService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ServicesProvider service={service}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/auth' element={<Auth />} />
            </Routes>
        </BrowserRouter>
    </ServicesProvider>
);

reportWebVitals();
