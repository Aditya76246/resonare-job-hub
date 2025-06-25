import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Goal, Eye, Handshake, Lightbulb, Users, Zap } from "lucide-react";
// 1. Import 'motion' AND the 'Variants' type from framer-motion
import { motion, Variants } from "framer-motion";

// --- Reusable Animation Variants for Framer Motion ---

// 2. Add the `: Variants` type annotation here
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// 3. And add the `: Variants` type annotation here
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    // Main layout with animated background blobs for consistency
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-x-hidden">
      <Header />

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Main content area */}
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-16">

          {/* --- Section 1: Hero Introduction (Animated) --- */}
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            >
              About Maven Brisk
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We're not just a service provider; we are your strategic partner in success. We blend expertise with dedication to simplify your business journey.
            </motion.p>
          </motion.div>

          <div className="space-y-20">
            {/* --- Section 2: Our Story (Animated) --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm shadow-xl">
                <h2 className="text-3xl font-semibold text-center mb-6">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                  Founded in 2023, Maven Brisk was born from a simple yet powerful idea: to create a single, reliable hub for all essential business services. We saw entrepreneurs and companies juggling multiple vendors for accounting, staffing, and marketing, and we knew there was a better way. We set out to build an all-in-one platform built on trust, efficiency, and a shared passion for growth.
                </p>
              </Card>
            </motion.div>

            {/* --- Section 3: Our Mission & Vision (Animated) --- */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="h-full bg-card/60">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Goal className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To empower businesses by providing seamless, integrated, and expert-led services, allowing them to focus on their core purpose and achieve sustainable growth.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="h-full bg-card/60">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To be the most trusted and indispensable all-in-one business partner, recognized for our commitment to client success and operational excellence.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* --- Section 4: Our Core Values (Animated) --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <h2 className="text-3xl font-semibold text-center mb-10">Our Core Values</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ValueCard icon={<Handshake />} title="Integrity" text="Operating with honesty and transparency in all we do." />
                <ValueCard icon={<Users />} title="Client-Centric" text="Prioritizing the needs and success of our clients above all." />
                <ValueCard icon={<Lightbulb />} title="Innovation" text="Continuously improving our services to deliver the best results." />
                <ValueCard icon={<Zap />} title="Excellence" text="Committing to the highest standards of quality and professionalism." />
              </div>
            </motion.div>

            {/* --- Section 5: Meet The Team (Animated) --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <h2 className="text-3xl font-semibold text-center mb-10">Meet Our Leaders</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                <TeamMemberCard name="Jane Doe" title="Founder & CEO" avatarSrc="https://github.com/shadcn.png" />
                <TeamMemberCard name="John Smith" title="Head of Technology" avatarSrc="https://github.com/randomuser2.png" />
                <TeamMemberCard name="Alex Smith" title="Head of Client Relations" avatarSrc="https://github.com/randomuser3.png" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- Helper Sub-components for cleaner, reusable code ---

const ValueCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <motion.div variants={fadeInUp}>
    <Card className="text-center p-6 h-full bg-card/30 backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{text}</p>
    </Card>
  </motion.div>
);

const TeamMemberCard = ({ name, title, avatarSrc }: { name: string, title: string, avatarSrc: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
  >
    <Card className="text-center p-6 bg-card/60">
      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-primary font-medium">{title}</p>
    </Card>
  </motion.div>
);