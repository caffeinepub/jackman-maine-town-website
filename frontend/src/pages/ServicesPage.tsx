import { Phone, Clock, AlertTriangle, Wrench, BookOpen, Trash2, Car, Building2, ShieldAlert, Flame, Siren } from 'lucide-react';

const emergencyServices = [
  {
    name: 'Sheriff',
    icon: ShieldAlert,
    description: 'Somerset County Sheriff\'s Office',
    phone: '911',
  },
  {
    name: 'Fire Department',
    icon: Flame,
    description: 'Jackman Volunteer Fire Department',
    phone: '911',
  },
  {
    name: 'Ambulance',
    icon: Siren,
    description: 'Jackman Ambulance Service',
    phone: '911',
  },
];

const services = [
  {
    category: 'Town Office',
    icon: Building2,
    items: [
      { label: 'Address', value: '123 Main Street, Jackman, ME 04945' },
      { label: 'Phone', value: '(123) 456-7890' },
      { label: 'Hours', value: 'Mon–Fri: 8:00 AM – 4:00 PM' },
      { label: 'Services', value: 'Permits, licenses, tax payments, voter registration, and general inquiries.' },
    ],
  },
  {
    category: 'Public Works',
    icon: Wrench,
    items: [
      { label: 'Phone', value: '(123) 456-7894' },
      { label: 'Services', value: 'Road maintenance, snow plowing, storm drains, and infrastructure repairs.' },
      { label: 'Hours', value: 'Mon–Fri: 7:00 AM – 3:30 PM' },
      { label: 'Report Issues', value: 'Call the Town Office or submit a request in person.' },
    ],
  },
  {
    category: 'Solid Waste & Recycling',
    icon: Trash2,
    items: [
      { label: 'Transfer Station', value: '456 Dump Road, Jackman, ME 04945' },
      { label: 'Hours', value: 'Tue, Thu, Sat: 8:00 AM – 4:00 PM' },
      { label: 'Accepted', value: 'Household waste, recyclables, electronics, and hazardous materials (by appointment).' },
      { label: 'Phone', value: '(123) 456-7895' },
    ],
  },
  {
    category: 'Library',
    icon: BookOpen,
    items: [
      { label: 'Name', value: 'Jackman Public Library' },
      { label: 'Address', value: '789 Library Lane, Jackman, ME 04945' },
      { label: 'Hours', value: 'Mon, Wed, Fri: 10:00 AM – 5:00 PM; Sat: 10:00 AM – 2:00 PM' },
      { label: 'Phone', value: '(123) 456-7896' },
    ],
  },
  {
    category: 'Motor Vehicle Registration',
    icon: Car,
    items: [
      { label: 'Location', value: 'Town Office, 123 Main Street' },
      { label: 'Hours', value: 'Mon–Fri: 8:00 AM – 3:30 PM' },
      { label: 'Services', value: 'Vehicle registration, title transfers, and driver\'s license renewals.' },
      { label: 'Note', value: 'Bring current insurance, prior registration, and payment.' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Town Services</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Municipal services and resources for residents of Jackman, Maine
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <div className="bg-red-700 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm font-sans">
          <AlertTriangle size={16} className="shrink-0" />
          <span>For life-threatening emergencies, always call <strong>911</strong></span>
        </div>
      </div>

      {/* Emergency Services Section */}
      <section className="py-10 bg-red-50 border-b border-red-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-700 rounded-lg p-2">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-red-800">Emergency Services</h2>
              <p className="text-sm text-red-700 font-sans">Dial 911 for all emergencies — available 24 hours a day, 7 days a week</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {emergencyServices.map(({ name, icon: Icon, description, phone }) => (
              <div
                key={name}
                className="bg-white border-2 border-red-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:border-red-400 transition-colors"
              >
                <div className="bg-red-100 rounded-full p-3 mb-3">
                  <Icon size={24} className="text-red-700" />
                </div>
                <h3 className="font-serif font-bold text-red-800 text-lg mb-1">{name}</h3>
                <p className="text-xs text-muted-foreground font-sans mb-4">{description}</p>
                <a
                  href="tel:911"
                  className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-sans font-semibold text-base px-6 py-2.5 rounded-full transition-colors shadow-sm"
                  aria-label={`Call 911 for ${name}`}
                >
                  <Phone size={16} />
                  Call 911
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-forest-700 mb-6">Municipal Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ category, icon: Icon, items }) => (
              <div key={category} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="bg-forest-600 px-5 py-4 flex items-center gap-3">
                  <div className="bg-white/15 rounded-lg p-2">
                    <Icon size={18} className="text-amber-300" />
                  </div>
                  <h2 className="font-serif font-semibold text-white text-base">{category}</h2>
                </div>
                <div className="p-5 space-y-3">
                  {items.map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-0.5">
                        {label}
                      </div>
                      <div className="text-sm text-foreground font-sans">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hours Note */}
          <div className="mt-10 bg-forest-50 border border-forest-200 rounded-xl p-6 flex items-start gap-4">
            <Clock size={20} className="text-forest-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif font-semibold text-forest-700 mb-1">Office Hours Notice</h3>
              <p className="text-sm text-muted-foreground font-sans">
                Town office hours may vary on holidays. Please call ahead to confirm availability.
                For after-hours emergencies, contact the Somerset County Sheriff's Office.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
