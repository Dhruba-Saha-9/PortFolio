import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SEO } from '@/components/common/SEO';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useToast } from '@/hooks/use-toast';
import { isValidEmail } from '@/lib/utils';
import siteData from '@/data/site.json';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: siteData.personal.email,
    href: `mailto:${siteData.personal.email}`,
    description: 'Send me an email and I\'ll get back to you within 24 hours'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: siteData.personal.phone,
    href: `tel:${siteData.personal.phone}`,
    description: 'Give me a call for urgent matters or quick discussions'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: siteData.personal.location,
    href: '#',
    description: 'Based in San Francisco, available for remote work worldwide'
  }
];

const socialLinks = [
  { icon: Github, href: siteData.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteData.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: siteData.social.twitter, label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { elementRef: formRef, isIntersecting: formInView } = useIntersectionObserver();
  const { elementRef: contactRef, isIntersecting: contactInView } = useIntersectionObserver();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Please enter your name", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim()) {
      toast({ title: "Error", description: "Please enter your email", variant: "destructive" });
      return false;
    }
    if (!isValidEmail(formData.email)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    if (!formData.subject.trim()) {
      toast({ title: "Error", description: "Please enter a subject", variant: "destructive" });
      return false;
    }
    if (!formData.message.trim()) {
      toast({ title: "Error", description: "Please enter your message", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // EmailJS integration would go here
      // For now, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or send me an email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact - Alex Johnson"
        description="Get in touch with Alex Johnson for collaboration opportunities, project inquiries, or just to say hello."
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader
            subtitle="Get in touch"
            title="Let's Work Together"
            description="Have a project in mind? Looking for a developer? Or just want to say hello? I'd love to hear from you!"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div ref={contactRef}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Let's start a conversation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm always interested in hearing about new opportunities, 
                    exciting projects, and connecting with fellow developers. 
                    Whether you have a question, want to collaborate, or just 
                    want to say hi, feel free to reach out!
                  </p>
                </div>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={contactInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <method.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                {method.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-2">
                                {method.description}
                              </p>
                              {method.href !== '#' ? (
                                <a
                                  href={method.href}
                                  className="text-primary hover:text-primary-dark transition-colors font-medium"
                                >
                                  {method.value}
                                </a>
                              ) : (
                                <span className="text-foreground font-medium">
                                  {method.value}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Connect with me on social media
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5 text-primary" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send me a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project, idea, or just say hello..."
                          rows={6}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                        variant="hero"
                        size="lg"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-muted-foreground text-center">
                        By sending this message, you agree that I may contact you 
                        regarding your inquiry. I respect your privacy and won't 
                        share your information with third parties.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}