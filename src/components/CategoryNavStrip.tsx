import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavStripProps {
  activeSection?: string;
}

export const CategoryNavStrip: React.FC<CategoryNavStripProps> = () => {
  const [activeTab, setActiveTab] = useState('services');

  const navItems = [
    { id: 'services', label: 'Our Services', href: '#services' },
    { id: 'curated', label: 'Curated Custom Service', href: '#curated' },
    { id: 'studio-3d', label: '3D Car Studio', href: '#studio-3d' },
    { id: 'track-service', label: 'Track Your Service', href: '#track-service' },
    { id: 'how-it-works', label: 'How Milestone Works?', href: '#how-it-works' },
    { id: 'trust-certifications', label: 'Trust & Certifications', href: '#trust-certifications' },
    { id: 'price-list', label: 'Price List 2026', href: '#price-list' },
    { id: 'reviews', label: 'Customer Stories', href: '#reviews' },
    { id: 'why-milestone', label: 'Why Milestone', href: '#why-milestone' },
    { id: 'faqs', label: 'Frequently Asked Questions', href: '#faqs' },
  ];

  return (
    <div className="bg-white border-b border-blue-100 shadow-sm sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-3 scrollbar-none scrollbar-thin">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg transition-all relative ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/70 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
