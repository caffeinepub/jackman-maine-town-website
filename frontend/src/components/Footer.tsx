import { TreePine, Heart, MapPin, Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'jackman-maine';
  const utmUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <footer className="bg-forest-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TreePine size={22} className="text-amber-300" />
              <span className="font-serif font-bold text-xl text-white">Jackman, Maine</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Gateway to the North Maine Woods. A welcoming community nestled in the heart of Somerset County.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-white mb-3 text-base">Quick Links</h3>
            <ul className="space-y-1.5 text-sm font-sans">
              {[
                { label: 'About Jackman', path: '/about' },
                { label: 'Town Services', path: '/services' },
                { label: 'Events & News', path: '/events' },
                { label: 'Recreation', path: '/recreation' },
                { label: 'Local Businesses', path: '/local-businesses' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Report a Problem', path: '/report-problem' },
                { label: 'Town Office Dashboard', path: '/town-office/reports' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-amber-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white mb-3 text-base">Contact</h3>
            <div className="space-y-2 text-sm font-sans text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <span>123 Main Street<br />Jackman, ME 04945</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-amber-300 shrink-0" />
                <span>(123) 456-7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-sans">
          <span>&copy; {year} Town of Jackman, Maine. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-amber-400 fill-amber-400" /> using{' '}
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
