import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, Calendar, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/common/SEO';
import { formatDateRange } from '@/lib/utils';
import projectsData from '@/data/projects.json';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const allProjects = [...projectsData.featured, ...projectsData.other];
  const project = allProjects.find(p => p.id === id);
  
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO 
        title={`${project.title} - Alex Johnson`}
        description={project.description}
        keywords={project.technologies}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button variant="ghost" asChild className="mb-8">
                <Link to="/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                      {project.title}
                    </h1>
                    {project.featured && (
                      <Badge variant="gradient">Featured</Badge>
                    )}
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <Button variant="hero" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Duration</div>
                      <div className="font-medium">
                        {formatDateRange(project.startDate, project.endDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Status</div>
                      <Badge variant={project.status === 'completed' ? 'success' : 'warning'}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-2xl shadow-elegant"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-subtle"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Challenges */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <Target className="h-6 w-6 mr-3 text-primary" />
                    Challenges
                  </h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-xl border border-border bg-card"
                      >
                        <p className="text-muted-foreground">{challenge}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Learnings */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <Lightbulb className="h-6 w-6 mr-3 text-primary" />
                    Key Learnings
                  </h2>
                  <div className="space-y-4">
                    {project.learnings.map((learning, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-xl bg-accent/10 border border-accent/20"
                      >
                        <p className="text-foreground">{learning}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Image Gallery */}
                {project.images && project.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-6">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.images.map((image, index) => (
                        <motion.img
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Technologies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">
                          {formatDateRange(project.startDate, project.endDate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Team Size</div>
                        <div className="font-medium">Solo Project</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}