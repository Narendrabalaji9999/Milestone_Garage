import React, { useState } from 'react';
import {
  GARAGE_NAME,
  GARAGE_TAGLINE,
  DISPLAY_PHONE,
  WHATSAPP_PHONE_NUMBER,
  createWhatsAppUrl,
  SUPPORT_EMAIL,
} from '../types';
import {
  Wrench,
  MapPin,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Mail,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad - Madhura Nagar');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const locations = [
    'Hyderabad - Madhura Nagar (Hub)',
    'Hyderabad - Ameerpet',
    'Hyderabad - Banjara Hills',
    'Hyderabad - Jubilee Hills',
    'Hyderabad - Gachibowli',
    'Hyderabad - Hitech City',
    'Hyderabad - Kukatpally',
    'Hyderabad - Secunderabad',
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
      {/* Top utility notification bar (Blue & White) */}
      <div className="bg-blue-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">MILESTONE GARAGE</span>
            <span className="text-blue-300">·</span>
            <span className="text-blue-100">{GARAGE_TAGLINE}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-blue-200">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-300" />
              <span>Madhura Nagar, Hyderabad 500038</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-300" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-blue-300" />
              <a
                href={createWhatsAppUrl('Hello Milestone Garage! I have a car servicing query.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-mono font-semibold hover:underline"
              >
                WhatsApp: {DISPLAY_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Logo & Location Selector */}
        <div className="flex items-center gap-4 shrink-0">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-blue-950 block leading-tight">
                MILESTONE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-blue-600 block">
                GARAGE HYDERABAD
              </span>
            </div>
          </a>

          {/* Location picker */}
          <div className="hidden lg:relative lg:block">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-blue-900 text-xs font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate max-w-[150px]">{selectedLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-blue-100 rounded-xl shadow-xl z-50 py-1">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-blue-50 transition-colors ${
                      selectedLocation === loc ? 'text-blue-700 font-bold bg-blue-50/60' : 'text-slate-700'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-700">
          <a href="#services" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            Our Services
          </a>
          <a href="#curated" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            Curated Services
          </a>
          <a href="#studio-3d" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            3D Studio
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            How It Works
          </a>
          <a href="#price-list" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            Price List 2026
          </a>
          <a href="#why-milestone" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            Why Milestone
          </a>
          <a href="#faqs" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            FAQs
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={createWhatsAppUrl(
              'Hi Milestone Garage! I would like to book a car service in Hyderabad. Please share details.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>WhatsApp (9581142497)</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.99] whitespace-nowrap"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book Service</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-700 hover:text-blue-600"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-blue-100 px-4 py-4 space-y-3">
          <div className="text-xs text-blue-900 font-semibold p-2 bg-blue-50 rounded-lg">
            📍 {selectedLocation}
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              Our Services
            </a>
            <a
              href="#curated"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              Curated Custom Services
            </a>
            <a
              href="#studio-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              3D Car Inspection
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              How Milestone Works
            </a>
            <a
              href="#price-list"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              Car Services Price List (2026)
            </a>
            <a
              href="#why-milestone"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              Why Choose Milestone
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              Common Questions (FAQs)
            </a>
          </nav>

          <div className="pt-3 border-t border-blue-100 flex flex-col gap-2">
            <a
              href={createWhatsAppUrl('Hi Milestone Garage! I want to book a car service in Hyderabad.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 9581142497</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold"
            >
              Book Service Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
