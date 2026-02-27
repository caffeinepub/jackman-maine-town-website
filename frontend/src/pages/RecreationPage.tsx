import { Snowflake, Fish, Mountain, TreePine, Waves, Tent, Camera, Crosshair } from 'lucide-react';

const activities = [
  {
    icon: Snowflake,
    title: 'Snowmobiling',
    subtitle: 'World-Class Trails',
    description:
      'Jackman is widely regarded as the snowmobile capital of the East. With access to hundreds of miles of groomed ITS (Interconnected Trail System) trails, riders can explore the vast North Maine Woods and even cross into Canada. The area typically receives over 100 inches of snow per season, ensuring excellent conditions from December through March.',
    highlights: ['ITS Trail Access', 'Cross-border riding to Canada', '100+ inches of annual snowfall', 'Local sled rentals available'],
  },
  {
    icon: Fish,
    title: 'Fishing',
    subtitle: 'Premier Angling Waters',
    description:
      'The Jackman area is a fisherman\'s paradise. The Moose River, Wood Pond, Long Pond, and dozens of remote ponds and streams offer exceptional fishing for brook trout, landlocked salmon, smallmouth bass, and lake trout. Ice fishing is equally popular in winter, drawing anglers from across New England.',
    highlights: ['Brook trout & landlocked salmon', 'Ice fishing in winter', 'Guided fishing trips available', 'Maine fishing licenses required'],
  },
  {
    icon: Mountain,
    title: 'Hiking & Backpacking',
    subtitle: 'Boundless Wilderness',
    description:
      'The North Maine Woods surrounding Jackman offer some of the most remote and rewarding hiking in the Northeast. From day hikes to multi-day backpacking adventures, the region\'s trails wind through old-growth forests, past pristine lakes, and up to stunning mountain summits with panoramic views.',
    highlights: ['Remote backcountry trails', 'Stunning summit views', 'Wildlife watching opportunities', 'Primitive camping available'],
  },
  {
    icon: Waves,
    title: 'Paddling & Canoeing',
    subtitle: 'The Moose River Bow Trip',
    description:
      'The legendary Moose River Bow Trip is one of Maine\'s most celebrated canoe routes. This classic multi-day paddle takes you through pristine wilderness, with opportunities to spot moose, loons, and bald eagles along the way. The route is suitable for intermediate paddlers and offers a true wilderness experience.',
    highlights: ['Moose River Bow Trip', 'Flatwater & moving water', 'Moose & wildlife sightings', 'Canoe rentals available'],
  },
  {
    icon: Tent,
    title: 'Camping',
    subtitle: 'Under the Stars',
    description:
      'From established campgrounds to remote backcountry sites, Jackman offers camping experiences for every style. The North Maine Woods permit system provides access to thousands of acres of private timberland with designated campsites along lakes and rivers.',
    highlights: ['Established campgrounds', 'Remote backcountry sites', 'Lakeside camping', 'North Maine Woods access'],
  },
  {
    icon: Camera,
    title: 'Wildlife & Photography',
    subtitle: 'Nature at Its Finest',
    description:
      'Jackman is one of the best places in the Northeast to observe moose in their natural habitat. The area is also home to black bears, white-tailed deer, bald eagles, loons, and countless other species. Fall foliage season transforms the landscape into a breathtaking tapestry of color.',
    highlights: ['Moose viewing hotspots', 'Fall foliage photography', 'Bald eagle sightings', 'Guided wildlife tours'],
  },
  {
    icon: Crosshair,
    title: 'Hunting',
    subtitle: 'Prime Big Game Country',
    description:
      'The vast forests and wetlands surrounding Jackman make it one of Maine\'s premier hunting destinations. The region supports healthy populations of white-tailed deer, moose, black bear, and upland birds. With millions of acres of North Maine Woods accessible by permit, hunters enjoy some of the most productive and unspoiled habitat in the entire Northeast.',
    highlights: ['Moose, deer & black bear seasons', 'Upland bird & waterfowl hunting', 'Guided hunting trips available', 'Maine hunting licenses required'],
  },
];

export default function RecreationPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Recreation & Outdoors</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Discover the endless outdoor adventures that make Jackman, Maine a destination unlike any other
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="/assets/generated/jackman-recreation.dim_800x400.png"
          alt="Outdoor recreation in Jackman, Maine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white font-serif text-xl md:text-2xl font-semibold drop-shadow">
            Four Seasons of Adventure
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map(({ icon: Icon, title, subtitle, description, highlights }) => (
              <article key={title} className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:border-forest-300 transition-colors">
                <div className="bg-forest-600 px-5 py-4 flex items-center gap-3">
                  <div className="bg-white/15 rounded-lg p-2.5">
                    <Icon size={20} className="text-amber-300" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-white text-lg leading-tight">{title}</h2>
                    <p className="text-amber-200/80 text-xs font-sans">{subtitle}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">{description}</p>
                  <ul className="space-y-1.5">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm font-sans text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-forest-50 border border-forest-200 rounded-2xl p-8 text-center">
            <TreePine size={36} className="text-forest-500 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-forest-700 mb-2">Plan Your Visit</h3>
            <p className="text-muted-foreground font-sans mb-5 max-w-lg mx-auto">
              Ready to experience the best of Maine's North Woods? Contact the Jackman Town Office for
              local guides, lodging recommendations, and trail conditions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-sans font-medium px-6 py-3 rounded transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
