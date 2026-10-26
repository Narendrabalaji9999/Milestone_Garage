import React from 'react';
import {
  GARAGE_NAME,
  GARAGE_TAGLINE,
  GARAGE_ADDRESS,
  DISPLAY_PHONE,
  WHATSAPP_PHONE_NUMBER,
  SUPPORT_EMAIL,
  createWhatsAppUrl,
} from '../types';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Wrench,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-slate-300 text-xs">
      {/* Top Multi-column Section matching image_3c1c8414.png */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: About Us */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs tracking-wider uppercase border-b border-blue-900 pb-2">
              ABOUT US
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#why-milestone" className="hover:text-white transition-colors">About Milestone</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Grievance Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Milestone Partners</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Workshop Locator</a></li>
              <li><a href="#price-list" className="hover:text-white transition-colors">Offers &amp; Packages</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs tracking-wider uppercase border-b border-blue-900 pb-2">
              OUR SERVICES
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#services" className="hover:text-white transition-colors">Scheduled Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AC Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cleaning &amp; Detailing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Lights &amp; Fitments</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Denting Painting</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Insurance Claims</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Mechanical Repair</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Batteries (Exide/Amaron)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Tyres &amp; Wheel Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Windshields &amp; Glass</a></li>
            </ul>
          </div>

          {/* Column 3: Luxury Brands */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs tracking-wider uppercase border-b border-blue-900 pb-2">
              LUXURY BRANDS
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="hover:text-white">Mercedes-Benz</span></li>
              <li><span className="hover:text-white">BMW</span></li>
              <li><span className="hover:text-white">Audi</span></li>
              <li><span className="hover:text-white">Volvo</span></li>
              <li><span className="hover:text-white">Jaguar</span></li>
              <li><span className="hover:text-white">Porsche</span></li>
              <li><span className="hover:text-white">Rolls Royce</span></li>
              <li><span className="hover:text-white">Ferrari</span></li>
              <li><span className="hover:text-white">Land Rover</span></li>
              <li><span className="hover:text-white">Lexus</span></li>
            </ul>
          </div>

          {/* Column 4: Popular Brands */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs tracking-wider uppercase border-b border-blue-900 pb-2">
              POPULAR BRANDS
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="hover:text-white">Maruti Suzuki</span></li>
              <li><span className="hover:text-white">Hyundai</span></li>
              <li><span className="hover:text-white">Tata Motors</span></li>
              <li><span className="hover:text-white">Mahindra</span></li>
              <li><span className="hover:text-white">Toyota</span></li>
              <li><span className="hover:text-white">Honda</span></li>
              <li><span className="hover:text-white">Kia</span></li>
              <li><span className="hover:text-white">Volkswagen</span></li>
              <li><span className="hover:text-white">Skoda</span></li>
              <li><span className="hover:text-white">Renault</span></li>
            </ul>
          </div>

          {/* Column 5: Popular Areas Near You (Hyderabad) */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs tracking-wider uppercase border-b border-blue-900 pb-2">
              POPULAR AREAS NEAR YOU
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="hover:text-white">Garage near me in Madhura Nagar</span></li>
              <li><span className="hover:text-white">Garage near me in Ameerpet</span></li>
              <li><span className="hover:text-white">Garage near me in Banjara Hills</span></li>
              <li><span className="hover:text-white">Garage near me in Jubilee Hills</span></li>
              <li><span className="hover:text-white">Garage near me in Gachibowli</span></li>
              <li><span className="hover:text-white">Garage near me in Hitech City</span></li>
              <li><span className="hover:text-white">Garage near me in Kukatpally</span></li>
              <li><span className="hover:text-white">Garage near me in Miyapur</span></li>
              <li><span className="hover:text-white">Garage near me in Begumpet</span></li>
              <li><span className="hover:text-white">Garage near me in Secunderabad</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Contact Details Bar matching image_3c1c8414.png */}
      <div className="border-t border-blue-900 bg-blue-950/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Brand & Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <span className="font-extrabold text-base text-white">{GARAGE_NAME}</span>
            </div>
            <p className="text-[11px] text-blue-200">{GARAGE_TAGLINE}</p>
            <div className="flex items-start gap-2 pt-1 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{GARAGE_ADDRESS}</span>
            </div>
          </div>

          {/* Bookings & Phone Support */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">Order Bookings and Queries:</span>
              <a href={`tel:+91${WHATSAPP_PHONE_NUMBER}`} className="font-mono font-bold text-white hover:text-blue-300">
                {DISPLAY_PHONE}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">WhatsApp Dispatch:</span>
              <a
                href={createWhatsAppUrl('Hello Milestone Garage! I need car servicing assistance.')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-white hover:text-blue-300"
              >
                +91 9581142497
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">Customer Support:</span>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-white hover:text-blue-300">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Timings & Emergency */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">Working Days:</span>
              <span className="font-semibold text-white">Monday – Sunday (7 Days Open)</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">Working Hours:</span>
              <span className="font-semibold text-white">8:00 AM – 8:30 PM (IST)</span>
            </div>

            <div className="flex items-center gap-2 text-blue-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>24/7 Roadside Emergency Breakdown Rescue</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-blue-900/60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 Milestone Garage. All rights reserved. Service • Repair • Maintain • Move.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Madhura Nagar, Hyderabad</span>
            <span>·</span>
            <span>WhatsApp: +91 9581142497</span>
            <span>·</span>
            <span>{SUPPORT_EMAIL}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
