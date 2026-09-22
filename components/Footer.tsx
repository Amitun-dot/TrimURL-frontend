'use client';

import { Scissors } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

export default function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent glow-primary">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Trim<span className="gradient-text">URL</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Shorten links. Share faster.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2026 TrimURL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
