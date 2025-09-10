import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

export function SEO({
  title = "Alex Johnson - Full Stack Developer",
  description = "Full Stack Developer specializing in React, TypeScript, and Node.js. Building beautiful, scalable web applications.",
  keywords = ["Full Stack Developer", "React Developer", "TypeScript", "Web Development"],
  image = "/images/og-image.jpg",
  url = "https://alexjohnson.dev",
  type = "website",
  author = "Alex Johnson"
}: SEOProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@alexjohnson');
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
    
  }, [title, description, keywords, image, url, type, author]);
  
  return null;
}