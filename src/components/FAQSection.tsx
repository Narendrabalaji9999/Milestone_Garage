import React, { useState } from 'react';
import { HYDERABAD_FAQS } from '../data/carData';
import { ChevronDown, ChevronUp, MessageCircle, PhoneCall } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl } from '../types';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 bg-blue-50/40 border-b border-blue-100 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching image_3620863d.png */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-blue-600 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
            Common Car Service Questions In Hyderabad
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Everything you need to know about car servicing, pickup, pricing, and warranties at Milestone Garage
          </p>
        </div>

        {/* Accordions matching image_3620863d.png */}
        <div className="space-y-3">
          {HYDERABAD_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-blue-200 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-blue-50/40 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-blue-950 leading-snug">
                    {faq.question}
                  </span>
                  <div className="shrink-0 text-blue-600">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100 bg-white">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact help card */}
        <div className="mt-10 p-6 rounded-2xl bg-white border-2 border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="font-extrabold text-base text-blue-950">Have a specific question about your car?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Contact our service advisor at Madhura Nagar on WhatsApp or Phone
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:+91${WHATSAPP_PHONE_NUMBER}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>{DISPLAY_PHONE}</span>
            </a>
            <a
              href={createWhatsAppUrl('Hi Milestone Garage! I have a question about my car service.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
