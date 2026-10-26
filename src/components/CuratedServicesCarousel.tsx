import React from 'react';
import { CURATED_CUSTOM_SERVICES } from '../data/carData';
import { CuratedServiceItem, createWhatsAppUrl } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  BatteryCharging,
  Disc,
  Thermometer,
  Layers,
  CircleDot,
  GitCommit,
  Sun,
  Shield,
  Eye,
  MessageCircle
} from 'lucide-react';

interface CuratedServicesCarouselProps {
  onSelectCurated: (item: CuratedServiceItem) => void;
}

export const CuratedServicesCarousel: React.FC<CuratedServicesCarouselProps> = ({ onSelectCurated }) => {
  const getCuratedIcon = (id: string) => {
    switch (id) {
      case 'curated-batteries':
        return <BatteryCharging className="w-10 h-10 text-blue-600" />;
      case 'curated-brakes':
        return <Disc className="w-10 h-10 text-blue-600" />;
      case 'curated-ac-parts':
        return <Thermometer className="w-10 h-10 text-blue-600" />;
      case 'curated-clutch':
        return <Layers className="w-10 h-10 text-blue-600" />;
      case 'curated-tyres':
        return <CircleDot className="w-10 h-10 text-blue-600" />;
      case 'curated-suspension':
        return <GitCommit className="w-10 h-10 text-blue-600" />;
      case 'curated-lights':
        return <Sun className="w-10 h-10 text-blue-600" />;
      case 'curated-body-parts':
        return <Shield className="w-10 h-10 text-blue-600" />;
      case 'curated-glasses':
        return <Eye className="w-10 h-10 text-blue-600" />;
      default:
        return <Disc className="w-10 h-10 text-blue-600" />;
    }
  };

  return (
    <section id="curated" className="py-16 bg-blue-50/40 text-slate-900 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching image_c9e73d0d.png */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
              Curated Custom Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Popular targeted component replacements and standalone repair services
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-xs">
              Genuine OEM Parts
            </span>
          </div>
        </div>

        {/* Circular Cards Horizontal Row matching image_c9e73d0d.png & image_75ecab0a.png */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {CURATED_CUSTOM_SERVICES.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCurated(item)}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circular Disc with Badge */}
              <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-blue-200 group-hover:border-blue-600 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/15 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                {getCuratedIcon(item.id)}

                {item.badge && (
                  <span
                    className={`absolute -bottom-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      item.badge === 'SALE'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Starting Price */}
              <h4 className="font-extrabold text-xs sm:text-sm text-blue-950 mt-3 text-center group-hover:text-blue-600 transition-colors">
                {item.name}
              </h4>

              <span className="text-[11px] font-mono text-blue-700 font-bold mt-0.5">
                From ₹{item.priceStartingFrom}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
