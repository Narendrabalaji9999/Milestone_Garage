import React, { useState } from 'react';
import { DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl, GARAGE_NAME } from '../types';
import {
  MessageCircle,
  X,
  PhoneCall,
  Wrench,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  onOpenBooking: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover drawer in Blue & White */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl p-5 text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-blue-950">Milestone Garage Support</h4>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold font-mono">
                  <span>Online</span>
                  <span>·</span>
                  <span>9581142497</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 my-3 leading-relaxed">
            Need car servicing in Hyderabad, mechanical diagnosis, or emergency breakdown assistance? Chat directly with our
            Madhura Nagar workshop team.
          </p>

          <div className="space-y-2">
            <a
              href={createWhatsAppUrl(
                'Hi Milestone Garage! I want to book a car service in Hyderabad. Please share packages and availability.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 transition-colors text-xs text-blue-950 font-semibold group"
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Book Service on WhatsApp</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-700" />
            </a>

            <a
              href={createWhatsAppUrl(
                'EMERGENCY SOS: My car broke down / engine won’t start in Hyderabad. I need immediate roadside assistance.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-blue-100/50 hover:bg-blue-100 border border-blue-300 transition-colors text-xs text-blue-950 font-bold group"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-blue-700" />
                <span>Emergency Breakdown SOS</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
            <a
              href={`tel:+91${WHATSAPP_PHONE_NUMBER}`}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>Call: {DISPLAY_PHONE}</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              Online Form
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button in Royal Blue and White */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-105 active:scale-95 font-bold text-xs border-2 border-white"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Us: {DISPLAY_PHONE}</span>
        <span className="sm:hidden">9581142497</span>
      </button>
    </div>
  );
};
