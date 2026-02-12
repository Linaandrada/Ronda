
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { Comment, Encounter, UserRole, Reading } from '../types';
import AttendeeListModal from '../components/AttendeeListModal';

const EncounterDetail: React.FC = () => {
  const { id } = useParams();
  const { user, showToast, encounters, updateEncounter } = useApp();
  const navigate = useNavigate();
  const [encounter, setEncounter] = useState<Encounter | undefined>(encounters.find(e => e.id === id));
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [showAttendees, setShowAttendees] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados temporales para edición inline
  const [editForm, setEditForm] = useState<Partial<Encounter>>({});

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = encounters.find(e => e.id === id);
      setEncounter(found);
      if (found) {
        setEditForm({
          summaryParagraph: found.summaryParagraph || '',
          keyIdeas: found.keyIdeas || [],
          herramientasMetodologicas: found.herramientasMetodologicas || [],
          readings: found.readings || []
        });
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id, encounters]);

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      author: user?.name || 'Usuario',
      text: commentText,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    if (encounter) {
      const updated = { ...encounter, comments: [newComment, ...encounter.comments] };
      updateEncounter(updated);
      setCommentText('');
      showToast('Reflexión publicada con éxito');
    }
  };

  const markAsFinished = () => {
    if (!encounter) return;
    // Para marcar como finalizado, cambiamos la fecha a ayer
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const updated: Encounter = {
      ...encounter,
      date: yesterday.toISOString().split('T')[0]
    };
    updateEncounter(updated);
    setIsEditing(true);
    showToast('Encuentro finalizado. Ya podés cargar la bitácora y lecturas.');
  };

  const handleSaveEdits = () => {
    if (!encounter) return;
    const updated: Encounter = {
      ...encounter,
      ...editForm
    };
    updateEncounter(updated);
    setIsEditing(false);
    showToast('Cambios guardados');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-48">
          <div className="text-body italic opacity-40 animate-pulse">Cargando detalles...</div>
        </div>
      </Layout>
    );
  }

  if (!encounter) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-title-1 italic mb-8">Encuentro no encontrado</h1>
          <button onClick={() => navigate(-1)} className="text-button border-b border-ronda-primary">VOLVER</button>
        </div>
      </Layout>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const isPast = encounter.date < today;
  const isAdmin = user?.role === UserRole.ADMIN;
  const homePath = isAdmin ? '/admin/encuentros' : '/participante/encuentros';

  // Helper to check if bitacora has content
  const hasBitacora = encounter.summaryParagraph || (encounter.keyIdeas && encounter.keyIdeas.length > 0) || (encounter.herramientasMetodologicas && encounter.herramientasMetodologicas.length > 0);

  return (
    <Layout>
      {showAttendees && (
        <AttendeeListModal 
          attendees={encounter.attendees} 
          onClose={() => setShowAttendees(false)} 
        />
      )}

      {/* Breadcrumb - Solo para encuentros pasados o si es admin visualizando memoria */}
      {(isPast || isAdmin) && (
        <div className="mb-12">
          <button 
            onClick={() => navigate(homePath)}
            className="text-subtitle-small opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 uppercase tracking-widest"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a Home
          </button>
        </div>
      )}

      <section className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="text-subtitle-small opacity-40 uppercase">ENCUENTRO {encounter.id}</span>
            <span className={`text-[10px] font-inter font-semibold px-3 py-1 border uppercase tracking-widest ${isPast ? 'border-ronda-primary text-ronda-primary' : 'border-ronda-accent text-ronda-accent'}`}>
              {isPast ? 'Encuentro finalizado' : 'Programado'}
            </span>
          </div>
          <button 
            onClick={() => setShowAttendees(true)}
            className="text-subtitle-small opacity-60 hover:opacity-100 border-b border-ronda-gray-light uppercase"
          >
            {encounter.attendees.length} ASISTENTES
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <h1 className="text-[64px] md:text-[96px] font-crimson font-light italic leading-[1.1] flex-1">
            {encounter.title}
          </h1>
          {isAdmin && (
            <div className="flex flex-col gap-4">
              {!isPast && (
                <button 
                  onClick={markAsFinished}
                  className="bg-ronda-primary text-ronda-white px-8 py-4 text-button hover:opacity-90"
                >
                  MARCAR COMO FINALIZADO
                </button>
              )}
              {isPast && !isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="border border-ronda-primary text-ronda-primary px-8 py-4 text-button hover:bg-ronda-primary hover:text-ronda-white"
                >
                  EDITAR BITÁCORA Y LECTURAS
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-8 text-subtitle-small opacity-40 mb-16">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
            {encounter.date}
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {encounter.location || 'Estudio Ronda — Barrio General Paz'}
          </span>
        </div>

        {/* ESTRUCTURA OBLIGATORIA SEGÚN ESTADO */}
        {isPast ? (
          <div className="space-y-32">
            {/* 1. Pregunta Detonante */}
            <div>
              <h3 className="text-subtitle-small text-ronda-accent block mb-6 uppercase font-inter tracking-widest">Pregunta detonante</h3>
              <p className="text-title-1 italic max-w-[800px] leading-tight text-ronda-primary">
                "{encounter.promptQuestion}"
              </p>
            </div>

            {/* 2. Lecturas del encuentro */}
            <div className="pt-12 border-t border-ronda-gray-light border-opacity-10">
              <h3 className="text-subtitle-small opacity-40 block mb-12 uppercase font-inter tracking-widest">Lecturas del encuentro</h3>
              {isEditing ? (
                <div className="space-y-12">
                  {(editForm.readings || []).map((reading, i) => (
                    <div key={i} className="p-8 border border-ronda-gray-light border-opacity-30 space-y-4 bg-ronda-white bg-opacity-20">
                      <input 
                        className="w-full bg-transparent border-b border-opacity-20 text-nav" 
                        placeholder="Título" 
                        value={reading.title}
                        onChange={(e) => {
                          const rs = [...(editForm.readings || [])];
                          rs[i].title = e.target.value;
                          setEditForm({...editForm, readings: rs});
                        }}
                      />
                      <input 
                        className="w-full bg-transparent border-b border-opacity-20 italic text-subtitle-small" 
                        placeholder="Autor" 
                        value={reading.author}
                        onChange={(e) => {
                          const rs = [...(editForm.readings || [])];
                          rs[i].author = e.target.value;
                          setEditForm({...editForm, readings: rs});
                        }}
                      />
                      <textarea 
                        className="w-full bg-transparent border-b border-opacity-20 text-nav normal-case h-16 font-crimson" 
                        placeholder="Párrafo 1" 
                        value={reading.paragraph1}
                        onChange={(e) => {
                          const rs = [...(editForm.readings || [])];
                          rs[i].paragraph1 = e.target.value;
                          setEditForm({...editForm, readings: rs});
                        }}
                      />
                      <textarea 
                        className="w-full bg-transparent border-b border-opacity-20 text-nav normal-case h-16 font-crimson" 
                        placeholder="Párrafo 2" 
                        value={reading.paragraph2}
                        onChange={(e) => {
                          const rs = [...(editForm.readings || [])];
                          rs[i].paragraph2 = e.target.value;
                          setEditForm({...editForm, readings: rs});
                        }}
                      />
                      <textarea 
                        className="w-full bg-transparent border-b border-opacity-20 italic text-subtitle-small normal-case h-12 font-crimson" 
                        placeholder="Nota/Hipótesis (Opcional)" 
                        value={reading.paragraph3 || ''}
                        onChange={(e) => {
                          const rs = [...(editForm.readings || [])];
                          rs[i].paragraph3 = e.target.value;
                          setEditForm({...editForm, readings: rs});
                        }}
                      />
                      <button 
                        onClick={() => {
                          const rs = (editForm.readings || []).filter((_, idx) => idx !== i);
                          setEditForm({...editForm, readings: rs});
                        }}
                        className="text-[10px] text-ronda-accent opacity-60 hover:opacity-100 uppercase"
                      >
                        Eliminar lectura
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setEditForm({...editForm, readings: [...(editForm.readings || []), {title: '', author: '', paragraph1: '', paragraph2: ''}]})}
                    className="text-button text-ronda-accent hover:opacity-70"
                  >
                    + AGREGAR LECTURA
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
                  {encounter.readings && encounter.readings.length > 0 ? (
                    encounter.readings.map((reading, i) => (
                      <div key={i} className="border-l border-ronda-primary border-opacity-10 pl-8 py-2">
                        <h4 className="text-nav uppercase mb-2 text-ronda-primary font-semibold">{reading.title}</h4>
                        <p className="text-subtitle-small italic opacity-60 mb-6">{reading.author}</p>
                        <div className="space-y-6">
                          <p className="text-body text-[20px] normal-case opacity-80 leading-relaxed font-crimson">{reading.paragraph1}</p>
                          <p className="text-body text-[20px] normal-case opacity-80 leading-relaxed font-crimson">{reading.paragraph2}</p>
                          {reading.paragraph3 && (
                            <div className="mt-6 pt-6 border-t border-ronda-gray-light border-opacity-10">
                              <span className="text-[10px] uppercase opacity-40 block mb-2 font-inter font-bold tracking-widest">Hipótesis del facilitador</span>
                              <p className="text-body text-[18px] italic opacity-80 leading-snug font-crimson">{reading.paragraph3}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="italic opacity-40 col-span-2">Contenido pendiente de carga por la facilitadora.</p>
                  )}
                </div>
              )}
            </div>

            {/* 3. Bitácora del encuentro */}
            <div className="pt-12 border-t border-ronda-gray-light border-opacity-10">
              <h3 className="text-subtitle-small opacity-40 block mb-12 uppercase font-inter tracking-widest">Bitácora del encuentro</h3>
              <div className="max-w-[800px]">
                {isEditing ? (
                  <div className="space-y-12">
                    <div>
                      <label className="text-subtitle-small opacity-40 block mb-4 uppercase">Síntesis</label>
                      <textarea 
                        className="w-full bg-transparent border border-ronda-gray-light border-opacity-20 p-6 text-body min-h-[150px] font-crimson"
                        value={editForm.summaryParagraph}
                        onChange={(e) => setEditForm({...editForm, summaryParagraph: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-subtitle-small opacity-40 block mb-4 uppercase">Ideas Clave (una por línea)</label>
                      <textarea 
                        className="w-full bg-transparent border border-ronda-gray-light border-opacity-20 p-6 text-nav normal-case min-h-[150px] font-crimson"
                        value={editForm.keyIdeas?.join('\n')}
                        onChange={(e) => setEditForm({...editForm, keyIdeas: e.target.value.split('\n')})}
                      />
                    </div>
                    <div>
                      <label className="text-subtitle-small opacity-40 block mb-4 uppercase">Herramientas (una por línea)</label>
                      <textarea 
                        className="w-full bg-transparent border border-ronda-gray-light border-opacity-20 p-6 text-nav normal-case min-h-[100px] font-crimson"
                        value={editForm.herramientasMetodologicas?.join('\n')}
                        onChange={(e) => setEditForm({...editForm, herramientasMetodologicas: e.target.value.split('\n')})}
                      />
                    </div>
                    <button 
                      onClick={handleSaveEdits}
                      className="bg-ronda-accent text-ronda-white px-12 py-5 text-button w-full hover:opacity-90"
                    >
                      GUARDAR CAMBIOS EN LA MEMORIA
                    </button>
                  </div>
                ) : hasBitacora ? (
                  <>
                    {encounter.summaryParagraph && (
                      <p className="text-body opacity-90 leading-loose mb-16 text-[22px]">
                        {encounter.summaryParagraph}
                      </p>
                    )}
                    {encounter.herramientasMetodologicas && encounter.herramientasMetodologicas.length > 0 && (
                      <div className="mb-16">
                         <span className="text-[10px] uppercase opacity-40 block mb-6 font-inter font-bold tracking-widest">Herramientas metodológicas</span>
                         <ul className="space-y-3">
                            {encounter.herramientasMetodologicas.map((h, i) => (
                              <li key={i} className="flex gap-4 items-center">
                                <div className="w-1.5 h-1.5 bg-ronda-accent rounded-full"></div>
                                <span className="text-body italic text-[20px] opacity-80">{h}</span>
                              </li>
                            ))}
                         </ul>
                      </div>
                    )}
                    {encounter.keyIdeas && encounter.keyIdeas.length > 0 && (
                      <div>
                        <span className="text-[10px] uppercase opacity-40 block mb-6 font-inter font-bold tracking-widest">Ideas clave</span>
                        <ul className="space-y-5">
                          {encounter.keyIdeas.map((idea, i) => (
                            <li key={i} className="flex gap-5 items-start">
                              <span className="text-ronda-accent text-[24px] leading-none">/</span>
                              <span className="text-body italic opacity-80 leading-relaxed text-[20px]">{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="italic opacity-40">Contenido pendiente de carga por la facilitadora.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* VISTA PROGRAMADA: Solo Pregunta + Contenido básico */
          <div className="space-y-24">
            <div>
              <span className="text-subtitle-small text-ronda-accent block mb-6 uppercase tracking-widest">Pregunta detonante</span>
              <p className="text-title-1 italic max-w-[800px] leading-tight">
                "{encounter.promptQuestion}"
              </p>
            </div>

            <div className="max-w-[800px] text-body opacity-90 whitespace-pre-line leading-loose text-[22px]">
              {encounter.content || (
                <p className="italic opacity-40 text-title-2">Este encuentro está siendo diseñado. Pronto verás aquí la propuesta narrativa.</p>
              )}
            </div>
            
            {!isAdmin && (
              <div className="mt-16">
                <button 
                  onClick={() => {
                    const isAttending = encounter.attendees.includes(user?.name || '');
                    updateEncounter({
                      ...encounter,
                      attendees: isAttending 
                        ? encounter.attendees.filter(a => a !== user?.name)
                        : [...encounter.attendees, user?.name || '']
                    });
                    showToast(isAttending ? 'Asistencia cancelada' : 'Asistencia confirmada');
                  }}
                  className={`px-12 py-5 text-button transition-all border-2 ${encounter.attendees.includes(user?.name || '') ? 'border-ronda-primary text-ronda-primary bg-transparent' : 'bg-ronda-accent text-ronda-white border-ronda-accent'}`}
                >
                  {encounter.attendees.includes(user?.name || '') ? 'CANCELAR ASISTENCIA' : 'ASISTIRÉ AL ENCUENTRO'}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Reflexiones: Solo si es pasado */}
      {isPast && (
        <section className="mt-32 pt-12 border-t border-ronda-gray-light border-opacity-20">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-subtitle-small opacity-40 block uppercase font-inter tracking-widest">Reflexiones</h2>
            <span className="text-subtitle-small opacity-40 uppercase">{encounter.comments.length} APORTES</span>
          </div>

          <div className="space-y-16 mb-24">
            {encounter.comments.length === 0 ? (
              <p className="text-body italic opacity-40">Todavía no hay reflexiones.</p>
            ) : (
              encounter.comments.map((comment, idx) => (
                <div key={idx} className="pb-12 border-b border-ronda-gray-light border-opacity-10 last:border-0">
                  <div className="flex items-center gap-4 text-[11px] font-inter opacity-40 mb-3 uppercase tracking-wider">
                    <span className="font-bold">{comment.author}</span>
                    <span className="opacity-40">•</span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-body italic opacity-80 leading-relaxed text-[20px]">
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="bg-ronda-bg border border-ronda-gray-light border-opacity-30 p-12 mb-24">
            <span className="text-[11px] font-inter font-bold opacity-40 block mb-6 uppercase tracking-widest">¿Qué permanece en vos?</span>
            <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Comparte tu pensamiento sobre este encuentro..."
                className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all resize-none mb-10 font-crimson"
                rows={1}
            />
            <button 
                onClick={handlePostComment}
                className="bg-ronda-accent text-ronda-white px-10 py-5 text-button hover:opacity-90 transition-opacity flex items-center gap-4 uppercase"
              >
                PUBLICAR REFLEXIÓN <span className="rotate-[-45deg] inline-block">→</span>
              </button>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default EncounterDetail;
