import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

let toastId = 0;
const toastEvents = new EventTarget();

export const showToast = (message, type = 'info', duration = 3000) => {
  const id = ++toastId;
  toastEvents.dispatchEvent(new CustomEvent('show', { 
    detail: { id, message, type, duration } 
  }));
  return id;
};

export const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShow = (event) => {
      const toast = event.detail;
      setToasts(prev => [...prev, toast]);
      
      if (toast.duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== toast.id));
        }, toast.duration);
      }
    };

    toastEvents.addEventListener('show', handleShow);
    return () => toastEvents.removeEventListener('show', handleShow);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={24} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={24} />;
      default:
        return <Info className="text-blue-500" size={24} />;
    }
  };

  const getBackground = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 p-4 rounded-lg border shadow-lg
            min-w-[300px] max-w-md
            animate-slide-up
            ${getBackground(toast.type)}
          `}
        >
          {getIcon(toast.type)}
          <p className="flex-1 text-sm font-medium text-gray-800">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
