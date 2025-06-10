
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobForm from "@/components/JobForm";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleBackToHome = () => {
    setShowForm(false);
    setSelectedType(null);
  };

  if (showForm) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <Header onBackToHome={handleBackToHome} />
        <main className="flex-1">
          <JobForm userType={selectedType} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            A MAVEN BRISK RESONATE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Connect talented professionals with amazing opportunities. 
            Whether you're seeking your dream job or looking for the perfect candidate, 
            we're here to make it happen.
          </p>
        </div>

        {/* User Type Selection Cards */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-foreground">
            आप किस रूप में हैं? (Who are you?)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Seeker Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-blue-500 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Job Seeker
                </CardTitle>
                <CardDescription className="text-lg">
                  नौकरी खोजने वाला
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Looking for your next career opportunity? Join our platform to connect with 
                  top employers and find the perfect job that matches your skills and aspirations.
                </p>
                <Button 
                  onClick={() => handleTypeSelection('jobSeeker')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                >
                  Get Started as Job Seeker
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Employer Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-purple-500 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Employer
                </CardTitle>
                <CardDescription className="text-lg">
                  नौकरी देने वाला
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Need talented professionals for your business? Post your requirements and 
                  connect with skilled candidates who can help grow your organization.
                </p>
                <Button 
                  onClick={() => handleTypeSelection('employer')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                >
                  Get Started as Employer
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border">
              <h4 className="font-semibold text-lg mb-2 text-foreground">Quick & Easy</h4>
              <p className="text-muted-foreground">Simple registration process to get you started in minutes</p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border">
              <h4 className="font-semibold text-lg mb-2 text-foreground">Perfect Matches</h4>
              <p className="text-muted-foreground">Advanced matching algorithm to connect the right people</p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border">
              <h4 className="font-semibold text-lg mb-2 text-foreground">Trusted Platform</h4>
              <p className="text-muted-foreground">Secure and reliable platform trusted by thousands</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
