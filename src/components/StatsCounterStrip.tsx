import React from 'react';
import { Star } from 'lucide-react';

export const StatsCounterStrip: React.FC = () => {
  return (
    <section className="py-12 bg-blue-50/50 border-b border-blue-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strip matching image_1526f609.png */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-blue-200">
          <div className="pt-3 sm:pt-0">
            <span className="text-3xl sm:text-4xl font-black text-blue-950 font-mono tracking-tight block">
              2 Million+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              Happy Customers
            </span>
          </div>

          <div className="pt-3 sm:pt-0">
            <span className="text-3xl sm:text-4xl font-black text-blue-950 font-mono tracking-tight block">
              25 Lacs+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              Cars Serviced
            </span>
          </div>

          <div className="pt-3 sm:pt-0">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl sm:text-4xl font-black text-blue-950 font-mono tracking-tight">
                4.8
              </span>
              <Star className="w-6 h-6 fill-blue-600 text-blue-600 inline-block" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              Average Rating
            </span>
          </div>

          <div className="pt-3 sm:pt-0">
            <span className="text-3xl sm:text-4xl font-black text-blue-950 font-mono tracking-tight block">
              1000+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
              Touch Points In India &amp; Hyderabad
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
