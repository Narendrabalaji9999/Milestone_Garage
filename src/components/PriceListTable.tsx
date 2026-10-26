import React, { useState } from 'react';
import { HYDERABAD_PRICE_LIST } from '../data/carData';
import { PriceListItem, createWhatsAppUrl } from '../types';
import { MessageCircle, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

interface PriceListTableProps {
  onBookService: (serviceName: string) => void;
}

export const PriceListTable: React.FC<PriceListTableProps> = ({ onBookService }) => {
  const [showAll, setShowAll] = useState(true);

  const displayedList = showAll ? HYDERABAD_PRICE_LIST : HYDERABAD_PRICE_LIST.slice(0, 6);

  return (
    <section id="price-list" className="py-16 bg-blue-50/30 border-b border-blue-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching image_2d86a9a5.png */}
        <div className="mb-8">
          <div className="w-16 h-1 bg-blue-600 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
            Car Services price List in Hyderabad, India 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent, upfront pricing with no hidden charges. All services include free doorstep pick-up &amp; drop.
          </p>
        </div>

        {/* Clean Table matching image_2d86a9a5.png */}
        <div className="bg-white border-2 border-blue-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-blue-50/80 border-b border-blue-100 text-blue-950 font-bold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Services Type</th>
                  <th className="py-3.5 px-4 sm:px-6">Price Starts From (₹)</th>
                  <th className="py-3.5 px-4 sm:px-6">Savings</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {displayedList.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => onBookService(row.serviceType)}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-800 group-hover:text-blue-700">
                      {row.serviceType}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-blue-950">
                      ₹{row.priceStartsFrom}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                        {row.savings}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <a
                        href={createWhatsAppUrl(
                          `Hello Milestone Garage! I would like to book: ${row.serviceType} starting from ₹${row.priceStartsFrom}. Please confirm availability in Hyderabad.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer matching image_2d86a9a5.png */}
          <div className="py-3 px-6 bg-slate-50 border-t border-blue-100 flex items-center justify-between text-xs text-slate-500">
            <span>This data was last updated on 10/26/2026</span>
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider flex items-center gap-1"
            >
              <span>{showAll ? 'SEE LESS' : 'SEE MORE'}</span>
              {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
