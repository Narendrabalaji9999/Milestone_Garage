import React, { useState } from 'react';
import {
  GARAGE_NAME,
  GARAGE_TAGLINE,
  GARAGE_PHILOSOPHY,
  GARAGE_ADDRESS,
  DISPLAY_PHONE,
  WHATSAPP_PHONE_NUMBER,
  createWhatsAppUrl,
} from '../types';
import { POPULAR_CAR_BRANDS, BRAND_MODELS, HYDERABAD_AREAS } from '../data/carData';
import {
  Star,
  ShieldCheck,
  MapPin,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Wrench,
  Car,
  Clock,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onCheckPrices: (brand: string, model: string, phone: string, area: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckPrices }) => {
  const [selectedArea, setSelectedArea] = useState('Hyderabad - Madhura Nagar');
  const [selectedBrand, setSelectedBrand] = useState('Hyundai');
  const [selectedModel, setSelectedModel] = useState('Creta');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const currentModels = BRAND_MODELS[selectedBrand] || ['Standard Model'];

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const models = BRAND_MODELS[brand] || [];
    if (models.length > 0) {
      setSelectedModel(models[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    onCheckPrices(selectedBrand, selectedModel, mobileNumber, selectedArea);
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white text-slate-900 pt-8 pb-12 overflow-hidden border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency & Location Announcement Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-2xl">
          <div className="flex items-center gap-2.5 text-xs text-blue-950 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-blue-700 font-bold">Madhura Nagar Workshop Open</span>
            <span className="text-blue-300">·</span>
            <span>Free Doorstep Pick-up &amp; Drop Across Hyderabad</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href={`tel:+91${WHATSAPP_PHONE_NUMBER}`}
              className="flex items-center gap-1 font-bold text-blue-800 hover:text-blue-600 font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>{DISPLAY_PHONE}</span>
            </a>
            <span className="text-blue-200">·</span>
            <a
              href={createWhatsAppUrl('Hello Milestone Garage! I want to check car service prices in Hyderabad.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Hero 2-Column Split: Left Pitch & Value / Right Instant Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <span>{GARAGE_NAME}</span>
              <span className="text-blue-400">·</span>
              <span>HYDERABAD</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-950 tracking-tight leading-[1.15]">
              Your Car. Our Care.{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
                Every Mile.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong className="text-blue-950 font-bold">Milestone Garage</strong> is a premier multi-brand automotive
              service and repair company in Madhura Nagar, Hyderabad. From routine maintenance to complex mechanical
              repairs, our goal is simple —{' '}
              <span className="text-blue-900 font-semibold">
                identify the problem, provide the right solution, and get you back on the road with confidence.
              </span>
            </p>

            {/* Philosophy Pill */}
            <div className="p-3 bg-white border border-blue-200 rounded-xl shadow-xs inline-flex items-center gap-3">
              <span className="text-xs font-bold text-blue-900 tracking-wider uppercase font-mono">
                {GARAGE_PHILOSOPHY}
              </span>
            </div>

            {/* Address Banner */}
            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-blue-950 block">Milestone Garage Hyderabad Facility:</span>
                <span className="text-slate-700 leading-relaxed block mt-0.5">{GARAGE_ADDRESS}</span>
              </div>
            </div>

            {/* Fast Benefit Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>6 Months Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Genuine OEM/OES Parts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                <span>50+ Checkpoint Scan</span>
              </div>
            </div>
          </div>

          {/* Right Floating Card: Exact Match to image_050c6a11.png (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-blue-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5 relative">
              {/* Badge */}
              <div className="text-center space-y-1">
                <h3 className="text-2xl sm:text-[26px] font-black text-blue-950 tracking-tight">
                  Experience The Best Car Services In Hyderabad
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Get instant quotes for your car service
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* 1. Location Dropdown */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Select City / Area
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-950 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    {HYDERABAD_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Select Your Car (Make & Model) */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Car Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-950 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      {POPULAR_CAR_BRANDS.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-950 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      {currentModels.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Enter Mobile Number */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Enter Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-blue-200 bg-white text-blue-950 placeholder-slate-400 text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  {errorMsg && <p className="text-xs text-blue-800 font-semibold mt-1">{errorMsg}</p>}
                </div>

                {/* Primary CTA (In Royal Blue) */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  CHECK PRICES FOR FREE
                </button>
              </form>

              {/* Exact Trust metrics footer from image_050c6a11.png */}
              <div className="pt-4 border-t border-blue-100 grid grid-cols-2 divide-x divide-blue-100 text-center">
                <div className="px-2">
                  <div className="flex items-center justify-center gap-1 text-blue-900 font-extrabold text-base">
                    <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                    <span>4.8 / 5</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Based on 15,000+ Reviews
                  </span>
                </div>

                <div className="px-2">
                  <span className="text-base font-extrabold text-blue-950 font-mono block">25,000+</span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Happy Hyderabad Customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
