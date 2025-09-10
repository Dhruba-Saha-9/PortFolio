import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/common/SEO';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - Alex Johnson"
        description="The page you're looking for doesn't exist. Return to the homepage to explore my portfolio."
      />
      
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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

        <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-primary/20 mb-4"
            >
              404
            </motion.h1>

            {/* Error Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-destructive" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Oops! Page not found
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track!
            </motion.p>

            {/* Current Path Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 p-4 bg-muted/50 rounded-lg border border-border"
            >
              <p className="text-sm text-muted-foreground">
                Requested path: <code className="bg-background px-2 py-1 rounded text-foreground">{location.pathname}</code>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-4">
                Or explore these popular sections:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/projects" className="text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline">
                  Projects
                </Link>
                <Link to="/experience" className="text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline">
                  Experience
                </Link>
                <Link to="/about" className="text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline">
                  About
                </Link>
                <Link to="/contact" className="text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline">
                  Contact
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}