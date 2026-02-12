
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { mockUsers } from '../data/mockData';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    const user = role === UserRole.ADMIN ? mockUsers.admin : mockUsers.participant;
    setUser(user);
    if (role === UserRole.ADMIN) {
      navigate('/admin/encuentros');
    } else {
      navigate('/participante/encuentros');
    }
  };

  return (
    <div className="min-h-screen bg-ronda-bg flex flex-col items-center justify-center p-6 relative">
      <div className="max-w-[600px] w-full text-center">
        <h1 className="text-[64px] md:text-[80px] font-crimson font-normal mb-4 leading-tight">Ronda</h1>
        <p className="text-body mb-24 opacity-80">Continuidad para talleres presenciales</p>

        <div className="space-y-4 flex flex-col items-center">
          <button 
            onClick={() => handleLogin(UserRole.PARTICIPANT)}
            className="w-full max-w-[400px] bg-ronda-accent text-ronda-white py-5 text-button hover:opacity-90 transition-opacity"
          >
            ENTRAR COMO PARTICIPANTE
          </button>
          <button 
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full max-w-[400px] bg-ronda-accent text-ronda-white py-5 text-button hover:opacity-90 transition-opacity"
          >
            ENTRAR COMO FACILITADOR
          </button>
          
          <button className="text-button text-ronda-primary mt-8 opacity-60 hover:opacity-100 transition-opacity">
            CREAR CUENTA
          </button>
        </div>

        <div className="mt-48 flex flex-col items-center">
          <div className="w-[1px] h-24 bg-ronda-gray-light opacity-30 mb-8"></div>
          <div className="w-10 h-10 border border-ronda-primary rounded-full flex items-center justify-center opacity-40">
            <div className="w-6 h-6 border border-ronda-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 text-center text-subtitle-small opacity-40 px-6">
        2026 RONDA — CONTINUIDAD DIGITAL PARA LO HUMANO
      </div>
    </div>
  );
};

export default Login;
