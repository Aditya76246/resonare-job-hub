import { useState } from "react";
import JobForm from "@/components/JobForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, ArrowRight } from "lucide-react";
// 1. Import 'motion' AND the 'Variants' type from framer-motion
import { motion, Variants } from "framer-motion";

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

const CareerPage = () => {
  const [userType, setUserType] = useState<string | null>(null);

  const handleBackToSelection = () => {
    setUserType(null);
  };

  // If a user type has been selected, show the JobForm
  if (userType) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <Header onBackToSelection={handleBackToSelection} />
        <main className="flex-1">
          <JobForm userType={userType} />
        </main>
        <Footer />
      </div>
    );
  }

  // If no user type is selected, show the selection cards with animations
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-x-hidden">
      <Header />

      {/* Animated Background Blobs for consistency */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
            >
                आप किस रूप में हैं? (Who are you?)
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Job Seeker Card with Motion */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                  onClick={() => setUserType('jobSeeker')}
                  className="group cursor-pointer"
                >
                  <Card className="h-full transition-all duration-300 shadow-lg hover:shadow-2xl border-2 hover:border-blue-500 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Users className="w-10 h-10 text-white" />
                          </div>
                          <CardTitle className="text-2xl font-bold text-foreground">Job Seeker</CardTitle>
                          <CardDescription className="text-lg">नौकरी खोजने वाला</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                              Looking for your next career opportunity? Join our platform to connect with top employers.
                          </p>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg pointer-events-none">
                              Get Started as Job Seeker
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                      </CardContent>
                  </Card>
                </motion.div>

                {/* Employer Card with Motion */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                  onClick={() => setUserType('employer')}
                  className="group cursor-pointer"
                >
                  <Card className="h-full transition-all duration-300 shadow-lg hover:shadow-2xl border-2 hover:border-purple-500 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Building2 className="w-10 h-10 text-white" />
                          </div>
                          <CardTitle className="text-2xl font-bold text-foreground">Employer</CardTitle>
                          <CardDescription className="text-lg">नौकरी देने वाला</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                              Need talented professionals for your business? Post your requirements and connect with skilled candidates.
                          </p>
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg pointer-events-none">
                              Get Started as Employer
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                      </CardContent>
                  </Card>
                </motion.div>
            </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerPage;