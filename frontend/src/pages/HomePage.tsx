import { Link } from '@tanstack/react-router';
import { ChevronRight, TreePine, Fish, Snowflake, Mountain, CalendarDays, Phone } from 'lucide-react';

const quickLinks = [
  { icon: CalendarDays, label: 'Events & News', path: '/events', desc: 'Stay up to date with local happenings' },
  { icon: TreePine, label: 'Recreation', path: '/recreation', desc: 'Explore the great outdoors' },
  { icon: Phone, label: 'Town Services', path: '/services', desc: 'Municipal services & resources' },
];

const highlights = [
  { icon: Snowflake, label: 'World-Class Snowmobiling', desc: 'Hundreds of miles of groomed ITS trails' },
  { icon: Fish, label: 'Premier Fishing', desc: 'Moose River, Wood Pond & beyond' },
  { icon: Mountain, label: 'Hiking & Wilderness', desc: 'Boundless trails in the North Maine Woods' },
  { icon: TreePine, label: 'Pristine Nature', desc: 'Unspoiled forests, lakes, and wildlife' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[520px] md:h-[600px] overflow-hidden">
        <img
          src="/assets/generated/jackman-hero.dim_1440x600.png"
          alt="Panoramic view of Jackman, Maine wilderness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/40 to-forest-900/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 rounded-full px-4 py-1.5 mb-5">
            <TreePine size={14} className="text-amber-300" />
            <span className="text-amber-200 text-xs font-sans tracking-widest uppercase font-medium">
              Somerset County, Maine &bull; ZIP 04945
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Jackman, Maine
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-sans max-w-xl mb-8 leading-relaxed">
            Gateway to the North Maine Woods — where wilderness meets community.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-forest-900 font-sans font-semibold px-6 py-3 rounded transition-colors shadow-hero"
            >
              Discover Jackman <ChevronRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-sans font-medium px-6 py-3 rounded transition-colors"
            >
              Contact Town Office
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-forest-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map(({ icon: Icon, label, path, desc }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-4 bg-forest-600 hover:bg-forest-500 rounded-lg p-4 transition-colors group"
              >
                <div className="bg-amber-400/20 rounded-lg p-3 shrink-0">
                  <Icon size={22} className="text-amber-300" />
                </div>
                <div>
                  <div className="font-serif font-semibold text-white group-hover:text-amber-200 transition-colors">
                    {label}
                  </div>
                  <div className="text-xs text-slate-300 font-sans mt-0.5">{desc}</div>
                </div>
                <ChevronRight size={16} className="text-slate-400 ml-auto shrink-0 group-hover:text-amber-300 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-700 mb-4">
              Welcome to Jackman
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
              Nestled along the Moose River in the heart of Somerset County, Jackman is a small, tight-knit community
              that serves as the gateway to Maine's legendary North Woods. With a population of just over 800 residents,
              our town offers an authentic Maine experience — from world-class snowmobiling and fishing to breathtaking
              fall foliage and summer hiking.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Whether you're a lifelong resident or a first-time visitor, Jackman welcomes you with open arms and
              endless outdoor adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-14 bg-forest-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest-700 text-center mb-2">
            Why Visit Jackman?
          </h2>
          <div className="w-12 h-1 bg-amber-400 mx-auto mb-10 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-card rounded-xl p-6 shadow-card text-center border border-border hover:border-forest-300 transition-colors">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-forest-100 rounded-full mb-4">
                  <Icon size={26} className="text-forest-600" />
                </div>
                <h3 className="font-serif font-semibold text-forest-800 mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground font-sans">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/recreation"
              className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-sans font-medium px-6 py-3 rounded transition-colors"
            >
              Explore Recreation <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
