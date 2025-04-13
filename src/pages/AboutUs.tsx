import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();
  
  // Function to capitalize first letter of each word
  const capitalize = (str: string) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h1 
            className="text-3xl font-bold" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground">The creators of BudgetIQ</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tojin's Profile */}
          <motion.div
            custom={0} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
              <div className="bg-gradient-to-r from-budget-teal to-budget-teal2/60 p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Tojin Varkey Simson" />
                    <AvatarFallback className="text-xl">TVS</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white">Tojin Varkey Simson</h2>
                    <p className="text-white/90">MCA Student, CHRIST (Deemed-to-be University)</p>
                    <div className="flex mt-2 justify-center sm:justify-start gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    Tojin Varkey Simson is a passionate and dedicated postgraduate student currently pursuing his Master of Computer Applications (MCA) at CHRIST (Deemed-to-be University), Bengaluru. With a deep interest in software development, artificial intelligence, and cybersecurity, Tojin is committed to applying his skills and knowledge to real-world projects and gaining valuable industry experience.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Projects</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Movie Recommendation System (Android, MVVM)</li>
                    <li>• Personalized Planner App</li>
                    <li>• Library Management System with chatbot assistance</li>
                    <li>• College Management System</li>
                    <li>• Bank Management System</li>
                    <li>• Face Analysis System using Python and OpenCV</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Java</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Python</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">C</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Node.js</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">SQL</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">MongoDB</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">AWS</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Git</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">MVVM</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Android</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Research</h3>
                  <p className="text-muted-foreground">
                    Deep Learning for Fake News Detection
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Jaiby's Profile */}
          <motion.div
            custom={1} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124247490" alt="Jaiby Mariya Joseph" />
                    <AvatarFallback className="text-xl">JMJ</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white">Jaiby Mariya Joseph</h2>
                    <p className="text-white/90">MCA Student, CHRIST University</p>
                    <div className="flex mt-2 justify-center sm:justify-start gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    Jaiby Mariya Joseph is an ambitious and talented postgraduate student currently pursuing her Master of Computer Applications (MCA) at CHRIST University, Bangalore. She is deeply passionate about technology, programming, and data analysis, and has consistently demonstrated a strong commitment to academic excellence and professional growth throughout her educational journey.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Projects</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• College Management System (Node.js, Express.js)</li>
                    <li>• Bus Reservation System (C)</li>
                    <li>• Detection and Mitigation of Ransomware Attacks Using Machine Learning</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">C</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Python</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">SQL</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">R Programming</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Microsoft Excel</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">SAS</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">MongoDB</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Node.js</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-sm">Express.js</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Leadership Roles</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Placement Representative at CHRIST University</li>
                    <li>• Academic Representative at St. Joseph's College</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          custom={2} 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="bg-card rounded-xl border shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">About BudgetIQ</h2>
          <p className="mb-4 text-muted-foreground">
            BudgetIQ is an AI-powered financial management application designed to help users take control of their finances
            through intelligent insights, detailed analytics, and personalized recommendations. The application was developed
            as a collaborative project by Tojin Varkey Simson and Jaiby Mariya Joseph during their MCA program at CHRIST University.
          </p>
          <p className="text-muted-foreground">
            Combining their technical expertise in software development, data analysis, and machine learning, they created a
            comprehensive financial tool that makes budgeting, expense tracking, and financial planning accessible to everyone.
            BudgetIQ represents their commitment to creating practical, user-friendly solutions that leverage cutting-edge technology
            to solve everyday problems.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AboutUs; 