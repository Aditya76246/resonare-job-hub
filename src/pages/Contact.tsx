import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Linkedin,
  Twitter,
  Facebook
} from "lucide-react";
// 1. Import 'motion' AND the 'Variants' type
import { motion, Variants } from "framer-motion";
import React from "react"; // Import React for typing the helper component

// --- Reusable Animation Variants for Framer Motion ---

// 2. Add the `: Variants` type annotation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// 3. Add the `: Variants` type annotation
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ContactPage() {
  return (
    // Main layout with animated background
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-x-hidden">
      <Header />

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-16">
          
          {/* --- Section 1: Hero Introduction (Animated) --- */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </motion.p>
          </motion.div>

          {/* --- Section 2: Contact Form & Info Grid (Animated) --- */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            
            {/* Contact Information Card */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur-sm p-4 h-full shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ContactInfoItem icon={<MapPin className="w-6 h-6" />} title="Our Office" details="123 Business Avenue, Suite 456<br />Innovation City, ST 78910" />
                  <ContactInfoItem icon={<Mail className="w-6 h-6" />} title="Email Us" details="contact@mavenbrisk.com" />
                  <ContactInfoItem icon={<Phone className="w-6 h-6" />} title="Call Us" details="+1 (555) 123-4567" />
                  <ContactInfoItem icon={<Clock className="w-6 h-6" />} title="Business Hours" details="Monday - Friday: 9:00 AM - 6:00 PM" />

                  {/* Social Media Links */}
                  <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold mb-3">Follow Us</h3>
                      <div className="flex items-center gap-4">
                          <motion.a href="#" whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }} className="text-muted-foreground"><Twitter className="w-6 h-6" /></motion.a>
                          <motion.a href="#" whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }} className="text-muted-foreground"><Facebook className="w-6 h-6" /></motion.a>
                          <motion.a href="#" whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }} className="text-muted-foreground"><Linkedin className="w-6 h-6" /></motion.a>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-card/50 backdrop-blur-sm p-4 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="John Doe" /></div>
                      <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="john.doe@example.com" /></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" placeholder="e.g., Service Inquiry" /></div>
                    <div className="space-y-2"><Label htmlFor="message">Your Message</Label><Textarea id="message" placeholder="Type your message here..." rows={5} /></div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full" size="lg">
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* --- Section 3: Map (Animated) --- */}
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.22557539824!2d-122.4217203846816!3d37.78336997975768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0x4cb4987217316757!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1678886543210!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location"
            ></iframe>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Helper component for contact info items with added prop types
const ContactInfoItem = ({ icon, title, details }: { icon: React.ReactNode; title: string; details: string; }) => (
  <motion.div 
    className="flex items-start gap-4"
    whileHover={{ scale: 1.05, x: 5, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
  >
    <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: details }}></p>
    </div>
  </motion.div>
);