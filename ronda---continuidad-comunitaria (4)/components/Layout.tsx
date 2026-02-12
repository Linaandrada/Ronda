
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../App';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, encounters } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menú con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === UserRole.ADMIN;
  const homePath = isAdmin ? '/admin/encuentros' : '/participante/encuentros';
  const detailPrefix = isAdmin ? '/admin/encuentros/' : '/participante/encuentros/';

  const handleLogoClick = () => {
    if (location.pathname === homePath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(homePath);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const closestFuture = [...encounters]
    .filter(e => e.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const handleProxClick = () => {
    if (closestFuture) {
      navigate(`${detailPrefix}${closestFuture.id}`);
    } else {
      navigate(homePath);
    }
    setIsMenuOpen(false);
  };

  const isProxActive = closestFuture && location.pathname === `${detailPrefix}${closestFuture.id}`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-ronda-bg overflow-x-hidden">
      {/* Navbar Desktop */}
      <nav className="hidden lg:flex w-full max-w-[960px] items-center justify-between py-12 px-0">
        <div 
          className="text-[24px] font-crimson font-semibold cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          Ronda
        </div>
        
        <div className="flex items-center gap-12 text-nav">
          <button 
            className={`hover:opacity-60 transition-opacity ${isProxActive ? 'border-b border-ronda-primary' : ''}`}
            onClick={handleProxClick}
          >
            PRÓX ENCUENTRO
          </button>
          
          {isAdmin && (
            <button 
              className={`hover:opacity-60 transition-opacity ${location.pathname.includes('/nuevo') ? 'border-b border-ronda-primary' : ''}`}
              onClick={() => navigate('/admin/encuentros/nuevo')}
            >
              CREAR ENCUENTRO
            </button>
          )}

          <div className="flex items-center gap-4 text-nav lowercase">
            <span className="opacity-60 truncate max-w-[200px]">
              {user?.name} · {user?.role === UserRole.ADMIN ? 'Facilitadora' : 'Participante'}
            </span>
            <span className="opacity-20">|</span>
            <button onClick={handleLogout} className="hover:opacity-60 transition-opacity underline decoration-ronda-accent decoration-2 underline-offset-4">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Topbar Mobile/Tablet (< 1024px) */}
      <nav className="flex lg:hidden w-full items-center justify-between py-6 px-6 bg-ronda-bg z-[110]">
        <div 
          className="text-[24px] font-crimson font-semibold cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          Ronda
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -mr-2"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Menú Hamburguesa (Drawer) */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 z-[120] transition-visibility duration-300 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-ronda-primary transition-opacity duration-300 ${isMenuOpen ? 'opacity-40' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Drawer Content */}
        <div className={`absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-ronda-bg shadow-2xl transition-transform duration-300 ease-in-out p-12 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end mb-12">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-button flex items-center gap-2 opacity-60 hover:opacity-100"
            >
              CERRAR <span className="text-xl">×</span>
            </button>
          </div>

          <div className="flex flex-col gap-10">
            {/* Atajo Próximo */}
            <button 
              onClick={handleProxClick}
              className={`text-nav text-left py-4 border-b border-ronda-gray-light border-opacity-20 flex justify-between items-center ${isProxActive ? 'text-ronda-accent' : ''}`}
            >
              PRÓX ENCUENTRO
              <span className="opacity-40">→</span>
            </button>

            {/* Admin: Crear */}
            {isAdmin && (
              <button 
                onClick={() => {
                  navigate('/admin/encuentros/nuevo');
                  setIsMenuOpen(false);
                }}
                className={`text-nav text-left py-4 border-b border-ronda-gray-light border-opacity-20 flex justify-between items-center ${location.pathname.includes('/nuevo') ? 'text-ronda-accent' : ''}`}
              >
                CREAR ENCUENTRO
                <span className="opacity-40">+</span>
              </button>
            )}

            {/* Info Usuario */}
            <div className="pt-8 mt-auto">
              <div className="text-subtitle-small opacity-40 mb-2">Usuario actual</div>
              <div className="text-nav normal-case font-medium truncate mb-6">
                {user?.name}
                <div className="text-[10px] opacity-40 uppercase tracking-widest mt-1">
                  {user?.role === UserRole.ADMIN ? 'Facilitadora' : 'Participante'}
                </div>
              </div>

              {/* Cerrar Sesión */}
              <button 
                onClick={handleLogout}
                className="text-button text-ronda-accent border-b border-ronda-accent pb-1 w-fit hover:opacity-60 transition-opacity"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="w-full lg:max-w-[960px] flex-grow px-6 lg:px-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[960px] py-16 lg:py-24 px-6 lg:px-0 mt-auto">
        <div className="w-full h-[1px] bg-ronda-gray-light opacity-20 mb-8"></div>
        <div className="text-subtitle-small text-center opacity-40">
          2026 RONDA — CONTINUIDAD DIGITAL PARA LO HUMANO
        </div>
      </footer>
    </div>
  );
};

export default Layout;
