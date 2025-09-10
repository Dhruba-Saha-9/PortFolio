import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import siteData from '@/data/site.json';

const socialLinks = [
  { icon: Github, href: siteData.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteData.social.linkedin, label: 'LinkedIn' },
  { icon: Code, href: siteData.social.leetcode, label: 'LeetCode' },
  { icon: Mail, href: `mailto:${siteData.personal.email}`, label: 'Email' },
];

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-subtle border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                {siteData.personal.name}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                {siteData.personal.shortBio}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={social.label}
                  >
                    <Button variant="ghost" size="icon-sm">
                      <social.icon className="h-4 w-4" />
                    </Button>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-normal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Get In Touch
              </h4>
              <div className="space-y-2">
                <a
                  href={`mailto:${siteData.personal.email}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-normal"
                >
                  {siteData.personal.email}
                </a>
                <p className="text-muted-foreground">
                  {siteData.personal.location}
                </p>
                <a
                  href={siteData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary hover:text-primary-dark transition-colors duration-normal"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-muted-foreground text-sm flex items-center">
            © {currentYear} {siteData.personal.name}. Made with{' '}
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            and React.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}