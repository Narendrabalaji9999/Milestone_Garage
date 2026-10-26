import React from 'react';
import { OEM_BRANDS } from '../data/carData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const OEMBrandsStrip: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-blue-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching image_ddc23a8e.png */}
        <div className="mb-8">
          <div className="w-16 h-1 bg-blue-600 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
            Original Spare Parts
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Extended Warranty with Milestone Garage
          </p>
        </div>

        {/* Brand logos/cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {OEM_BRANDS.map((b) => (
            <div
              key={b.name}
              className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center"
            >
              <span className="font-black text-lg sm:text-xl text-blue-950 font-mono tracking-tight block">
                {b.name}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold mt-1 line-clamp-1">
                Certified OEM
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>100% Genuine Sealed Packaging</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Up to 24 Months Manufacturer Warranty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Free Doorstep Fitment in Hyderabad</span>
          </div>
        </div>
      </div>
    </section>
  );
};
