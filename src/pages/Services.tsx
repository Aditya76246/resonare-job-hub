import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  Building, 
  Landmark, 
  Megaphone, 
  Banknote, 
  Target,
  CheckCircle2,
} from "lucide-react";
// 1. Import 'motion' AND the 'Variants' type
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
      staggerChildren: 0.1,
    },
  },
};

// Data extracted from the image, structured for easy mapping.
const servicesData = [
  {
    icon: <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Accounting Services",
    items: [
      "Bookkeeping & Financial Statements",
      "Tax Return Filing (ITR, GST, TDS)",
      "Payroll & Employee Management",
      "Budgeting & MIS Reports",
      "Internal Audits & Reconciliations",
    ],
  },
  {
    icon: <Building className="w-8 h-8 text-green-600 dark:text-green-400" />,
    title: "Office Staff Provision",
    items: [
      "Clerks, Receptionists & Assistants",
      "Data Entry Operators, HR, IT Staff",
      "Sales Executives & Field Staff",
      "Security & Admin Professionals",
      "Telecallers & Virtual Assistants",
    ],
  },
  {
    icon: <Landmark className="w-8 h-8 text-red-600 dark:text-red-400" />,
    title: "Taxation Services",
    items: [
      "Personal & Business Tax Filing",
      "GST & TDS Returns",
      "Advance Tax Support",
      "Tax Planning & Refund Tracking",
      "Digital Signature & PAN Support",
    ],
  },
  {
    icon: <Megaphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    title: "Branding & Digital Media",
    items: [
      "Social Media Management",
      "Creative Graphics & Logo Designing",
      "Smart Content Planning & Strategy",
      "Influencer & Page Collaboration",
      "Content Calendar Management",
    ],
  },
  {
    icon: <Banknote className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
    title: "Banking Help (SBI Only)",
    items: [
      "Account Opening (Savings/Current)",
      "Business Loan, OD, Credit Card Help",
      "e-KYC & Mobile Number Update",
      "Online & Mobile Banking Support",
      "Letter Drafting & Document Assistance",
    ],
  },
  {
    icon: <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Advertising & Content Management",
    items: [
      "Meta Ads Setup & Management",
      "Audience Targeting Campaigns",
      "Smart Content Planning & Strategy",
      "Influencer & Page Collaboration",
      "Content Calendar Management",
      "Analytics & Reporting",
    ],
  },
];

const whyChooseUsData = [
    "All-in-One Business Partner",
    "Personalized & Timely Support",
    "Creative & Corporate Expertise",
    "Transparent & Reliable Process"
];

export default function ServicesPage() {
  return (
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
              Our Comprehensive Services
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Simplifying Your Success with a full suite of business solutions tailored to your needs.
            </motion.p>
          </motion.div>

          {/* --- Section 2: Services Grid (Animated) --- */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg">{service.icon}</div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-muted-foreground">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* --- Section 3: Why Choose Us? (Animated) --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm shadow-xl">
              <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                variants={staggerContainer}
              >
                  {whyChooseUsData.map((reason, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className="flex items-center gap-4 p-4 border rounded-lg bg-card/30"
                      >
                          <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="font-medium text-foreground">{reason}</p>
                      </motion.div>
                  ))}
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}