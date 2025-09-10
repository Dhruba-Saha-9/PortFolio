import { motion } from 'framer-motion';
import { Download, ExternalLink, Github, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/common/SEO';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import siteData from '@/data/site.json';

export default function Home() {
  const { elementRef: heroRef, isIntersecting: heroInView } = useIntersectionObserver();
  const { elementRef: aboutRef, isIntersecting: aboutInView } = useIntersectionObserver();

  return (
    <>
      <SEO 
        title={siteData.seo.title}
        description={siteData.seo.description}
        keywords={siteData.seo.keywords}
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-subtle"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={heroInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-primary p-1"
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold text-primary">
                  {siteData.personal.name.split(' ').map(name => name[0]).join('')}
                </div>
              </motion.div>
              
              <Badge variant="gradient" size="lg" className="mb-6">
                Available for new opportunities
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {siteData.personal.name.split(' ')[0]}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-accent font-medium mb-8"
            >
              {siteData.personal.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {siteData.personal.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <a href={siteData.personal.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center space-x-6"
            >
              {[
                { icon: Github, href: siteData.social.github, label: 'GitHub' },
                { icon: Linkedin, href: siteData.social.linkedin, label: 'LinkedIn' },
                { icon: ExternalLink, href: siteData.personal.website, label: 'Website' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-normal"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Preview Section */}
      <section ref={aboutRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="accent" className="mb-6">
                About Me
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Passionate about creating exceptional digital experiences
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {siteData.bio.highlights.map((highlight, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    • {highlight}
                  </motion.p>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Button variant="outline" asChild>
                  <Link to="/about">
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-10" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">5+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100K+</div>
                      <div className="text-sm text-muted-foreground">Users Impacted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">GitHub Stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}