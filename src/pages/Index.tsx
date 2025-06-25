import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Briefcase, BarChart, Users, Star, Send } from "lucide-react";
// 1. Import 'motion' AND the 'Variants' type from framer-motion
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react"; // Import React for typing helper components

// --- Reusable Animation Variants for Framer Motion ---

// 2. Add the `: Variants` type annotation to each animation object
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/50 overflow-x-hidden">
      <Header />
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 relative z-10">
        {/* --- Hero Section --- */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col justify-center items-center text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {"A MAVEN BRISK RESONATE".split(" ").map((word, i) => (
              <motion.span key={i} variants={fadeInUp} className="inline-block mr-4">
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Simplifying Your Success. We are your all-in-one partner for accounting, staffing, branding, and beyond. Let's build your success story together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
            className="mt-12"
          >
            <Link to="/services">
              <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-300">
                Explore Our Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* --- Why Choose Us Section --- */}
        <motion.section 
          className="py-20 bg-white/30 dark:bg-black/20 backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">The Maven Brisk Advantage</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Discover the core principles that make us the ideal partner for your business.</motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {["All-in-One Business Partner", "Personalized & Timely Support", "Creative & Corporate Expertise", "Transparent & Reliable Process"].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-6 text-center rounded-xl bg-card/50 border shadow-sm">
                  <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-lg mb-2 text-foreground">{feature}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Core Services Section --- */}
        <motion.section 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer} // Use stagger for the container
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-semibold mb-4">Our Core Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">A glimpse into how we can empower your business to reach new heights.</motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <motion.div variants={fadeInUp}><ServiceCard icon={<Briefcase/>} title="Accounting & Taxation" description="From bookkeeping to tax filing, we ensure your finances are flawless and compliant." /></motion.div>
              <motion.div variants={fadeInUp}><ServiceCard icon={<Users/>} title="Staffing & HR" description="Find the perfect talent, from clerks and assistants to HR and IT professionals." /></motion.div>
              <motion.div variants={fadeInUp}><ServiceCard icon={<BarChart/>} title="Branding & Digital Marketing" description="Build a powerful brand identity and captivate your audience with strategic digital campaigns." /></motion.div>
            </div>
             <motion.div variants={fadeInUp} className="mt-12">
                <Link to="/services">
                  <Button variant="outline" size="lg">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
             </motion.div>
          </div>
        </motion.section>

        {/* --- Testimonials Section --- */}
        <motion.section 
          className="py-20 bg-white/30 dark:bg-black/20 backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
            <div className="container mx-auto px-4">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-semibold text-center mb-12">Trusted by Businesses Like Yours</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard 
                        name="Sarah L." 
                        title="CEO, Tech Innovators" 
                        avatarSrc="https://github.com/shadcn.png" 
                        quote="Maven Brisk transformed our accounting process. Their team is professional, timely, and incredibly knowledgeable. A true all-in-one partner!" 
                    />
                    <TestimonialCard 
                        name="Mike R." 
                        title="Founder, Creative Co." 
                        avatarSrc="https://github.com/randomuser2.png" 
                        quote="The branding and digital media team is exceptional. They captured our vision perfectly and our online presence has never been stronger." 
                    />
                    <TestimonialCard 
                        name="Emily C." 
                        title="HR Manager, Solutions Inc." 
                        avatarSrc="https://github.com/randomuser3.png" 
                        quote="Finding qualified staff was always a challenge until we partnered with Maven Brisk. They understood our needs and delivered top-tier candidates." 
                    />
                </div>
            </div>
        </motion.section>

        {/* --- Final CTA Section --- */}
        <section className="py-24">
            <div className="container mx-auto px-4 text-center">
                 <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeInUp}
                    className="max-w-2xl mx-auto"
                 >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Business?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Let's start a conversation about your goals. Contact us today for a personalized consultation and see how we can simplify your success.
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="px-10 py-6 text-lg">
                            Contact Us Today
                            <Send className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                 </motion.div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- Helper Sub-components for cleaner code (with types) ---
const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <Card className="bg-card/50 backdrop-blur-sm h-full">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-300">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ name, title, avatarSrc, quote }: { name: string; title: string; avatarSrc: string; quote: string; }) => (
    <motion.div variants={fadeInUp}>
        <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm">
            <CardContent className="pt-6 flex-grow">
                <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-muted-foreground italic">"{quote}"</p>
            </CardContent>
            <CardHeader className="flex flex-row items-center gap-4 pt-4">
                <Avatar>
                    <AvatarImage src={avatarSrc} alt={name} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-muted-foreground">{title}</p>
                </div>
            </CardHeader>
        </Card>
    </motion.div>
);

export default Index;