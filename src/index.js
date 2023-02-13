import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalService from './services/global-service';

import Menu from './views/menu';
import MobxTemplate from './views/mobx-template';
import ServicesProvider from './components/servicesProvider';

const service = new GlobalService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ServicesProvider service={service}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/mobx" element={<MobxTemplate/>} />
      </Routes>
    </BrowserRouter>
  </ServicesProvider>
);

reportWebVitals();
