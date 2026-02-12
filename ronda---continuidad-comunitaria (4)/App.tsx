
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserRole, Encounter } from './types';
import { mockEncounters } from './data/mockData';
import Login from './pages/Login';
import Home from './pages/Home';
import EncounterDetail from './pages/EncounterDetail';
import CreateEncounter from './pages/CreateEncounter';
import EditEncounter from './pages/EditEncounter';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  showToast: (msg: string) => void;
  logout: () => void;
  encounters: Encounter[];
  updateEncounter: (enc: Encounter) => void;
  addEncounter: (enc: Encounter) => void;
  toggleAttendance: (id: string, userName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-ronda-primary text-ronda-white px-6 py-3 rounded-none shadow-xl text-button animate-bounce">
      {message}
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    // Session initialization
    const savedUser = localStorage.getItem('ronda_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('ronda_user');
      }
    }

    // Encounters initialization
    const savedEncounters = localStorage.getItem('ronda_encounters');
    if (savedEncounters) {
      try {
        setEncounters(JSON.parse(savedEncounters));
      } catch (e) {
        setEncounters(mockEncounters);
      }
    } else {
      setEncounters(mockEncounters);
      localStorage.setItem('ronda_encounters', JSON.stringify(mockEncounters));
    }

    setIsInitializing(false);
  }, []);

  const handleSetUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('ronda_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('ronda_user');
    }
  };

  const logout = () => {
    handleSetUser(null);
  };

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const saveEncounters = (newEncounters: Encounter[]) => {
    setEncounters(newEncounters);
    localStorage.setItem('ronda_encounters', JSON.stringify(newEncounters));
  };

  const updateEncounter = (enc: Encounter) => {
    const next = encounters.map(e => e.id === enc.id ? enc : e);
    saveEncounters(next);
  };

  const addEncounter = (enc: Encounter) => {
    const next = [enc, ...encounters];
    saveEncounters(next);
  };

  const toggleAttendance = (id: string, userName: string) => {
    const next = encounters.map(e => {
      if (e.id === id) {
        const isAttending = e.attendees.includes(userName);
        const newAttendees = isAttending 
          ? e.attendees.filter(a => a !== userName)
          : [...e.attendees, userName];
        return { ...e, attendees: newAttendees };
      }
      return e;
    });
    saveEncounters(next);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-ronda-bg flex items-center justify-center">
        <div className="text-body italic opacity-40 animate-pulse">Ronda...</div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser: handleSetUser, 
      showToast, 
      logout,
      encounters,
      updateEncounter,
      addEncounter,
      toggleAttendance
    }}>
      <HashRouter>
        <ScrollToTop />
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to={user.role === UserRole.ADMIN ? "/admin/encuentros" : "/participante/encuentros"} replace />
              ) : (
                <Login />
              )
            } 
          />
          
          {/* Participant Routes */}
          <Route 
            path="/participante/encuentros" 
            element={user?.role === UserRole.PARTICIPANT ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/participante/encuentros/:id" 
            element={user?.role === UserRole.PARTICIPANT ? <EncounterDetail /> : <Navigate to="/login" replace />} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/encuentros" 
            element={user?.role === UserRole.ADMIN ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/admin/encuentros/nuevo" 
            element={user?.role === UserRole.ADMIN ? <CreateEncounter /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/admin/encuentros/editar/:id" 
            element={user?.role === UserRole.ADMIN ? <EditEncounter /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/admin/encuentros/:id" 
            element={user?.role === UserRole.ADMIN ? <EncounterDetail /> : <Navigate to="/login" replace />} 
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
