import { ShoppingBag, Hotel, MapPin, Phone, Clock } from 'lucide-react';

const stores = [
  {
    name: 'Jackman Trading Post',
    description: 'A classic general store serving the Jackman community with groceries, dry goods, hunting and fishing licenses, and everyday essentials. A local landmark since the early 1900s.',
    address: '45 Main Street, Jackman, ME 04945',
    phone: '(207) 668-3351',
    hours: 'Mon–Sat: 7:00 AM – 7:00 PM; Sun: 8:00 AM – 5:00 PM',
  },
  {
    name: 'Northwoods Hardware & Sporting Goods',
    description: 'Your one-stop shop for hardware supplies, outdoor gear, firearms, ammunition, and sporting equipment. Knowledgeable staff ready to help with all your wilderness adventure needs.',
    address: '112 Attean Road, Jackman, ME 04945',
    phone: '(207) 668-4200',
    hours: 'Mon–Fri: 8:00 AM – 6:00 PM; Sat: 8:00 AM – 5:00 PM',
  },
  {
    name: 'Jackman IGA Supermarket',
    description: 'Full-service grocery store offering fresh produce, meats, dairy, and pantry staples. Serving Jackman families and visitors with quality products at fair prices.',
    address: '78 Forest Street, Jackman, ME 04945',
    phone: '(207) 668-2100',
    hours: 'Mon–Sat: 7:00 AM – 8:00 PM; Sun: 8:00 AM – 6:00 PM',
  },
  {
    name: 'Moose River Outfitters',
    description: 'Specializing in canoe and kayak rentals, camping gear, trail maps, and outdoor apparel. Expert local guides available for fishing and hunting trips into the North Maine Woods.',
    address: '23 Moose River Road, Jackman, ME 04945',
    phone: '(207) 668-5500',
    hours: 'Daily: 6:00 AM – 8:00 PM (seasonal)',
  },
  {
    name: 'Jackman Fuel & Convenience',
    description: 'Gas station and convenience store with fuel, snacks, beverages, ice, and basic supplies. Snowmobile fuel available in winter months. Open early for those early morning hunting trips.',
    address: '5 Route 201, Jackman, ME 04945',
    phone: '(207) 668-3900',
    hours: 'Daily: 5:30 AM – 9:00 PM',
  },
];

const hotels = [
  {
    name: 'Jackman Landing Camps',
    description: 'Rustic yet comfortable lakeside sporting camps on the shores of Wood Pond. Offering fully equipped cabins, guided fishing and hunting packages, and authentic Maine wilderness experiences.',
    address: '100 Wood Pond Road, Jackman, ME 04945',
    phone: '(207) 668-3351',
    hours: 'Open year-round; reservations recommended',
  },
  {
    name: 'The Moose River Inn',
    description: 'A charming bed and breakfast nestled along the Moose River. Enjoy cozy rooms, hearty home-cooked breakfasts, and easy access to snowmobile trails, fishing spots, and hiking paths.',
    address: '34 River View Drive, Jackman, ME 04945',
    phone: '(207) 668-4422',
    hours: 'Open year-round',
  },
  {
    name: 'Attean Lake Lodge',
    description: 'A historic island lodge accessible only by boat, offering an unparalleled wilderness retreat. Guests enjoy private cabins, home-cooked meals, canoes, kayaks, and stunning views of Attean Pond.',
    address: 'Attean Pond, Jackman, ME 04945',
    phone: '(207) 668-3792',
    hours: 'Open mid-May through mid-October',
  },
  {
    name: 'Jackman Motel',
    description: 'Clean, affordable motel accommodations in the heart of Jackman. Convenient location near restaurants, shops, and snowmobile trail access. Pet-friendly rooms available.',
    address: '88 Main Street, Jackman, ME 04945',
    phone: '(207) 668-2700',
    hours: 'Open year-round; check-in after 2:00 PM',
  },
  {
    name: 'Sky Lodge & Cabins',
    description: 'Hilltop lodge with panoramic views of the surrounding mountains and forests. Offers lodge rooms and private cabins, ideal for hunting parties, family getaways, and snowmobile groups.',
    address: '250 Sky Hill Road, Jackman, ME 04945',
    phone: '(207) 668-5050',
    hours: 'Open year-round; reservations recommended in peak season',
  },
];

interface BusinessCardProps {
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
}

function BusinessCard({ name, description, address, phone, hours }: BusinessCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-serif font-bold text-forest-700 text-lg">{name}</h3>
      </div>
      <div className="px-5 py-4 space-y-3">
        <p className="text-sm text-muted-foreground font-sans leading-relaxed">{description}</p>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-start gap-2 text-xs font-sans text-foreground/80">
            <MapPin size={13} className="text-amber-500 mt-0.5 shrink-0" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-foreground/80">
            <Phone size={13} className="text-amber-500 shrink-0" />
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-amber-600 transition-colors">
              {phone}
            </a>
          </div>
          <div className="flex items-start gap-2 text-xs font-sans text-foreground/80">
            <Clock size={13} className="text-amber-500 mt-0.5 shrink-0" />
            <span>{hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocalBusinessesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Local Businesses</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Shops, stores, and lodging in Jackman, Maine — supporting our local community
          </p>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-forest-600 rounded-lg p-2.5">
              <ShoppingBag size={20} className="text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-forest-700">Stores in Jackman, Maine</h2>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">
                Local shops and retailers serving the Jackman community
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <BusinessCard key={store.name} {...store} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-forest-50 border-y border-forest-100 py-1" />

      {/* Hotels Section */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-forest-600 rounded-lg p-2.5">
              <Hotel size={20} className="text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-forest-700">Hotels &amp; Lodging in Jackman, Maine</h2>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">
                Inns, motels, camps, and lodges for visitors to the North Maine Woods
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <BusinessCard key={hotel.name} {...hotel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
