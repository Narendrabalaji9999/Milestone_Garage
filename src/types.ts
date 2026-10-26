export interface ServicePackage {
  id: string;
  name: string;
  tag: string;
  category: 'maintenance' | 'repairs' | 'inspection' | 'detailing' | 'emergency';
  description: string;
  estimatedDuration: string;
  startingPrice: number;
  savingsPercent: number;
  highlight: string;
  includedFeatures: string[];
  doorstepReady: boolean;
  recommendedKm: string;
  iconName?: string;
  isComingSoon?: boolean;
}

export interface CuratedServiceItem {
  id: string;
  name: string;
  category: string;
  image?: string;
  badge?: string; // 'SALE' | 'NEW' | 'POPULAR'
  priceStartingFrom: number;
  description: string;
  isComingSoon?: boolean;
}

export interface CarSparePart {
  id: string;
  partNumber: string;
  name: string;
  category: 'brakes' | 'engine' | 'electrical' | 'suspension' | 'fluids' | 'ac';
  brand: string;
  compatibility: string[];
  price: number;
  mrp: number;
  inStock: boolean;
  warrantyMonths: number;
  description: string;
  specs: { [key: string]: string };
  doorstepFitmentAvailable: boolean;
}

export interface HotspotInfo {
  id: string;
  title: string;
  partName: string;
  system: string;
  health: number;
  position: [number, number, number];
  description: string;
  doorstepService: string;
  servicePrice: number;
  partPrice: number;
  servicePackageId: string;
  symptoms: string[];
}

export interface PriceListItem {
  serviceType: string;
  priceStartsFrom: number;
  savings: string;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingFormData {
  customerName: string;
  customerPhone: string;
  carBrand: string;
  carModel: string;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid';
  carYear: string;
  servicePackageId: string;
  preferredDate: string;
  timeSlot: string;
  address: string;
  cityArea: string;
  notes: string;
  serviceLocationType: 'doorstep' | 'workshop_pickup';
}

export interface TestimonialItem {
  id: string;
  name: string;
  area: string;
  carModel: string;
  rating: number;
  date: string;
  serviceDone: string;
  quote: string;
  verified: boolean;
}

export type TrackingStage = 'Received' | 'In Diagnostics' | 'Repairs Ongoing' | 'Ready for Delivery';

export interface TrackingStep {
  stage: TrackingStage;
  time: string;
  details: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingRecord {
  bookingId: string;
  customerName: string;
  vehicle: string;
  serviceType: string;
  pickupArea: string;
  currentStage: TrackingStage;
  estimatedDelivery: string;
  assignedTechnician: string;
  notes: string;
  steps: TrackingStep[];
}

// Milestone Garage Contact Information
export const WHATSAPP_PHONE_NUMBER = '9581142497';
export const WHATSAPP_INTERNATIONAL = '+919581142497';
export const DISPLAY_PHONE = '+91 95811 42497';
export const SUPPORT_EMAIL = 'narendrabalaji1822@gmail.com';
export const GARAGE_NAME = 'MILESTONE GARAGE';
export const GARAGE_TAGLINE = 'Your Car. Our Care. Every Mile.';
export const GARAGE_PHILOSOPHY = 'Service • Repair • Maintain • Move';
export const GARAGE_ADDRESS =
  "C/3, Near Saradha Sarees, X' Roads, opposite the Community Hall, Vamika Arcade, Madhura Nagar, Hyderabad, Telangana 500038";

export function createWhatsAppUrl(message: string): string {
  const cleanNumber = '919581142497';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
