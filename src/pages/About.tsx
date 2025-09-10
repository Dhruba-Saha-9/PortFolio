import { motion } from 'framer-motion';
import { Camera, Mountain, Code, BookOpen, Guitar, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/common/SEO';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import siteData from '@/data/site.json';
import skillsData from '@/data/skills.json';

const hobbyIcons = {
  'Photography': Camera,
  'Hiking & Outdoor Adventures': Mountain,
  'Open Source Contributing': Code,
  'Reading Tech Blogs': BookOpen,
  'Playing Guitar': Guitar,
  'Cooking': ChefHat,
};

const SkillCard = ({ skill, index, category }: { skill: any; index: number; category: string }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver();

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {skill.name}
            </h3>
            <Badge variant="outline" size="sm">
              {skill.experience}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">{skill.category}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Proficiency</span>
              <span className="font-medium">{skill.level}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={isIntersecting ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                className="bg-gradient-primary h-2 rounded-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function About() {
  const { elementRef: bioRef, isIntersecting: bioInView } = useIntersectionObserver();
  const { elementRef: statsRef, isIntersecting: statsInView } = useIntersectionObserver();
  const { elementRef: hobbiesRef, isIntersecting: hobbiesInView } = useIntersectionObserver();

  return (
    <>
      <SEO 
        title="About - Alex Johnson"
        description="Learn more about Alex Johnson, a passionate full-stack developer with expertise in React, TypeScript, and modern web technologies."
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader
            subtitle="Get to know me"
            title="About Alex"
            description="Passionate developer, problem solver, and continuous learner with a love for creating beautiful digital experiences."
            centered
          />

          {/* Bio Section */}
          <section ref={bioRef} className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={bioInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-foreground">
                  Building the future, one line of code at a time
                </h2>
                
                <div className="prose prose-lg text-muted-foreground leading-relaxed">
                  <p>{siteData.bio.longDescription}</p>
                </div>

                <div className="space-y-3">
                  {siteData.bio.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={bioInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={bioInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-10" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl font-semibold text-foreground">Quick Facts</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{siteData.personal.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Email</span>
                        <a 
                          href={`mailto:${siteData.personal.email}`}
                          className="font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                          {siteData.personal.email}
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{siteData.personal.phone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Website</span>
                        <a 
                          href={siteData.personal.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                          Visit Site
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground text-center mb-16"
            >
              Technical Skills
            </motion.h2>

            {/* Frontend Skills */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center">
                <div className="w-4 h-4 bg-primary rounded mr-3" />
                Frontend Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsData.technical.frontend.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} category="frontend" />
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center">
                <div className="w-4 h-4 bg-accent rounded mr-3" />
                Backend Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsData.technical.backend.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} category="backend" />
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center">
                <div className="w-4 h-4 bg-success rounded mr-3" />
                Tools & Technologies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsData.technical.tools.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} category="tools" />
                ))}
              </div>
            </div>
          </section>

          {/* Soft Skills */}
          <section className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground text-center mb-16"
            >
              Soft Skills & Strengths
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.soft.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Hobbies & Interests */}
          <section ref={hobbiesRef}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={hobbiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-foreground text-center mb-16"
            >
              When I'm Not Coding
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.hobbies.map((hobby, index) => {
                const IconComponent = hobbyIcons[hobby as keyof typeof hobbyIcons] || Code;
                
                return (
                  <motion.div
                    key={hobby}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hobbiesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Card className="h-full text-center p-6 hover:shadow-xl transition-all duration-300">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {hobby}
                      </h3>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}