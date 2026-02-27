import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, TreePine } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Events', path: '/events' },
  { label: 'Recreation', path: '/recreation' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="bg-forest-700 text-white shadow-hero sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-forest-900 text-amber-200 text-xs py-1 text-center tracking-wide font-sans">
        Town of Jackman, Maine &bull; ZIP Code 04945
      </div>

      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/assets/generated/jackman-logo.dim_256x256.png"
            alt="Jackman Maine Logo"
            className="h-10 w-10 rounded-full object-cover border-2 border-amber-300/60"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="leading-tight">
            <div className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition-colors">
              Jackman
            </div>
            <div className="text-xs text-amber-300/80 font-sans tracking-widest uppercase">Maine</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded text-sm font-sans font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-500 text-white'
                      : 'text-slate-100 hover:bg-forest-600 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth + Mobile toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-sans font-medium border border-amber-300/50 text-amber-200 hover:bg-amber-300/10 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? 'Logging in…' : isAuthenticated ? 'Logout' : 'Admin Login'}
          </button>
          <button
            className="md:hidden p-2 rounded hover:bg-forest-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-forest-800 border-t border-forest-600 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded text-sm font-sans font-medium transition-colors ${
                      isActive
                        ? 'bg-forest-500 text-white'
                        : 'text-slate-100 hover:bg-forest-600 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => { handleAuth(); setMobileOpen(false); }}
            disabled={isLoggingIn}
            className="mt-3 w-full px-3 py-2 rounded text-sm font-sans font-medium border border-amber-300/50 text-amber-200 hover:bg-amber-300/10 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? 'Logging in…' : isAuthenticated ? 'Logout' : 'Admin Login'}
          </button>
        </div>
      )}
    </header>
  );
}
