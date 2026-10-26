import React from 'react';
import { MAIN_SERVICE_CATEGORIES } from '../data/carData';
import { DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl } from '../types';
import {
  Wrench,
  ThermometerSnowflake,
  BatteryCharging,
  Disc,
  Paintbrush,
  Sparkles,
  Droplets,
  ClipboardCheck,
  Sun,
  GitCommit,
  Layers,
  ShieldAlert,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

interface MainServicesGridProps {
  onSelectService: (serviceId: string) => void;
}

export const MainServicesGrid: React.FC<MainServicesGridProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-8 h-8 text-blue-600" />;
      case 'ThermometerSnowflake':
        return <ThermometerSnowflake className="w-8 h-8 text-blue-600" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-8 h-8 text-blue-600" />;
      case 'Disc':
        return <Disc className="w-8 h-8 text-blue-600" />;
      case 'Paintbrush':
        return <Paintbrush className="w-8 h-8 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-blue-600" />;
      case 'Droplets':
        return <Droplets className="w-8 h-8 text-blue-600" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-8 h-8 text-blue-600" />;
      case 'Sun':
        return <Sun className="w-8 h-8 text-blue-600" />;
      case 'GitCommit':
        return <GitCommit className="w-8 h-8 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-8 h-8 text-blue-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-8 h-8 text-blue-600" />;
      default:
        return <Wrench className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header from image_fe6f1178.png */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            <span>Milestone Workshop &amp; Doorstep</span>
            <span className="text-blue-300">·</span>
            <span>Hyderabad Central</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Car Services Available In Hyderabad
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Looking for a Trusted Car Service in Hyderabad? With Milestone Garage, you get access to 150+ car repair and
            maintenance options. From regular servicing, AC repairs to emergency breakdown help, we cover it all at 40%
            lower rates than authorised service centres, along with the comfort of free doorstep pickup and drop.
          </p>
        </div>

        {/* 12 Category Grid matching image_fe6f1178.png */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MAIN_SERVICE_CATEGORIES.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectService(item.id)}
              className="group relative bg-white border border-blue-100 hover:border-blue-500 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              {/* Badge */}
              {item.badge && (
                <span
                  className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.isComingSoon
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-600/10 transition-colors">
                {getIcon(item.icon)}
              </div>

              {/* Title */}
              <h3 className="font-bold text-xs sm:text-sm text-blue-950 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {item.subtitle}
              </span>

              {/* Starting Price */}
              <div className="mt-3 pt-2 border-t border-blue-50 w-full flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-medium">Starts</span>
                <span className="font-bold text-blue-700 font-mono">₹{item.priceStartingFrom}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Consultation CTA */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-blue-950">
              Not sure which service your car needs?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Talk directly to our master mechanic in Madhura Nagar for an honest diagnosis.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={createWhatsAppUrl(
                'Hi Milestone Garage! I am looking for car service advice for my car in Hyderabad. Can you help?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp (9581142497)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
