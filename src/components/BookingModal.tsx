import React, { useState } from 'react';
import {
  BookingFormData,
  GARAGE_NAME,
  GARAGE_ADDRESS,
  DISPLAY_PHONE,
  WHATSAPP_PHONE_NUMBER,
  createWhatsAppUrl,
} from '../types';
import { POPULAR_CAR_BRANDS, BRAND_MODELS, MAIN_SERVICE_CATEGORIES, HYDERABAD_AREAS } from '../data/carData';
import {
  X,
  Calendar,
  Clock,
  Home,
  MapPin,
  Car,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Wrench,
  ShieldCheck,
  Truck
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedBrand?: string;
  preselectedModel?: string;
  preselectedPhone?: string;
  preselectedArea?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBrand,
  preselectedModel,
  preselectedPhone,
  preselectedArea,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: preselectedPhone || '',
    carBrand: preselectedBrand || 'Hyundai',
    carModel: preselectedModel || 'Creta',
    fuelType: 'Petrol',
    carYear: '2022',
    servicePackageId: preselectedServiceId || 'car-services',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    address: '',
    cityArea: preselectedArea || 'Hyderabad - Madhura Nagar',
    notes: '',
    serviceLocationType: 'doorstep',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const currentModels = BRAND_MODELS[formData.carBrand] || ['Standard Model'];
  const selectedService =
    MAIN_SERVICE_CATEGORIES.find((s) => s.id === formData.servicePackageId) || MAIN_SERVICE_CATEGORIES[0];

  const handleBrandChange = (brand: string) => {
    const models = BRAND_MODELS[brand] || [];
    setFormData({
      ...formData,
      carBrand: brand,
      carModel: models[0] || 'Standard',
    });
  };

  const getFormattedWhatsAppMessage = (bId: string) => {
    return `*🚗 MILESTONE GARAGE - CAR SERVICE BOOKING*
*Booking ID:* ${bId}
*Customer Name:* ${formData.customerName || 'Car Owner'}
*Phone Number:* ${formData.customerPhone || 'Via WhatsApp'}
*Preferred Type:* ${formData.serviceLocationType === 'doorstep' ? 'Free Doorstep Pick-up & Drop' : 'Direct Workshop Visit at Madhura Nagar'}
*Hyderabad Area / Address:* ${formData.cityArea} - ${formData.address || 'Central'}

*Vehicle Details:*
• Brand & Model: ${formData.carBrand} ${formData.carModel} (${formData.fuelType}, ${formData.carYear})
• Requested Service: ${selectedService.title} (Starts from ₹${selectedService.priceStartingFrom})
• Preferred Slot: ${formData.preferredDate} (${formData.timeSlot})
• Symptoms / Specific Issues: ${formData.notes || 'Routine maintenance'}

Please confirm my booking slot. Milestone Garage Madhura Nagar.`;
  };

  const handleSubmit = (viaWhatsApp: boolean) => {
    const generatedId = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setIsSubmitted(true);

    if (viaWhatsApp) {
      const url = createWhatsAppUrl(getFormattedWhatsAppMessage(generatedId));
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-blue-200 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900">
        {/* Blue Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Book Milestone Car Service</h3>
              <p className="text-xs text-blue-200">Free Doorstep Pick-up &amp; Drop in Hyderabad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <div className="space-y-5">
              {/* Service selected summary card */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-700 font-bold uppercase block tracking-wider">
                    Selected Service Category
                  </span>
                  <span className="text-sm font-extrabold text-blue-950">{selectedService.title}</span>
                  <span className="text-xs text-slate-500 block">{selectedService.subtitle}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-blue-700 font-mono">
                    Starts ₹{selectedService.priceStartingFrom}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold block">Free Pick-up</span>
                </div>
              </div>

              {/* Service type radio: Doorstep Pick-up vs Workshop Visit */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Service Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceLocationType: 'doorstep' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                      formData.serviceLocationType === 'doorstep'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-xs block">Free Doorstep Pick &amp; Drop</span>
                      <span className="text-[10px] text-slate-500 font-normal">We pick up from your home</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceLocationType: 'workshop_pickup' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                      formData.serviceLocationType === 'workshop_pickup'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-xs block">Visit Madhura Nagar Workshop</span>
                      <span className="text-[10px] text-slate-500 font-normal">Direct garage walk-in</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Vehicle info */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  1. Vehicle Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Make / Brand</label>
                    <select
                      value={formData.carBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      {POPULAR_CAR_BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Car Model</label>
                    <select
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      {currentModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.carYear}
                      onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
                      placeholder="e.g. 2021"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Slot & Hyderabad Location */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  2. Timing &amp; Hyderabad Area
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Service Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Morning (08:30 AM - 11:30 AM)">Morning (08:30 AM - 11:30 AM)</option>
                      <option value="Midday (11:30 AM - 02:30 PM)">Midday (11:30 AM - 02:30 PM)</option>
                      <option value="Afternoon (03:00 PM - 06:00 PM)">Afternoon (03:00 PM - 06:00 PM)</option>
                      <option value="Evening (06:00 PM - 08:30 PM)">Evening (06:00 PM - 08:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Narendra Balaji"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9581142497"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">
                    Pickup Address / Colony in Hyderabad
                  </label>
                  <input
                    type="text"
                    placeholder="House/Plot no, Apartment, Street or Landmark in Hyderabad..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">
                    Symptoms or Specific Repairs Needed (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AC not chilling, screeching brakes, engine warning light..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  No advance payment. Test drive after service, pay only upon complete satisfaction.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book via WhatsApp (9581142497)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Confirm Service Booking</span>
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation Receipt */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-blue-100 border-2 border-blue-600 rounded-2xl mx-auto flex items-center justify-center text-blue-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block font-bold">
                  Slot Reserved with Milestone Garage
                </span>
                <h3 className="text-2xl font-black text-blue-950 mt-1">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Reference Token: <span className="text-blue-700 font-mono font-bold">{bookingId}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Workshop:</span>
                  <span className="text-blue-950 font-bold">Milestone Garage Madhura Nagar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service:</span>
                  <span className="text-blue-950 font-bold">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Car:</span>
                  <span className="text-blue-950 font-bold">
                    {formData.carBrand} {formData.carModel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date &amp; Slot:</span>
                  <span className="text-blue-950 font-bold">
                    {formData.preferredDate} ({formData.timeSlot})
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our service advisor will connect with you on WhatsApp/Call 30 minutes prior to pickup or your visit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={createWhatsAppUrl(getFormattedWhatsAppMessage(bookingId))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
