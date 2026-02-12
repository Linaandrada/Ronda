
import React from 'react';

interface AttendeeListModalProps {
  attendees: string[];
  onClose: () => void;
}

const AttendeeListModal: React.FC<AttendeeListModalProps> = ({ attendees, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-ronda-primary bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-ronda-bg w-full max-w-[500px] border border-ronda-primary p-12 shadow-2xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-title-1 italic">Confirmados</h2>
          <button onClick={onClose} className="hover:opacity-50 transition-opacity p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-4 space-y-6">
          {attendees.length === 0 ? (
            <p className="text-body italic opacity-40">Aún no hay confirmaciones.</p>
          ) : (
            attendees.map((name, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-4 border-b border-ronda-gray-light border-opacity-20 last:border-0">
                <div className="w-8 h-8 rounded-full bg-ronda-gray-light flex items-center justify-center text-[10px] uppercase font-inter font-medium overflow-hidden">
                   <img src={`https://picsum.photos/seed/${name}/50/50`} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-nav opacity-80">{name}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={onClose}
            className="text-button border-b border-ronda-primary hover:opacity-60 transition-opacity"
          >
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeListModal;
