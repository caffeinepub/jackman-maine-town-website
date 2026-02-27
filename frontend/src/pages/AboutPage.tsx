import { MapPin, Users, Calendar, TreePine, Landmark } from 'lucide-react';

const facts = [
  { icon: MapPin, label: 'Location', value: 'Somerset County, Maine' },
  { icon: Users, label: 'Population', value: 'Approx. 800 residents' },
  { icon: Calendar, label: 'Incorporated', value: '1895' },
  { icon: TreePine, label: 'Elevation', value: '1,160 ft above sea level' },
  { icon: Landmark, label: 'ZIP Code', value: '04945' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">About Jackman</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            A proud community in the heart of Maine's North Woods
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Logo + Facts */}
            <div className="lg:col-span-1 flex flex-col items-center gap-6">
              <div className="bg-forest-50 rounded-2xl p-6 border border-border shadow-card w-full flex flex-col items-center">
                <img
                  src="/assets/generated/jackman-logo.dim_256x256.png"
                  alt="Town of Jackman, Maine"
                  className="w-40 h-40 object-contain mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <h2 className="font-serif font-bold text-forest-700 text-xl text-center">Town of Jackman</h2>
                <p className="text-sm text-muted-foreground font-sans text-center mt-1">Jackman, Maine 04945</p>
              </div>

              {/* Quick Facts */}
              <div className="bg-card rounded-xl border border-border shadow-card w-full p-5">
                <h3 className="font-serif font-semibold text-forest-700 mb-4 text-base">Quick Facts</h3>
                <ul className="space-y-3">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-center gap-3">
                      <div className="bg-forest-100 rounded-lg p-2 shrink-0">
                        <Icon size={15} className="text-forest-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-sans">{label}</div>
                        <div className="text-sm font-medium text-foreground font-sans">{value}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-700 mb-3">Our Town</h2>
                <div className="w-10 h-1 bg-amber-400 mb-4 rounded-full" />
                <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                  Jackman is a small town and unorganized territory in Somerset County, Maine, United States.
                  Situated along the Moose River and bordered by the Canadian province of Quebec to the north,
                  Jackman sits at the crossroads of wilderness and community — a place where neighbors know each
                  other by name and the outdoors is always just steps away.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                  The town was incorporated in 1895 and has long served as a hub for the surrounding region.
                  Its strategic location near the Canadian border made it an important stop along historic
                  trade and travel routes, and today it continues to welcome visitors from across New England
                  and beyond.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-700 mb-3">Geography & Nature</h2>
                <div className="w-10 h-1 bg-amber-400 mb-4 rounded-full" />
                <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                  Jackman is surrounded by some of Maine's most spectacular natural scenery. The Moose River
                  winds through the valley, offering world-class fishing and paddling. Wood Pond, Long Pond,
                  and dozens of other lakes and streams dot the landscape, teeming with brook trout, landlocked
                  salmon, and bass.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  The town sits at an elevation of approximately 1,160 feet, giving it a climate that brings
                  heavy snowfall in winter — perfect for the snowmobiling and skiing that draw thousands of
                  visitors each year — and cool, refreshing summers ideal for hiking, camping, and wildlife watching.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-700 mb-3">Community Spirit</h2>
                <div className="w-10 h-1 bg-amber-400 mb-4 rounded-full" />
                <p className="text-muted-foreground font-sans leading-relaxed">
                  Despite its small size, Jackman has a vibrant community spirit. Local businesses, the town
                  office, volunteer fire department, and community organizations work together to maintain the
                  quality of life that makes Jackman a special place to call home. Annual events, local
                  gatherings, and a strong sense of pride in Maine's heritage define the character of this
                  remarkable town.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
