
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { Encounter } from '../types';

const EditEncounter: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast, encounters, updateEncounter } = useApp();
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    promptQuestion: '',
    content: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enc = encounters.find(e => e.id === id);
    if (enc) {
      setFormData({
        title: enc.title,
        date: enc.date,
        time: enc.time || '',
        location: enc.location || '',
        promptQuestion: enc.promptQuestion,
        content: enc.content || ''
      });
      setLoading(false);
    } else {
      showToast('Encuentro no encontrado');
      navigate('/admin/encuentros');
    }
  }, [id, encounters, navigate, showToast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = 'La fecha es obligatoria';
    if (!formData.time) newErrors.time = 'La hora es obligatoria';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const original = encounters.find(e => e.id === id);
    if (original) {
      const updated: Encounter = {
        ...original,
        title: formData.title,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        promptQuestion: formData.promptQuestion,
        content: formData.content || null,
      };
      updateEncounter(updated);
      showToast('Cambios guardados con éxito');
      navigate(`/admin/encuentros/${id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-48">
          <div className="text-body italic opacity-40 animate-pulse">Cargando datos...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="text-subtitle-small opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 mb-16"
        >
          <span className="text-lg">←</span> CANCELAR Y VOLVER
        </button>

        <h1 className="text-h1 mb-16 italic font-light leading-none">
          Editar encuentro
        </h1>

        <form onSubmit={handleSubmit} className="border border-ronda-gray-light border-opacity-30 p-12 space-y-16">
          <div className="space-y-4">
            <label className="text-subtitle-small opacity-40 block uppercase font-inter">TÍTULO DEL ENCUENTRO</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. El Silencio y la Palabra"
              className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all font-crimson"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <label className="text-subtitle-small opacity-40 block uppercase font-inter">FECHA</label>
              <input 
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all font-crimson"
                required
              />
              {errors.date && <span className="text-subtitle-small text-ronda-accent lowercase">{errors.date}</span>}
            </div>
            <div className="space-y-4">
              <label className="text-subtitle-small opacity-40 block uppercase font-inter">HORA</label>
              <input 
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all font-crimson"
                required
              />
              {errors.time && <span className="text-subtitle-small text-ronda-accent lowercase">{errors.time}</span>}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-subtitle-small opacity-40 block uppercase font-inter">UBICACIÓN O ENLACE</label>
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Espacio físico o sala virtual"
              className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all font-crimson"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-subtitle-small opacity-40 block uppercase font-inter">PREGUNTA SEMILLA</label>
            <input 
              type="text"
              name="promptQuestion"
              value={formData.promptQuestion}
              onChange={handleChange}
              placeholder="¿Qué te trajo hoy hasta aquí?"
              className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all font-crimson"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-subtitle-small opacity-40 block uppercase font-inter">NARRATIVA Y BITÁCORA</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Describe el flujo del taller, las intenciones y el corazón del encuentro"
              className="w-full bg-transparent border-b border-ronda-gray-light border-opacity-40 py-4 text-body italic focus:outline-none focus:border-ronda-primary transition-all min-h-[200px] resize-none font-crimson leading-relaxed"
            />
          </div>

          <div className="pt-8 flex gap-4 font-inter">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-ronda-primary py-5 text-button hover:bg-ronda-primary hover:text-ronda-white transition-all uppercase"
            >
              DESCARTAR
            </button>
            <button 
              type="submit"
              className="flex-1 bg-ronda-accent text-ronda-white py-5 text-button hover:opacity-90 transition-opacity uppercase"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditEncounter;
