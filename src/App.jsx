import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialProofToast from './components/SocialProofToast';

// Public Funnel Views
import HomeView from './views/HomeView';
import SignalFunnelView from './views/SignalFunnelView';
import CourseFunnelView from './views/CourseFunnelView';
import ThankYouView from './views/ThankYouView';
import MemberAreaView from './views/MemberAreaView';

// Admin Views
import AdminLayout from './views/admin/AdminLayout';
import AdminDashboard from './views/admin/AdminDashboard';
import LeadsManager from './views/admin/LeadsManager';
import SignalManager from './views/admin/SignalManager';
import CourseManager from './views/admin/CourseManager';
import TestimonialManager from './views/admin/TestimonialManager';
import CmsManager from './views/admin/CmsManager';
import SystemSettings from './views/admin/SystemSettings';
import NotificationManager from './views/admin/NotificationManager';

function MainContent() {
  const { currentRoute, setCurrentRoute, adminTab, setAdminTab } = useApp();

  // Secret Keyboard Shortcut: Press "Control + Shift + A" to open Admin CRM secretly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentRoute('admin');
        setAdminTab('dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentRoute, setAdminTab]);

  if (currentRoute === 'admin') {
    const activeTab = adminTab || 'dashboard';
    return (
      <AdminLayout>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'leads' && <LeadsManager />}
        {activeTab === 'notifications' && <NotificationManager />}
        {activeTab === 'signals' && <SignalManager />}
        {activeTab === 'courses' && <CourseManager />}
        {activeTab === 'testimonials' && <TestimonialManager />}
        {activeTab === 'cms' && <CmsManager />}
        {activeTab === 'settings' && <SystemSettings />}
      </AdminLayout>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: '64px' }}>
        {currentRoute === 'home' && <HomeView />}
        {currentRoute === 'signal-landing' && <SignalFunnelView />}
        {currentRoute === 'course-landing' && <CourseFunnelView />}
        {currentRoute === 'thank-you' && <ThankYouView />}
        {currentRoute === 'member-area' && <MemberAreaView />}
      </main>

      <Footer />
      <SocialProofToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
