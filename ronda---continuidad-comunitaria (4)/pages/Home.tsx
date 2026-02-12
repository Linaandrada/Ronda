
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { UserRole, Encounter } from '../types';
import AttendeeListModal from '../components/AttendeeListModal';

const Home: React.FC = () => {
  const { user, showToast, encounters, toggleAttendance } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAttendees, setShowAttendees] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const isAdmin = user?.role === UserRole.ADMIN;
  const today = new Date().toISOString().split('T')[0];

  // Logic for future and past encounters
  const futureEncounters = [...encounters]
    .filter(e => e.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastEncounters = [...encounters]
    .filter(e => e.date < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const highlight = futureEncounters[0];

  const getStatus = (enc: Encounter) => {
    if (enc.date > today) return 'Programado';
    if (enc.date === today) return 'Hoy';
    return 'Encuentro finalizado';
  };

  const StatusBadge = ({ enc }: { enc: Encounter }) => {
    const status = getStatus(enc);
    const isPast = status === 'Encuentro finalizado';
    
    return (
      <span className={`text-[10px] font-inter font-semibold px-3 py-1 border uppercase tracking-widest transition-all ${
        isPast 
          ? 'border-ronda-primary text-ronda-primary bg-transparent' 
          : 'border-ronda-accent text-ronda-accent'
      }`}>
        {status}
      </span>
    );
  };

  const handleAttendanceToggle = () => {
    if (!user || !highlight) return;
    const isAttending = highlight.attendees.includes(user.name);
    toggleAttendance(highlight.id, user.name);
    showToast(isAttending ? 'Asistencia cancelada' : 'Asistencia confirmada');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-48">
          <div className="text-body italic opacity-40 animate-pulse">Cargando encuentros...</div>
        </div>
      </Layout>
    );
  }

  const isUserAttending = (enc: Encounter) => user ? enc.attendees.includes(user.name) : false;

  return (
    <Layout>
      {showAttendees && highlight && (
        <AttendeeListModal 
          attendees={highlight.attendees} 
          onClose={() => setShowAttendees(false)} 
        />
      )}

      {/* Facilitator Creation Box */}
      {isAdmin && (
        <div className="w-full border border-ronda-gray-light border-opacity-30 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between mb-24 gap-6">
          <div>
            <h2 className="text-title-2 mb-1 italic">Convocar nuevo</h2>
            <h2 className="text-title-2 italic">encuentro</h2>
          </div>
          <button 
            onClick={() => navigate('/admin/encuentros/nuevo')}
            className="w-full md:w-auto bg-ronda-accent text-ronda-white px-10 py-5 text-button flex items-center justify-center gap-4 hover:opacity-90 transition-opacity"
          >
            CREAR <span className="text-xl">+</span>
          </button>
        </div>
      )}

      {/* Sección Superior: Lo que viene */}
      <section className="mb-12">
        <div className="mb-12">
          <h2 className="text-title-1 italic leading-tight">Lo que viene</h2>
          <span className="text-subtitle-small opacity-60 mt-1 block">Próximo encuentro programado</span>
        </div>

        {highlight ? (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8">
              <span className="text-subtitle-small opacity-60 uppercase">DETALLES DE LA SESIÓN</span>
              <StatusBadge enc={highlight} />
            </div>
            
            <h1 
              className="text-h1 mb-12 cursor-pointer hover:opacity-70 transition-opacity break-words"
              onClick={() => navigate(`${isAdmin ? '/admin' : '/participante'}/encuentros/${highlight.id}`)}
            >
              {highlight.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:gap-8 gap-3 text-subtitle-small opacity-60 mb-12">
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
                {highlight.date}
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {highlight.time || '18:00'}
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {highlight.location || 'SALA VIRTUAL'}
              </span>
            </div>

            <div className="mb-12">
              <span className="text-subtitle-small text-ronda-accent block mb-4">PREGUNTA PARA LA SESIÓN</span>
              <p className="text-title-1 italic max-w-[800px]">
                "{highlight.promptQuestion}"
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              {isAdmin ? (
                <button 
                  onClick={() => navigate(`/admin/encuentros/editar/${highlight.id}`)}
                  className="w-full md:w-auto bg-ronda-accent text-ronda-white px-12 py-5 text-button hover:opacity-90 transition-opacity"
                >
                  EDITAR ENCUENTRO
                </button>
              ) : (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                  <button 
                    onClick={handleAttendanceToggle}
                    className={`w-full md:w-auto ${isUserAttending(highlight) ? 'border border-ronda-primary text-ronda-primary' : 'bg-ronda-accent text-ronda-white'} px-12 py-5 text-button hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                  >
                    {isUserAttending(highlight) ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        CONFIRMADO
                      </>
                    ) : 'ASISTIRÉ AL ENCUENTRO'}
                  </button>
                  {isUserAttending(highlight) && (
                    <button 
                      onClick={handleAttendanceToggle}
                      className="text-subtitle-small opacity-40 hover:opacity-100 transition-opacity border-b border-transparent hover:border-ronda-primary"
                    >
                      CANCELAR ASISTENCIA
                    </button>
                  )}
                </div>
              )}
              
              <button 
                onClick={() => setShowAttendees(true)}
                className="flex items-center gap-3 hover:opacity-60 transition-opacity"
              >
                <div className="flex -space-x-2">
                  {highlight.attendees.slice(0, 3).map((name, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-ronda-gray-light border-2 border-ronda-bg overflow-hidden">
                      <img src={`https://picsum.photos/seed/${name}/50/50`} alt="" />
                    </div>
                  ))}
                  {highlight.attendees.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-ronda-primary text-ronda-white text-[10px] flex items-center justify-center border-2 border-ronda-bg">
                      +{highlight.attendees.length - 3}
                    </div>
                  )}
                  {highlight.attendees.length === 0 && (
                    <div className="w-8 h-8 rounded-full bg-ronda-gray-light opacity-20 border-2 border-ronda-bg"></div>
                  )}
                </div>
                <span className="text-subtitle-small opacity-40 uppercase">
                  {highlight.attendees.length} {highlight.attendees.length === 1 ? 'CONFIRMADO' : 'CONFIRMADOS'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-24 border border-ronda-gray-light border-opacity-20 border-dashed text-center">
            <p className="text-body italic opacity-40 mb-8">
              {isAdmin ? 'Todavía no hay un próximo encuentro.' : 'Todavía no hay encuentros programados.'}
            </p>
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin/encuentros/nuevo')}
                className="text-button border-b border-ronda-accent text-ronda-accent hover:opacity-70 transition-opacity"
              >
                CREAR NUEVO ENCUENTRO
              </button>
            )}
          </div>
        )}
      </section>

      {/* Divider visual con espaciado generoso */}
      <div className="w-full h-[1px] bg-ronda-gray-light opacity-20 my-24 md:my-32"></div>

      {/* Sección Inferior: Encuentros anteriores */}
      <section>
        <div className="mb-12">
          <h2 className="text-title-1 italic leading-tight">Encuentros anteriores</h2>
          <span className="text-subtitle-small opacity-60 mt-1 block">Memoria del taller y conversación posterior</span>
        </div>

        <div className="w-full h-[1px] bg-ronda-gray-light opacity-10 mb-12"></div>

        {pastEncounters.length > 0 ? (
          <div className="space-y-16">
            {pastEncounters.map((enc) => (
              <div 
                key={enc.id} 
                className="group cursor-pointer pb-16 border-b border-ronda-gray-light border-opacity-10 last:border-0"
                onClick={() => navigate(`${isAdmin ? '/admin' : '/participante'}/encuentros/${enc.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center justify-between md:justify-start md:gap-4 flex-1">
                    <span className="text-subtitle-small opacity-40 uppercase">ENCUENTRO {enc.id}</span>
                    <div className="md:hidden">
                      <StatusBadge enc={enc} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 text-subtitle-small opacity-40">
                    <div className="hidden md:block">
                      <StatusBadge enc={enc} />
                    </div>
                    <span>{enc.date}</span>
                    <span className="flex items-center gap-2">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                       {enc.comments.length} COMENTARIOS
                    </span>
                  </div>
                </div>
                <h3 className="text-title-2 italic group-hover:text-ronda-accent transition-colors leading-snug">
                  {enc.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-body italic opacity-30">Aún no hay encuentros anteriores.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Home;
