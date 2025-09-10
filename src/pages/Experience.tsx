import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Award, GraduationCap, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/common/SEO';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatDateRange, getDurationInMonths, formatDuration } from '@/lib/utils';
import experienceData from '@/data/experience.json';

const TimelineItem = ({ 
  icon: Icon, 
  item, 
  index, 
  type 
}: { 
  icon: any; 
  item: any; 
  index: number; 
  type: 'work' | 'education';
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver();
  const duration = type === 'work' 
    ? getDurationInMonths(item.startDate, item.endDate) 
    : getDurationInMonths(item.startDate, item.endDate);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDateRange(item.startDate, item.endDate)}
            <span>•</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>

      <Card className="ml-16">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">
                {type === 'work' ? item.position : item.degree}
              </CardTitle>
              <CardDescription className="text-base font-medium text-foreground mt-1">
                {type === 'work' ? item.company : item.institution}
              </CardDescription>
              {(item.location || item.gpa) && (
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  )}
                  {item.gpa && (
                    <div>
                      GPA: {item.gpa}
                    </div>
                  )}
                </div>
              )}
            </div>
            {item.current && (
              <Badge variant="success">Current</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Technologies */}
          {item.technologies && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech: string) => (
                  <Badge key={tech} variant="secondary" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Coursework */}
          {item.coursework && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Key Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {item.coursework.map((course: string) => (
                  <Badge key={course} variant="outline" size="sm">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {item.achievements && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                {item.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Experience() {
  const { elementRef: certRef, isIntersecting: certInView } = useIntersectionObserver();
  const { elementRef: achieveRef, isIntersecting: achieveInView } = useIntersectionObserver();

  return (
    <>
      <SEO 
        title="Experience - Alex Johnson"
        description="My professional experience, education, certifications, and achievements in software development."
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader
            subtitle="Career Journey"
            title="Experience & Education"
            description="My professional journey through education, work experience, and continuous learning in the field of software development."
            centered
          />

          {/* Work Experience */}
          <section className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-12 text-center"
            >
              Professional Experience
            </motion.h2>
            
            <div className="space-y-12">
              {experienceData.work.map((job, index) => (
                <TimelineItem
                  key={job.id}
                  icon={Briefcase}
                  item={job}
                  index={index}
                  type="work"
                />
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-12 text-center"
            >
              Education
            </motion.h2>
            
            <div className="space-y-12">
              {experienceData.education.map((edu, index) => (
                <TimelineItem
                  key={edu.id}
                  icon={GraduationCap}
                  item={edu}
                  index={index}
                  type="education"
                />
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-12 text-center"
            >
              Certifications
            </motion.h2>
            
            <div ref={certRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceData.certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={certInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{cert.name}</CardTitle>
                          <CardDescription>{cert.issuer}</CardDescription>
                        </div>
                        <Award className="h-6 w-6 text-primary flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          Issued: {new Date(cert.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Credential ID: {cert.credentialId}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={cert.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Verify
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-12 text-center"
            >
              Notable Achievements
            </motion.h2>
            
            <div ref={achieveRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={achieveInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-3">
                        <Award className="h-5 w-5 text-primary" />
                        {achievement.title}
                      </CardTitle>
                      <CardDescription>
                        {new Date(achievement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {achievement.description}
                      </p>
                      {achievement.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={achievement.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Learn More
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}