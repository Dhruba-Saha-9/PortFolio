import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';
import siteData from '@/data/site.json';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-normal',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-primary"
            >
              {siteData.personal.name.split(' ').map((word, index) => (
                <span key={index} className={index === 0 ? 'text-primary' : 'text-accent'}>
                  {word}
                  {index < siteData.personal.name.split(' ').length - 1 && ' '}
                </span>
              ))}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-all duration-normal relative',
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href={siteData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon-sm">
                <Github className="h-4 w-4" />
              </Button>
            </motion.a>
            
            <motion.a
              href={siteData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon-sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </motion.a>
            
            <ThemeToggle />
            
            <motion.a
              href={`mailto:${siteData.personal.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'block px-3 py-2 text-base font-medium rounded-xl transition-all duration-normal',
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-subtle'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
                  <Button variant="ghost" size="icon-sm" asChild>
                    <a href={siteData.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${siteData.personal.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}