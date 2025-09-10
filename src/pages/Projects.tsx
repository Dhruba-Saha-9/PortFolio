import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/common/SEO';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getUniqueTags, filterByTags } from '@/lib/utils';
import projectsData from '@/data/projects.json';

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { elementRef, isIntersecting } = useIntersectionObserver();
  
  const allProjects = [...projectsData.featured, ...projectsData.other];
  const allTags = getUniqueTags(allProjects);
  const filteredProjects = filterByTags(allProjects, selectedTags);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      <SEO 
        title="Projects - Alex Johnson"
        description="Explore my portfolio of web development projects built with React, TypeScript, and modern technologies."
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader
            subtitle="Portfolio"
            title="Featured Projects"
            description="Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience."
            centered
          />

          {/* Filter Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <Button
              variant={selectedTags.length === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTags([])}
            >
              All Projects
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div ref={elementRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="glass" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="glass" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      {project.featured && (
                        <Badge variant="gradient" size="sm">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" size="sm">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/projects/${project.id}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No projects found with the selected tags.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedTags([])}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}