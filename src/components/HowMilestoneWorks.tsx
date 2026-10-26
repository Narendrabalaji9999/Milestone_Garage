import React from 'react';
import {
  Car,
  CalendarClock,
  Navigation,
  Gift,
  CheckCircle2,
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl } from '../types';

export const HowMilestoneWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Select The Perfect Car Service',
      desc: "From Milestone's broad portfolio of services in Hyderabad.",
      icon: Car,
    },
    {
      num: '2',
      title: 'Schedule Free Doorstep Pick-up',
      desc: 'We offer free pick up and drop or home service for all services booked.',
      icon: CalendarClock,
    },
    {
      num: '3',
      title: 'Track Your Car Service Real-Time',
      desc: 'We will take care of everything from here, with direct photographic updates on WhatsApp!',
      icon: Navigation,
    },
    {
      num: '4',
      title: 'Earn & Drive With Confidence',
      desc: 'Spread the word! Get ₹750 Milestone credit. Your friends get ₹750!',
      icon: Gift,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            How Milestone works?
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            A simple, transparent 4-step process designed for busy Hyderabad car owners
          </p>
        </div>

        {/* 4 Vertical Step Rows exactly as depicted in image_e37a5d31.png */}
        <div className="space-y-6 max-w-4xl">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="flex items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:bg-blue-50/60 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-5">
                  {/* Step Number Box */}
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20 shrink-0">
                    {item.num}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-blue-950">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Right Step Graphic */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
