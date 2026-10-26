import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, MessageCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, WHATSAPP_PHONE_NUMBER } from '../types';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  bookingId?: string;
  vehicle?: string;
  service?: string;
  type?: 'success' | 'info';
  duration?: number;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) return;

    setProgress(100);
    const duration = toast.duration || 5000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-32px)] sm:w-96 bg-white border-2 border-blue-600 rounded-2xl shadow-2xl shadow-blue-900/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Toast Content */}
      <div className="p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-sm text-blue-950 tracking-tight">
              {toast.title}
            </h4>
            {toast.bookingId && (
              <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {toast.bookingId}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {toast.message}
          </p>

          {(toast.vehicle || toast.service) && (
            <div className="mt-2 pt-2 border-t border-blue-50 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-blue-900 font-medium">
              {toast.vehicle && <span>🚗 {toast.vehicle}</span>}
              {toast.service && <span>🔧 {toast.service}</span>}
            </div>
          )}

          {/* Quick WhatsApp & Track Actions inside Toast */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={createWhatsAppUrl(
                `Hello Milestone Garage! I just booked service (${toast.bookingId || 'New Booking'}). Please confirm my slot.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            {toast.bookingId && (
              <a
                href="#track-service"
                onClick={onClose}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-[11px] font-bold transition-colors"
              >
                <span>Track Status</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar Timer */}
      <div className="h-1 w-full bg-blue-50">
        <div
          className="h-full bg-blue-600 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
