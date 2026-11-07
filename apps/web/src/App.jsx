import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import HomePage from './pages/HomePage';
import DeliveryPage from './pages/DeliveryPage';
import BlogPage from './pages/BlogPage';
import { I18nProvider } from './i18n';

function App() {
    return (
        <I18nProvider>
            <Router>
                <ScrollToTop />
                <div className="grain flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/delivery" element={<DeliveryPage />} />
                            <Route path="/noticias" element={<BlogPage />} />
                        </Routes>
                    </main>
                    <SiteFooter />
                </div>
            </Router>
        </I18nProvider>
    );
}

export default App;
