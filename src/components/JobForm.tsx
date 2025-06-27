// import { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
// import { CheckCircle, AlertCircle } from "lucide-react";

// interface JobFormProps {
//   userType: string | null;
// }

// // Helper component for displaying validation errors
// const FormError = ({ message }: { message?: string }) => {
//   if (!message) return null;
//   return (
//     <div className="flex items-center text-sm text-red-500 mt-1">
//       <AlertCircle className="w-4 h-4 mr-1" />
//       {message}
//     </div>
//   );
// };

// const JobForm = ({ userType }: JobFormProps) => {
//   const { toast } = useToast();
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // --- Formik & Yup Integration ---

//   // 1. Define the validation schema using Yup
//   const validationSchema = Yup.object().shape({
//     // Conditionally apply validation based on userType
//     ...(userType === "jobSeeker" ? {
//       jsFullName: Yup.string().required("Full Name is required"),
//       jsMobile: Yup.string()
//         .matches(/^\d{10,15}$/, "Must be a valid mobile number (10-15 digits)")
//         .required("Mobile Number is required"),
//       jsEmail: Yup.string().email("Invalid email address"),
//       jsCity: Yup.string().required("City is required"),
//       jsWorkExp: Yup.string().required("Please select your work experience status"),
//       // Conditional validation: these fields are required only if user has experience
//       jsFieldExp: Yup.string().when("jsWorkExp", {
//         is: "yes",
//         then: (schema) => schema.required("Field of experience is required"),
//       }),
//       jsYearsExp: Yup.number().when("jsWorkExp", {
//         is: "yes",
//         then: (schema) => schema.required("Years are required").min(0),
//       }),
//       jsMonthsExp: Yup.number().when("jsWorkExp", {
//         is: "yes",
//         then: (schema) => schema.required("Months are required").min(0).max(11),
//       }),
//       jsDaysExp: Yup.number().when("jsWorkExp", {
//         is: "yes",
//         then: (schema) => schema.required("Days are required").min(0).max(30),
//       }),
//       jsExpectedSalary: Yup.string().required("Expected Salary is required"),
//       jsJoinType: Yup.string().required("Please select if you want to join as a Worker or Intern"),
//       jsWhyWork: Yup.string().required("This field is required"),
//     } : {}),

//     ...(userType === "employer" ? {
//       emCompanyName: Yup.string().required("Company Name is required"),
//       emContactPerson: Yup.string().required("Contact Person is required"),
//       emMobile: Yup.string()
//         .matches(/^\d{10,15}$/, "Must be a valid mobile number (10-15 digits)")
//         .required("Mobile Number is required"),
//       emEmail: Yup.string().email("Invalid email address"),
//     } : {}),

//     // Common fields
//     agreeTerms: Yup.boolean()
//       .oneOf([true], "You must accept the terms and conditions")
//       .required(),
//   });

//   // 2. Initialize Formik using the useFormik hook
//   const formik = useFormik({
//     initialValues: {
//       // Job Seeker fields
//       jsFullName: "", jsMobile: "", jsEmail: "", jsDOB: "", jsCity: "", jsGender: "", jsQualification: "", jsSpecialization: "", jsUniversity: "", jsYearCompletion: "", jsMarks: "", jsSkills: "", jsWorkExp: "", jsFieldExp: "", jsYearsExp: "", jsMonthsExp: "", jsDaysExp: "", jsLastSalary: "", jsExpectedSalary: "", jsJoinType: "", jsWorkArrangement: "", jsWhyWork: "",
      
//       // Employer fields
//       emCompanyName: "", emContactPerson: "", emMobile: "", emEmail: "", emServices: [] as string[], emStaffRequired: "", emJobRoleDesc: "", emBudget: "", emStartDate: "", emComments: "",
      
//       // Common fields
//       heardFrom: "", agreeTerms: false,
      
//       // Add userType to the submitted data
//       userType: userType,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//     console.log("Form data to be sent:", values);
//     setSubmitting(true);

//     try {
//       // The API endpoint on your server
//       const API_URL = 'https://resonare-job-hub.onrender.com/api/submit-form';

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         // If the server responds with an error (e.g., status 500)
//         throw new Error(result.message || 'Something went wrong on the server.');
//       }

//       // If the submission was successful
//       console.log('Server response:', result);
//       toast({
//         title: "Form Submitted Successfully!",
//         description: "Thank you for your submission. We'll contact you soon.",
//       });
//       setIsSubmitted(true); // Show the thank you page
//       resetForm(); // Optional: clear the form fields

//     } catch (error: any) {
//       // If there's a network error or the server threw an error
//       console.error("Submission Error:", error);
//       toast({
//         title: "Submission Failed",
//         description: error.message || "Could not submit the form. Please check your connection and try again.",
//         variant: "destructive",
//       });
//     } finally {
//       // This will run whether the submission succeeded or failed
//       setSubmitting(false);
//     }
      
//       // Here you will later make your API call to the server
//       // For now, we just simulate a successful submission
      
//       setTimeout(() => {
//         setSubmitting(false);
//         setIsSubmitted(true);
//         toast({
//           title: "Form Submitted Successfully!",
//           description: "Thank you for your submission. We'll contact you soon.",
//         });
//       }, 500); // Simulate network delay
//     },
//   });

//   const handleServiceChange = (service: string, checked: boolean) => {
//     const currentServices = formik.values.emServices;
//     const newServices = checked
//       ? [...currentServices, service]
//       : currentServices.filter(s => s !== service);
//     formik.setFieldValue("emServices", newServices);
//   };

//   const getTodayDate = () => {
//     return new Date().toISOString().split('T')[0];
//   };

//   if (isSubmitted) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <Card className="max-w-2xl mx-auto text-center">
//           <CardContent className="pt-8">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
//             <h2 className="text-3xl font-bold text-green-600 mb-4">
//               धन्यवाद! (Thank You!)
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               आपका फॉर्म सफलतापूर्वक सबमिट हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।
//             </p>
//             <p className="text-sm text-muted-foreground mt-2">
//               Your form has been successfully submitted. Our team will contact you soon.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="max-w-4xl mx-auto">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             {userType === "jobSeeker" ? "Job Seeker Registration" : "Employer Registration"}
//           </CardTitle>
//           <p className="text-muted-foreground">
//             {userType === "jobSeeker" ? "नौकरी खोजने वाले का पंजीकरण" : "नियोजक का पंजीकरण"}
//           </p>
//         </CardHeader>
        
//         <CardContent>
//           {/* 3. Use formik.handleSubmit for the form's onSubmit event */}
//           <form onSubmit={formik.handleSubmit} className="space-y-8">
//             {userType === "jobSeeker" && (
//               <>
//                 {/* Personal Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold border-b border-border pb-2">Personal Information / व्यक्तिगत जानकारी</h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="jsFullName">Full Name (पूरा नाम) *</Label>
//                       <Input id="jsFullName" name="jsFullName" {...formik.getFieldProps('jsFullName')} />
//                       <FormError message={formik.touched.jsFullName ? formik.errors.jsFullName : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="jsMobile">Mobile Number (फोन नंबर) *</Label>
//                       <Input id="jsMobile" name="jsMobile" placeholder="Only digits, min 10 digits" maxLength={15} {...formik.getFieldProps('jsMobile')} />
//                       <FormError message={formik.touched.jsMobile ? formik.errors.jsMobile : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="jsEmail">Email Address (ईमेल पता)</Label>
//                       <Input id="jsEmail" name="jsEmail" type="email" placeholder="Optional" {...formik.getFieldProps('jsEmail')} />
//                       <FormError message={formik.touched.jsEmail ? formik.errors.jsEmail : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="jsDOB">Date of Birth (जन्म तिथि)</Label>
//                       <Input id="jsDOB" name="jsDOB" type="date" max={getTodayDate()} {...formik.getFieldProps('jsDOB')} />
//                     </div>
//                     <div>
//                       <Label htmlFor="jsCity">City (शहर) *</Label>
//                       <Input id="jsCity" name="jsCity" {...formik.getFieldProps('jsCity')} />
//                       <FormError message={formik.touched.jsCity ? formik.errors.jsCity : undefined} />
//                     </div>
//                   </div>
//                   <div>
//                     <Label>Gender (लिंग)</Label>
//                     <RadioGroup value={formik.values.jsGender} onValueChange={(value) => formik.setFieldValue("jsGender", value)} className="flex flex-wrap gap-4 mt-2">
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="Male" id="male" /><Label htmlFor="male">Male</Label></div>
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="Female" id="female" /><Label htmlFor="female">Female</Label></div>
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="other" /><Label htmlFor="other">Other</Label></div>
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="Prefer not to say" id="prefer-not" /><Label htmlFor="prefer-not">Prefer not to say</Label></div>
//                     </RadioGroup>
//                   </div>
//                 </div>

//                 {/* Education & Skills */}
//                 <div className="space-y-6">
//                    <h3 className="text-xl font-semibold border-b border-border pb-2">Education & Skills / शिक्षा और कौशल</h3>
//                    <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="jsQualification">Highest Qualification (उच्चतम योग्यता)</Label>
//                             <Select value={formik.values.jsQualification} onValueChange={(value) => formik.setFieldValue("jsQualification", value)}>
//                                 <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="10th">10th</SelectItem>
//                                     <SelectItem value="12th">12th</SelectItem>
//                                     <SelectItem value="Graduate">Graduate</SelectItem>
//                                     <SelectItem value="Postgraduate">Postgraduate</SelectItem>
//                                     <SelectItem value="Diploma">Diploma</SelectItem>
//                                     <SelectItem value="Other">Other</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div>
//                             <Label htmlFor="jsSpecialization">Specialization (विषय / विशेषज्ञता)</Label>
//                             <Input id="jsSpecialization" name="jsSpecialization" {...formik.getFieldProps('jsSpecialization')} />
//                         </div>
//                         <div>
//                             <Label htmlFor="jsUniversity">University / College (विश्वविद्यालय / कॉलेज का नाम)</Label>
//                             <Input id="jsUniversity" name="jsUniversity" {...formik.getFieldProps('jsUniversity')} />
//                         </div>
//                         <div>
//                             <Label htmlFor="jsYearCompletion">Year of Completion (उत्तीर्ण वर्ष)</Label>
//                             <Input id="jsYearCompletion" name="jsYearCompletion" maxLength={4} pattern="[0-9]{4}" {...formik.getFieldProps('jsYearCompletion')} />
//                         </div>
//                         <div className="md:col-span-2">
//                             <Label htmlFor="jsMarks">Marks / CGPA (प्राप्त अंक / सीजीपीए)</Label>
//                             <Input id="jsMarks" name="jsMarks" {...formik.getFieldProps('jsMarks')} />
//                         </div>
//                    </div>
//                    <div>
//                         <Label htmlFor="jsSkills">Skills (कौशल)</Label>
//                         <Textarea id="jsSkills" name="jsSkills" rows={3} {...formik.getFieldProps('jsSkills')} />
//                    </div>
//                 </div>

//                 {/* Work Experience */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold border-b border-border pb-2">Work Experience / कार्य अनुभव</h3>
//                   <div>
//                     <Label>Do you have work experience? (क्या आपके पास कार्य अनुभव है?) *</Label>
//                     <RadioGroup value={formik.values.jsWorkExp} onValueChange={(value) => formik.setFieldValue("jsWorkExp", value)} className="flex gap-4 mt-2">
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="exp-yes" /><Label htmlFor="exp-yes">Yes</Label></div>
//                       <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="exp-no" /><Label htmlFor="exp-no">No</Label></div>
//                     </RadioGroup>
//                     <FormError message={formik.touched.jsWorkExp ? formik.errors.jsWorkExp : undefined} />
//                   </div>

//                   {/* 4. Use formik.values to conditionally render UI */}
//                   {formik.values.jsWorkExp === 'yes' && (
//                     <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
//                       <div className="md:col-span-2">
//                         <Label htmlFor="jsFieldExp">Field of Experience (अनुभव का क्षेत्र) *</Label>
//                         <Input id="jsFieldExp" name="jsFieldExp" {...formik.getFieldProps('jsFieldExp')} />
//                         <FormError message={formik.touched.jsFieldExp ? formik.errors.jsFieldExp : undefined} />
//                       </div>
//                       <div>
//                         <Label htmlFor="jsYearsExp">Years of Experience (वर्ष) *</Label>
//                         <Input id="jsYearsExp" name="jsYearsExp" type="number" min="0" max="99" {...formik.getFieldProps('jsYearsExp')} />
//                          <FormError message={formik.touched.jsYearsExp ? formik.errors.jsYearsExp : undefined} />
//                       </div>
//                       <div>
//                         <Label htmlFor="jsMonthsExp">Months of Experience (महीने) *</Label>
//                         <Input id="jsMonthsExp" name="jsMonthsExp" type="number" min="0" max="11" {...formik.getFieldProps('jsMonthsExp')} />
//                          <FormError message={formik.touched.jsMonthsExp ? formik.errors.jsMonthsExp : undefined} />
//                       </div>
//                       <div>
//                         <Label htmlFor="jsDaysExp">Days of Experience (दिन) *</Label>
//                         <Input id="jsDaysExp" name="jsDaysExp" type="number" min="0" max="31" {...formik.getFieldProps('jsDaysExp')} />
//                          <FormError message={formik.touched.jsDaysExp ? formik.errors.jsDaysExp : undefined} />
//                       </div>
//                       <div>
//                         <Label htmlFor="jsLastSalary">Last Salary / Package (पिछली सैलरी / पैकेज)</Label>
//                         <Input id="jsLastSalary" name="jsLastSalary" {...formik.getFieldProps('jsLastSalary')} />
//                       </div>
//                     </div>
//                   )}
                  
//                   <div>
//                     <Label htmlFor="jsExpectedSalary">Expected Salary / Package (अपेक्षित सैलरी / पैकेज) *</Label>
//                     <Input id="jsExpectedSalary" name="jsExpectedSalary" {...formik.getFieldProps('jsExpectedSalary')} />
//                     <FormError message={formik.touched.jsExpectedSalary ? formik.errors.jsExpectedSalary : undefined} />
//                   </div>
//                 </div>

//                 {/* Job Preferences */}
//                 <div className="space-y-6">
//                     <h3 className="text-xl font-semibold border-b border-border pb-2">Job Preferences / नौकरी की प्राथमिकताएं</h3>
//                     <div>
//                         <Label>Join as Worker or Intern? (वर्कर या इंटर्न के रूप में जुड़ना चाहेंगे?) *</Label>
//                         <RadioGroup value={formik.values.jsJoinType} onValueChange={(value) => formik.setFieldValue("jsJoinType", value)} className="flex gap-4 mt-2">
//                             <div className="flex items-center space-x-2"><RadioGroupItem value="Worker" id="worker" /><Label htmlFor="worker">Worker</Label></div>
//                             <div className="flex items-center space-x-2"><RadioGroupItem value="Intern" id="intern" /><Label htmlFor="intern">Intern</Label></div>
//                         </RadioGroup>
//                         <FormError message={formik.touched.jsJoinType ? formik.errors.jsJoinType : undefined} />
//                     </div>
//                     <div>
//                         <Label htmlFor="jsWorkArrangement">What type of work arrangement are you looking for? (आप किस प्रकार के कार्य व्यवस्था की तलाश में हैं?)</Label>
//                         <Textarea id="jsWorkArrangement" name="jsWorkArrangement" rows={3} {...formik.getFieldProps('jsWorkArrangement')} />
//                     </div>
//                     <div>
//                         <Label htmlFor="jsWhyWork">Why do you want to work with us? (आप हमारे साथ क्यों काम करना चाहते हैं?) *</Label>
//                         <Textarea id="jsWhyWork" name="jsWhyWork" rows={3} {...formik.getFieldProps('jsWhyWork')} />
//                         <FormError message={formik.touched.jsWhyWork ? formik.errors.jsWhyWork : undefined} />
//                     </div>
//                 </div>
//               </>
//             )}

//             {userType === "employer" && (
//               <>
//                 {/* Company Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold border-b border-border pb-2">Company Information / कंपनी की जानकारी</h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="emCompanyName">Company / Client Name (कंपनी / क्लाइंट का नाम) *</Label>
//                       <Input id="emCompanyName" name="emCompanyName" {...formik.getFieldProps('emCompanyName')} />
//                       <FormError message={formik.touched.emCompanyName ? formik.errors.emCompanyName : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="emContactPerson">Contact Person Name (संपर्क व्यक्ति का नाम) *</Label>
//                       <Input id="emContactPerson" name="emContactPerson" {...formik.getFieldProps('emContactPerson')} />
//                       <FormError message={formik.touched.emContactPerson ? formik.errors.emContactPerson : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="emMobile">Mobile Number (फोन नंबर) *</Label>
//                       <Input id="emMobile" name="emMobile" placeholder="Only digits, min 10 digits" maxLength={15} {...formik.getFieldProps('emMobile')} />
//                       <FormError message={formik.touched.emMobile ? formik.errors.emMobile : undefined} />
//                     </div>
//                     <div>
//                       <Label htmlFor="emEmail">Email Address (ईमेल पता)</Label>
//                       <Input id="emEmail" name="emEmail" type="email" placeholder="Optional" {...formik.getFieldProps('emEmail')} />
//                       <FormError message={formik.touched.emEmail ? formik.errors.emEmail : undefined} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Service Requirements */}
//                 <div className="space-y-6">
//                     <h3 className="text-xl font-semibold border-b border-border pb-2">Service Requirements / सेवा आवश्यकताएं</h3>
//                     <div>
//                         <Label>Which service(s) do you need? (आपको कौन सी सेवा चाहिए?)</Label>
//                         <div className="grid md:grid-cols-2 gap-3 mt-3">
//                             {["Social Media Handling", "Model for Shoot", "Editing", "Graphic Designing", "Content Writing", "Photography", "Logo Designing", "Content Creating", "Meta Ads Services", "Content Management"].map((service) => (
//                                 <div key={service} className="flex items-center space-x-2">
//                                     <Checkbox id={service} checked={formik.values.emServices.includes(service)} onCheckedChange={(checked) => handleServiceChange(service, !!checked)} />
//                                     <Label htmlFor={service} className="text-sm">{service}</Label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="emStaffRequired">Number of staff required (if applicable)</Label>
//                             <Input id="emStaffRequired" name="emStaffRequired" {...formik.getFieldProps('emStaffRequired')} />
//                         </div>
//                         <div>
//                             <Label htmlFor="emBudget">Budget / Expected Package (बजट / अपेक्षित पैकेज)</Label>
//                             <Input id="emBudget" name="emBudget" {...formik.getFieldProps('emBudget')} />
//                         </div>
//                     </div>
//                     <div>
//                         <Label htmlFor="emJobRoleDesc">Job Role Description / Service Details (काम का विवरण)</Label>
//                         <Textarea id="emJobRoleDesc" name="emJobRoleDesc" rows={4} {...formik.getFieldProps('emJobRoleDesc')} />
//                     </div>
//                     <div>
//                         <Label htmlFor="emStartDate">Preferred Start Date (शुरू करने की तारीख)</Label>
//                         <Input id="emStartDate" name="emStartDate" type="date" min={getTodayDate()} {...formik.getFieldProps('emStartDate')} />
//                     </div>
//                     <div>
//                         <Label htmlFor="emComments">Additional Comments (अतिरिक्त टिप्पणी)</Label>
//                         <Textarea id="emComments" name="emComments" rows={3} {...formik.getFieldProps('emComments')} />
//                     </div>
//                 </div>
//               </>
//             )}

//             {/* Common Final Section */}
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold border-b border-border pb-2">Final Questions / अंतिम प्रश्न</h3>
//               <div>
//                 <Label>How did you hear about us? (आपने हमारे बारे में कैसे जाना?)</Label>
//                 <RadioGroup value={formik.values.heardFrom} onValueChange={(value) => formik.setFieldValue("heardFrom", value)} className="flex flex-wrap gap-4 mt-2">
//                   <div className="flex items-center space-x-2"><RadioGroupItem value="Instagram" id="instagram" /><Label htmlFor="instagram">Instagram</Label></div>
//                   <div className="flex items-center space-x-2"><RadioGroupItem value="Google" id="google" /><Label htmlFor="google">Google</Label></div>
//                   <div className="flex items-center space-x-2"><RadioGroupItem value="Friend/Reference" id="friend" /><Label htmlFor="friend">Friend/Reference</Label></div>
//                   <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="other-source" /><Label htmlFor="other-source">Other</Label></div>
//                 </RadioGroup>
//               </div>
//               <div className="items-start flex space-x-2">
//                 <Checkbox id="agreeTerms" name="agreeTerms" checked={formik.values.agreeTerms} onCheckedChange={(checked) => formik.setFieldValue("agreeTerms", !!checked)} />
//                 <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="agreeTerms" className="text-sm">मैं नियम और शर्तों से सहमत हूं और अपने डेटा के उपयोग के लिए सहमति देता हूं *</Label>
//                     <FormError message={formik.touched.agreeTerms ? formik.errors.agreeTerms : undefined} />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center pt-6">
//               <Button type="submit" size="lg" disabled={formik.isSubmitting} className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50">
//                 {formik.isSubmitting ? "Submitting..." : "Submit Form / फॉर्म जमा करें"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default JobForm;

///////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";

interface JobFormProps {
  userType: string | null;
}

// Helper component for displaying validation errors
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center text-sm text-red-500 mt-1">
      <AlertCircle className="w-4 h-4 mr-1" />
      {message}
    </div>
  );
};

const JobForm = ({ userType }: JobFormProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Formik & Yup Integration ---

  // 1. Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    // Conditionally apply validation based on userType
    ...(userType === "jobSeeker" ? {
      jsFullName: Yup.string().required("Full Name is required"),
      jsMobile: Yup.string()
        .matches(/^\d{10,15}$/, "Must be a valid mobile number (10-15 digits)")
        .required("Mobile Number is required"),
      jsEmail: Yup.string().email("Invalid email address"),
      jsCity: Yup.string().required("City is required"),
      jsWorkExp: Yup.string().required("Please select your work experience status"),
      // Conditional validation: these fields are required only if user has experience
      jsFieldExp: Yup.string().when("jsWorkExp", {
        is: "yes",
        then: (schema) => schema.required("Field of experience is required"),
      }),
      jsYearsExp: Yup.number().when("jsWorkExp", {
        is: "yes",
        then: (schema) => schema.required("Years are required").min(0),
      }),
      jsMonthsExp: Yup.number().when("jsWorkExp", {
        is: "yes",
        then: (schema) => schema.required("Months are required").min(0).max(11),
      }),
      jsDaysExp: Yup.number().when("jsWorkExp", {
        is: "yes",
        then: (schema) => schema.required("Days are required").min(0).max(30),
      }),
      jsExpectedSalary: Yup.string().required("Expected Salary is required"),
      jsJoinType: Yup.string().required("Please select if you want to join as a Worker or Intern"),
      jsWhyWork: Yup.string().required("This field is required"),
    } : {}),

    ...(userType === "employer" ? {
      emCompanyName: Yup.string().required("Company Name is required"),
      emContactPerson: Yup.string().required("Contact Person is required"),
      emMobile: Yup.string()
        .matches(/^\d{10,15}$/, "Must be a valid mobile number (10-15 digits)")
        .required("Mobile Number is required"),
      emEmail: Yup.string().email("Invalid email address"),
    } : {}),

    // Common fields
    // --- NEW VALIDATION LOGIC ---
    heardFromDetail: Yup.string().when("heardFrom", {
        is: (val: string) => val === "Friend/Reference" || val === "Other",
        then: (schema) => schema.required("Please provide the name or source."),
        otherwise: (schema) => schema.notRequired(),
    }),
    agreeTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
  });

  // 2. Initialize Formik using the useFormik hook
  const formik = useFormik({
    initialValues: {
      // Job Seeker fields
      jsFullName: "", jsMobile: "", jsEmail: "", jsDOB: "", jsCity: "", jsGender: "", jsQualification: "", jsSpecialization: "", jsUniversity: "", jsYearCompletion: "", jsMarks: "", jsSkills: "", jsWorkExp: "", jsFieldExp: "", jsYearsExp: "", jsMonthsExp: "", jsDaysExp: "", jsLastSalary: "", jsExpectedSalary: "", jsJoinType: "", jsWorkArrangement: "", jsWhyWork: "",
      
      // Employer fields
      emCompanyName: "", emContactPerson: "", emMobile: "", emEmail: "", emServices: [] as string[], emStaffRequired: "", emJobRoleDesc: "", emBudget: "", emStartDate: "", emComments: "",
      
      // Common fields
      heardFrom: "",
      // --- ADD NEW FIELD ---
      heardFromDetail: "", 
      agreeTerms: false,
      
      // Add userType to the submitted data
      userType: userType,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
    console.log("Form data to be sent:", values);
    setSubmitting(true);

    try {
      // The API endpoint on your server
      const API_URL = 'https://resonare-job-hub.onrender.com/api/submit-form';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        // If the server responds with an error (e.g., status 500)
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      // If the submission was successful
      console.log('Server response:', result);
      toast({
        title: "Form Submitted Successfully!",
        description: "Thank you for your submission. We'll contact you soon.",
      });
      setIsSubmitted(true); // Show the thank you page
      resetForm(); // Optional: clear the form fields

    } catch (error: any) {
      // If there's a network error or the server threw an error
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Could not submit the form. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      // This will run whether the submission succeeded or failed
      setSubmitting(false);
    }
    },
  });

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = formik.values.emServices;
    const newServices = checked
      ? [...currentServices, service]
      : currentServices.filter(s => s !== service);
    formik.setFieldValue("emServices", newServices);
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
            {userType === "jobSeeker" ? "नौकरी खोजने वाले का पंजीकरण" : "नियोजक का पंजीकरण"}
          </p>
        </CardHeader>
        
        <CardContent>
          {/* 3. Use formik.handleSubmit for the form's onSubmit event */}
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* The rest of your form remains the same... */}
            {userType === "jobSeeker" && (
              <>
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">Personal Information / व्यक्तिगत जानकारी</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jsFullName">Full Name (पूरा नाम) *</Label>
                      <Input id="jsFullName" name="jsFullName" {...formik.getFieldProps('jsFullName')} />
                      <FormError message={formik.touched.jsFullName ? formik.errors.jsFullName : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="jsMobile">Mobile Number (फोन नंबर) *</Label>
                      <Input id="jsMobile" name="jsMobile" placeholder="Only digits, min 10 digits" maxLength={15} {...formik.getFieldProps('jsMobile')} />
                      <FormError message={formik.touched.jsMobile ? formik.errors.jsMobile : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="jsEmail">Email Address (ईमेल पता)</Label>
                      <Input id="jsEmail" name="jsEmail" type="email" placeholder="Optional" {...formik.getFieldProps('jsEmail')} />
                      <FormError message={formik.touched.jsEmail ? formik.errors.jsEmail : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="jsDOB">Date of Birth (जन्म तिथि)</Label>
                      <Input id="jsDOB" name="jsDOB" type="date" max={getTodayDate()} {...formik.getFieldProps('jsDOB')} />
                    </div>
                    <div>
                      <Label htmlFor="jsCity">City (शहर) *</Label>
                      <Input id="jsCity" name="jsCity" {...formik.getFieldProps('jsCity')} />
                      <FormError message={formik.touched.jsCity ? formik.errors.jsCity : undefined} />
                    </div>
                  </div>
                  <div>
                    <Label>Gender (लिंग)</Label>
                    <RadioGroup value={formik.values.jsGender} onValueChange={(value) => formik.setFieldValue("jsGender", value)} className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="Male" id="male" /><Label htmlFor="male">Male</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="Female" id="female" /><Label htmlFor="female">Female</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="other" /><Label htmlFor="other">Other</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="Prefer not to say" id="prefer-not" /><Label htmlFor="prefer-not">Prefer not to say</Label></div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Education & Skills */}
                <div className="space-y-6">
                   <h3 className="text-xl font-semibold border-b border-border pb-2">Education & Skills / शिक्षा और कौशल</h3>
                   <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="jsQualification">Highest Qualification (उच्चतम योग्यता)</Label>
                            <Select value={formik.values.jsQualification} onValueChange={(value) => formik.setFieldValue("jsQualification", value)}>
                                <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
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
                            <Input id="jsSpecialization" name="jsSpecialization" {...formik.getFieldProps('jsSpecialization')} />
                        </div>
                        <div>
                            <Label htmlFor="jsUniversity">University / College (विश्वविद्यालय / कॉलेज का नाम)</Label>
                            <Input id="jsUniversity" name="jsUniversity" {...formik.getFieldProps('jsUniversity')} />
                        </div>
                        <div>
                            <Label htmlFor="jsYearCompletion">Year of Completion (उत्तीर्ण वर्ष)</Label>
                            <Input id="jsYearCompletion" name="jsYearCompletion" maxLength={4} pattern="[0-9]{4}" {...formik.getFieldProps('jsYearCompletion')} />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="jsMarks">Marks / CGPA (प्राप्त अंक / सीजीपीए)</Label>
                            <Input id="jsMarks" name="jsMarks" {...formik.getFieldProps('jsMarks')} />
                        </div>
                   </div>
                   <div>
                        <Label htmlFor="jsSkills">Skills (कौशल)</Label>
                        <Textarea id="jsSkills" name="jsSkills" rows={3} {...formik.getFieldProps('jsSkills')} />
                   </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">Work Experience / कार्य अनुभव</h3>
                  <div>
                    <Label>Do you have work experience? (क्या आपके पास कार्य अनुभव है?) *</Label>
                    <RadioGroup value={formik.values.jsWorkExp} onValueChange={(value) => formik.setFieldValue("jsWorkExp", value)} className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="exp-yes" /><Label htmlFor="exp-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="exp-no" /><Label htmlFor="exp-no">No</Label></div>
                    </RadioGroup>
                    <FormError message={formik.touched.jsWorkExp ? formik.errors.jsWorkExp : undefined} />
                  </div>

                  {formik.values.jsWorkExp === 'yes' && (
                    <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
                      <div className="md:col-span-2">
                        <Label htmlFor="jsFieldExp">Field of Experience (अनुभव का क्षेत्र) *</Label>
                        <Input id="jsFieldExp" name="jsFieldExp" {...formik.getFieldProps('jsFieldExp')} />
                        <FormError message={formik.touched.jsFieldExp ? formik.errors.jsFieldExp : undefined} />
                      </div>
                      <div>
                        <Label htmlFor="jsYearsExp">Years of Experience (वर्ष) *</Label>
                        <Input id="jsYearsExp" name="jsYearsExp" type="number" min="0" max="99" {...formik.getFieldProps('jsYearsExp')} />
                         <FormError message={formik.touched.jsYearsExp ? formik.errors.jsYearsExp : undefined} />
                      </div>
                      <div>
                        <Label htmlFor="jsMonthsExp">Months of Experience (महीने) *</Label>
                        <Input id="jsMonthsExp" name="jsMonthsExp" type="number" min="0" max="11" {...formik.getFieldProps('jsMonthsExp')} />
                         <FormError message={formik.touched.jsMonthsExp ? formik.errors.jsMonthsExp : undefined} />
                      </div>
                      <div>
                        <Label htmlFor="jsDaysExp">Days of Experience (दिन) *</Label>
                        <Input id="jsDaysExp" name="jsDaysExp" type="number" min="0" max="31" {...formik.getFieldProps('jsDaysExp')} />
                         <FormError message={formik.touched.jsDaysExp ? formik.errors.jsDaysExp : undefined} />
                      </div>
                      <div>
                        <Label htmlFor="jsLastSalary">Last Salary / Package (पिछली सैलरी / पैकेज)</Label>
                        <Input id="jsLastSalary" name="jsLastSalary" {...formik.getFieldProps('jsLastSalary')} />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="jsExpectedSalary">Expected Salary / Package (अपेक्षित सैलरी / पैकेज) *</Label>
                    <Input id="jsExpectedSalary" name="jsExpectedSalary" {...formik.getFieldProps('jsExpectedSalary')} />
                    <FormError message={formik.touched.jsExpectedSalary ? formik.errors.jsExpectedSalary : undefined} />
                  </div>
                </div>

                {/* Job Preferences */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b border-border pb-2">Job Preferences / नौकरी की प्राथमिकताएं</h3>
                    <div>
                        <Label>Join as Worker or Intern? (वर्कर या इंटर्न के रूप में जुड़ना चाहेंगे?) *</Label>
                        <RadioGroup value={formik.values.jsJoinType} onValueChange={(value) => formik.setFieldValue("jsJoinType", value)} className="flex gap-4 mt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Worker" id="worker" /><Label htmlFor="worker">Worker</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Intern" id="intern" /><Label htmlFor="intern">Intern</Label></div>
                        </RadioGroup>
                        <FormError message={formik.touched.jsJoinType ? formik.errors.jsJoinType : undefined} />
                    </div>
                    <div>
                        <Label htmlFor="jsWorkArrangement">What type of work arrangement are you looking for? (आप किस प्रकार के कार्य व्यवस्था की तलाश में हैं?)</Label>
                        <Textarea id="jsWorkArrangement" name="jsWorkArrangement" rows={3} {...formik.getFieldProps('jsWorkArrangement')} />
                    </div>
                    <div>
                        <Label htmlFor="jsWhyWork">Why do you want to work with us? (आप हमारे साथ क्यों काम करना चाहते हैं?) *</Label>
                        <Textarea id="jsWhyWork" name="jsWhyWork" rows={3} {...formik.getFieldProps('jsWhyWork')} />
                        <FormError message={formik.touched.jsWhyWork ? formik.errors.jsWhyWork : undefined} />
                    </div>
                </div>
              </>
            )}

            {userType === "employer" && (
              <>
                {/* Company Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold border-b border-border pb-2">Company Information / कंपनी की जानकारी</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emCompanyName">Company / Client Name (कंपनी / क्लाइंट का नाम) *</Label>
                      <Input id="emCompanyName" name="emCompanyName" {...formik.getFieldProps('emCompanyName')} />
                      <FormError message={formik.touched.emCompanyName ? formik.errors.emCompanyName : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="emContactPerson">Contact Person Name (संपर्क व्यक्ति का नाम) *</Label>
                      <Input id="emContactPerson" name="emContactPerson" {...formik.getFieldProps('emContactPerson')} />
                      <FormError message={formik.touched.emContactPerson ? formik.errors.emContactPerson : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="emMobile">Mobile Number (फोन नंबर) *</Label>
                      <Input id="emMobile" name="emMobile" placeholder="Only digits, min 10 digits" maxLength={15} {...formik.getFieldProps('emMobile')} />
                      <FormError message={formik.touched.emMobile ? formik.errors.emMobile : undefined} />
                    </div>
                    <div>
                      <Label htmlFor="emEmail">Email Address (ईमेल पता)</Label>
                      <Input id="emEmail" name="emEmail" type="email" placeholder="Optional" {...formik.getFieldProps('emEmail')} />
                      <FormError message={formik.touched.emEmail ? formik.errors.emEmail : undefined} />
                    </div>
                  </div>
                </div>

                {/* Service Requirements */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b border-border pb-2">Service Requirements / सेवा आवश्यकताएं</h3>
                    <div>
                        <Label>Which service(s) do you need? (आपको कौन सी सेवा चाहिए?)</Label>
                        <div className="grid md:grid-cols-2 gap-3 mt-3">
                            {["Social Media Handling", "Model for Shoot", "Editing", "Graphic Designing", "Content Writing", "Photography", "Logo Designing", "Content Creating", "Meta Ads Services", "Content Management"].map((service) => (
                                <div key={service} className="flex items-center space-x-2">
                                    <Checkbox id={service} checked={formik.values.emServices.includes(service)} onCheckedChange={(checked) => handleServiceChange(service, !!checked)} />
                                    <Label htmlFor={service} className="text-sm">{service}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="emStaffRequired">Number of staff required (if applicable)</Label>
                            <Input id="emStaffRequired" name="emStaffRequired" {...formik.getFieldProps('emStaffRequired')} />
                        </div>
                        <div>
                            <Label htmlFor="emBudget">Budget / Expected Package (बजट / अपेक्षित पैकेज)</Label>
                            <Input id="emBudget" name="emBudget" {...formik.getFieldProps('emBudget')} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="emJobRoleDesc">Job Role Description / Service Details (काम का विवरण)</Label>
                        <Textarea id="emJobRoleDesc" name="emJobRoleDesc" rows={4} {...formik.getFieldProps('emJobRoleDesc')} />
                    </div>
                    <div>
                        <Label htmlFor="emStartDate">Preferred Start Date (शुरू करने की तारीख)</Label>
                        <Input id="emStartDate" name="emStartDate" type="date" min={getTodayDate()} {...formik.getFieldProps('emStartDate')} />
                    </div>
                    <div>
                        <Label htmlFor="emComments">Additional Comments (अतिरिक्त टिप्पणी)</Label>
                        <Textarea id="emComments" name="emComments" rows={3} {...formik.getFieldProps('emComments')} />
                    </div>
                </div>
              </>
            )}

            {/* Common Final Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-border pb-2">Final Questions / अंतिम प्रश्न</h3>
              <div className="space-y-4">
                <Label>How did you hear about us? (आपने हमारे बारे में कैसे जाना?)</Label>
                <RadioGroup value={formik.values.heardFrom} onValueChange={(value) => formik.setFieldValue("heardFrom", value)} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Instagram" id="instagram" /><Label htmlFor="instagram">Instagram</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Google" id="google" /><Label htmlFor="google">Google</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Friend/Reference" id="friend" /><Label htmlFor="friend">Friend/Reference</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="other-source" /><Label htmlFor="other-source">Other</Label></div>
                </RadioGroup>

                {/* --- NEW CONDITIONAL INPUT FIELD --- */}
                {(formik.values.heardFrom === 'Friend/Reference' || formik.values.heardFrom === 'Other') && (
                    <div className="pt-2">
                        <Label htmlFor="heardFromDetail">
                            {formik.values.heardFrom === 'Friend/Reference' 
                                ? "Friend's Name / Reference (दोस्त का नाम / संदर्भ) *"
                                : "Please Specify (कृपया निर्दिष्ट करें) *"
                            }
                        </Label>
                        <Input 
                            id="heardFromDetail" 
                            name="heardFromDetail" 
                            {...formik.getFieldProps('heardFromDetail')}
                            placeholder={formik.values.heardFrom === 'Friend/Reference' ? "Enter friend's name" : "Enter platform or source"}
                        />
                        <FormError message={formik.touched.heardFromDetail ? formik.errors.heardFromDetail : undefined} />
                    </div>
                )}
              </div>
              <div className="items-start flex space-x-2">
                <Checkbox id="agreeTerms" name="agreeTerms" checked={formik.values.agreeTerms} onCheckedChange={(checked) => formik.setFieldValue("agreeTerms", !!checked)} />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="agreeTerms" className="text-sm">मैं नियम और शर्तों से सहमत हूं और अपने डेटा के उपयोग के लिए सहमति देता हूं *</Label>
                    <FormError message={formik.touched.agreeTerms ? formik.errors.agreeTerms : undefined} />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button type="submit" size="lg" disabled={formik.isSubmitting} className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50">
                {formik.isSubmitting ? "Submitting..." : "Submit Form / फॉर्म जमा करें"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;