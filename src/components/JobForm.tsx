
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

import {TextField, Box} from "@mui/material";

interface JobFormProps {
  userType: string | null;
}

const JobForm = ({ userType }: JobFormProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Job Seeker fields
    jsFullName: "",
    jsMobile: "",
    jsEmail: "",
    jsDOB: "",
    jsCity: "",
    jsGender: "",
    jsQualification: "",
    jsSpecialization: "",
    jsUniversity: "",
    jsYearCompletion: "",
    jsMarks: "",
    jsSkills: "",
    jsWorkExp: "",
    jsFieldExp: "",
    jsYearsExp: "",
    jsMonthsExp: "",
    jsDaysExp: "",
    jsLastSalary: "",
    jsExpectedSalary: "",
    jsJoinType: "",
    jsWorkArrangement: "",
    jsWhyWork: "",
    
    // Employer fields
    emCompanyName: "",
    emContactPerson: "",
    emMobile: "",
    emEmail: "",
    emServices: [] as string[],
    emStaffRequired: "",
    emJobRoleDesc: "",
    emBudget: "",
    emStartDate: "",
    emComments: "",
    
    // Common fields
    heardFrom: "",
    agreeTerms: false,
  });

  const [showWorkExpDetails, setShowWorkExpDetails] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "jsWorkExp") {
      setShowWorkExpDetails(value === "yes");
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      emServices: checked 
        ? [...prev.emServices, service]
        : prev.emServices.filter(s => s !== service)
    }));
  };

  const validateMobile = (mobile: string) => {
    return /^\d{10,15}$/.test(mobile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (userType === "jobSeeker") {
      if (!formData.jsFullName || !formData.jsMobile || !formData.jsCity || !formData.jsWorkExp || !formData.jsJoinType || !formData.jsWhyWork) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateMobile(formData.jsMobile)) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid mobile number with 10-15 digits",
          variant: "destructive",
        });
        return;
      }
    } else if (userType === "employer") {
      if (!formData.emCompanyName || !formData.emContactPerson || !formData.emMobile) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateMobile(formData.emMobile)) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid mobile number with 10-15 digits",
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    toast({
      title: "Form Submitted Successfully!",
      description: "Thank you for your submission. We'll contact you soon.",
    });
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              धन्यवाद! (Thank You!)
            </h2>
            <p className="text-lg text-muted-foreground">
              आपका फॉर्म सफलतापूर्वक सबमिट हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your form has been successfully submitted. Our team will contact you soon.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {userType === "jobSeeker" ? "Job Seeker Registration" : "Employer Registration"}
          </CardTitle>
          <p className="text-muted-foreground">
            {userType === "jobSeeker" 
              ? "नौकरी खोजने वाले का पंजीकरण" 
              : "नियोजक का पंजीकरण"
            }
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {userType === "jobSeeker" && (
              <>
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Personal Information / व्यक्तिगत जानकारी
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jsFullName">Full Name (पूरा नाम) *</Label>
                      <Input
                        id="jsFullName"
                        value={formData.jsFullName}
                        onChange={(e) => handleInputChange("jsFullName", e.target.value)}
                        required
                        />
                    </div>
                    <div>
                      <Label htmlFor="jsMobile">Mobile Number (फोन नंबर) *</Label>
                      <Input
                        id="jsMobile"
                        value={formData.jsMobile}
                        onChange={(e) => handleInputChange("jsMobile", e.target.value.replace(/\D/g, ''))}
                        placeholder="Only digits, min 10 digits"
                        maxLength={15}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsEmail">Email Address (ईमेल पता)</Label>
                      <Input
                        id="jsEmail"
                        type="email"
                        value={formData.jsEmail}
                        onChange={(e) => handleInputChange("jsEmail", e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsDOB">Date of Birth (जन्म तिथि)</Label>
                      <Input
                        id="jsDOB"
                        type="date"
                        value={formData.jsDOB}
                        onChange={(e) => handleInputChange("jsDOB", e.target.value)}
                        max={getTodayDate()}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsCity">City (शहर) *</Label>
                      <Input
                        id="jsCity"
                        value={formData.jsCity}
                        onChange={(e) => handleInputChange("jsCity", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Gender (लिंग)</Label>
                    <RadioGroup
                      value={formData.jsGender}
                      onValueChange={(value) => handleInputChange("jsGender", value)}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Prefer not to say" id="prefer-not" />
                        <Label htmlFor="prefer-not">Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Education & Skills */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Education & Skills / शिक्षा और कौशल
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jsQualification">Highest Qualification (उच्चतम योग्यता)</Label>
                      <Select value={formData.jsQualification} onValueChange={(value) => handleInputChange("jsQualification", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th</SelectItem>
                          <SelectItem value="12th">12th</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                          <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="jsSpecialization">Specialization (विषय / विशेषज्ञता)</Label>
                      <Input
                        id="jsSpecialization"
                        value={formData.jsSpecialization}
                        onChange={(e) => handleInputChange("jsSpecialization", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsUniversity">University / College (विश्वविद्यालय / कॉलेज का नाम)</Label>
                      <Input
                        id="jsUniversity"
                        value={formData.jsUniversity}
                        onChange={(e) => handleInputChange("jsUniversity", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsYearCompletion">Year of Completion (उत्तीर्ण वर्ष)</Label>
                      <Input
                        id="jsYearCompletion"
                        value={formData.jsYearCompletion}
                        onChange={(e) => handleInputChange("jsYearCompletion", e.target.value)}
                        maxLength={4}
                        pattern="[0-9]{4}"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="jsMarks">Marks / CGPA (प्राप्त अंक / सीजीपीए)</Label>
                      <Input
                        id="jsMarks"
                        value={formData.jsMarks}
                        onChange={(e) => handleInputChange("jsMarks", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="jsSkills">Skills (कौशल)</Label>
                    <Textarea
                      id="jsSkills"
                      value={formData.jsSkills}
                      onChange={(e) => handleInputChange("jsSkills", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Work Experience / कार्य अनुभव
                  </h3>
                  
                  <div>
                    <Label>Do you have work experience? (क्या आपके पास कार्य अनुभव है?) *</Label>
                    <RadioGroup
                      value={formData.jsWorkExp}
                      onValueChange={(value) => handleInputChange("jsWorkExp", value)}
                      className="flex gap-4 mt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="exp-yes" />
                        <Label htmlFor="exp-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="exp-no" />
                        <Label htmlFor="exp-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {showWorkExpDetails && (
                    <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
                      <div className="md:col-span-2">
                        <Label htmlFor="jsFieldExp">Field of Experience (अनुभव का क्षेत्र) *</Label>
                        <Input
                          id="jsFieldExp"
                          value={formData.jsFieldExp}
                          onChange={(e) => handleInputChange("jsFieldExp", e.target.value)}
                          required={showWorkExpDetails}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="jsYearsExp">Years of Experience (वर्ष) *</Label>
                        <Input
                          id="jsYearsExp"
                          type="number"
                          min="0"
                          max="99"
                          value={formData.jsYearsExp}
                          onChange={(e) => handleInputChange("jsYearsExp", e.target.value)}
                          required={showWorkExpDetails}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="jsMonthsExp">Months of Experience (महीने) *</Label>
                        <Input
                          id="jsMonthsExp"
                          type="number"
                          min="0"
                          max="11"
                          value={formData.jsMonthsExp}
                          onChange={(e) => handleInputChange("jsMonthsExp", e.target.value)}
                          required={showWorkExpDetails}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="jsDaysExp">Days of Experience (दिन) *</Label>
                        <Input
                          id="jsDaysExp"
                          type="number"
                          min="0"
                          max="31"
                          value={formData.jsDaysExp}
                          onChange={(e) => handleInputChange("jsDaysExp", e.target.value)}
                          required={showWorkExpDetails}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="jsLastSalary">Last Salary / Package (पिछली सैलरी / पैकेज)</Label>
                        <Input
                          id="jsLastSalary"
                          value={formData.jsLastSalary}
                          onChange={(e) => handleInputChange("jsLastSalary", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="jsExpectedSalary">Expected Salary / Package (अपेक्षित सैलरी / पैकेज) *</Label>
                    <Input
                      id="jsExpectedSalary"
                      value={formData.jsExpectedSalary}
                      onChange={(e) => handleInputChange("jsExpectedSalary", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Job Preferences */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Job Preferences / नौकरी की प्राथमिकताएं
                  </h3>
                  
                  <div>
                    <Label>Join as Worker or Intern? (वर्कर या इंटर्न के रूप में जुड़ना चाहेंगे?) *</Label>
                    <RadioGroup
                      value={formData.jsJoinType}
                      onValueChange={(value) => handleInputChange("jsJoinType", value)}
                      className="flex gap-4 mt-2"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Worker" id="worker" />
                        <Label htmlFor="worker">Worker</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Intern" id="intern" />
                        <Label htmlFor="intern">Intern</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="jsWorkArrangement">What type of work arrangement are you looking for? (आप किस प्रकार के कार्य व्यवस्था की तलाश में हैं?)</Label>
                    <Textarea
                      id="jsWorkArrangement"
                      value={formData.jsWorkArrangement}
                      onChange={(e) => handleInputChange("jsWorkArrangement", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jsWhyWork">Why do you want to work with us? (आप हमारे साथ क्यों काम करना चाहते हैं?) *</Label>
                    <Textarea
                      id="jsWhyWork"
                      value={formData.jsWhyWork}
                      onChange={(e) => handleInputChange("jsWhyWork", e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {userType === "employer" && (
              <>
                {/* Company Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Company Information / कंपनी की जानकारी
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emCompanyName">Company / Client Name (कंपनी / क्लाइंट का नाम) *</Label>
                      <Input
                        id="emCompanyName"
                        value={formData.emCompanyName}
                        onChange={(e) => handleInputChange("emCompanyName", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emContactPerson">Contact Person Name (संपर्क व्यक्ति का नाम) *</Label>
                      <Input
                        id="emContactPerson"
                        value={formData.emContactPerson}
                        onChange={(e) => handleInputChange("emContactPerson", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emMobile">Mobile Number (फोन नंबर) *</Label>
                      <Input
                        id="emMobile"
                        value={formData.emMobile}
                        onChange={(e) => handleInputChange("emMobile", e.target.value.replace(/\D/g, ''))}
                        placeholder="Only digits, min 10 digits"
                        maxLength={15}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emEmail">Email Address (ईमेल पता)</Label>
                      <Input
                        id="emEmail"
                        type="email"
                        value={formData.emEmail}
                        onChange={(e) => handleInputChange("emEmail", e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Requirements */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">
                    Service Requirements / सेवा आवश्यकताएं
                  </h3>
                  
                  <div>
                    <Label>Which service(s) do you need? (आपको कौन सी सेवा चाहिए?)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {[
                        "Social Media Handling",
                        "Model for Shoot",
                        "Editing",
                        "Graphic Designing",
                        "Content Writing",
                        "Photography",
                        "Logo Designing",
                        "Content Creating",
                        "Meta Ads Services",
                        "Content Management"
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.emServices.includes(service)}
                            onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
                          />
                          <Label htmlFor={service} className="text-sm">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emStaffRequired">Number of staff required (if applicable)</Label>
                      <Input
                        id="emStaffRequired"
                        value={formData.emStaffRequired}
                        onChange={(e) => handleInputChange("emStaffRequired", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emBudget">Budget / Expected Package (बजट / अपेक्षित पैकेज)</Label>
                      <Input
                        id="emBudget"
                        value={formData.emBudget}
                        onChange={(e) => handleInputChange("emBudget", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="emJobRoleDesc">Job Role Description / Service Details (काम का विवरण)</Label>
                    <Textarea
                      id="emJobRoleDesc"
                      value={formData.emJobRoleDesc}
                      onChange={(e) => handleInputChange("emJobRoleDesc", e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emStartDate">Preferred Start Date (शुरू करने की तारीख)</Label>
                    <Input
                      id="emStartDate"
                      type="date"
                      value={formData.emStartDate}
                      onChange={(e) => handleInputChange("emStartDate", e.target.value)}
                      max={getTodayDate()}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emComments">Additional Comments (अतिरिक्त टिप्पणी)</Label>
                    <Textarea
                      id="emComments"
                      value={formData.emComments}
                      onChange={(e) => handleInputChange("emComments", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common Final Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-border pb-2">
                Final Questions / अंतिम प्रश्न
              </h3>
              
              <div>
                <Label>How did you hear about us? (आपने हमारे बारे में कैसे जाना?)</Label>
                <RadioGroup
                  value={formData.heardFrom}
                  onValueChange={(value) => handleInputChange("heardFrom", value)}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Instagram" id="instagram" />
                    <Label htmlFor="instagram">Instagram</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Google" id="google" />
                    <Label htmlFor="google">Google</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Friend/Reference" id="friend" />
                    <Label htmlFor="friend">Friend/Reference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other-source" />
                    <Label htmlFor="other-source">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                  required
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  मैं नियम और शर्तों से सहमत हूं और अपने डेटा के उपयोग के लिए सहमति देता हूं *
                </Label>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                size="lg"
                className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Submit Form / फॉर्म जमा करें
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;
