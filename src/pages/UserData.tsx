// import { useState, useEffect, FormEvent } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter as DialogModalFooter } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader2, ServerCrash, User, Building, FileText, LogIn, ShieldAlert } from "lucide-react";

// // --- INTERFACE AND HELPER ---
// interface Submission {
//   _id: string; createdAt: string; userType: 'jobSeeker' | 'employer';
//   jsFullName?: string; jsMobile?: string; jsEmail?: string; jsDOB?: string; jsCity?: string; jsGender?: string; jsQualification?: string; jsSpecialization?: string; jsUniversity?: string; jsYearCompletion?: string; jsMarks?: string; jsSkills?: string; jsWorkExp?: string; jsFieldExp?: string; jsYearsExp?: string; jsMonthsExp?: string; jsDaysExp?: string; jsLastSalary?: string; jsExpectedSalary?: string; jsJoinType?: string; jsWorkArrangement?:string; jsWhyWork?: string;
//   emCompanyName?: string; emContactPerson?: string; emMobile?: string; emEmail?: string; emServices?: string[]; emStaffRequired?: string; emJobRoleDesc?: string; emBudget?: string; emStartDate?: string; emComments?: string;
//   heardFrom?: string;
// }

// const DetailItem = ({ label, value }: { label: string; value?: string | number | null }) => {
//   if (!value) return null;
//   return (
//     <div><p className="text-sm font-semibold text-muted-foreground">{label}</p><p className="text-md">{value}</p></div>
//   );
// };


// // --- AUTHENTICATION COMPONENT ---
// const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e: FormEvent) => {
//     e.preventDefault();
//     const correctUsername = import.meta.env.VITE_ADMIN_USERNAME;
//     const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

//     if (username === correctUsername && password === correctPassword) {
//       setError("");
//       onLoginSuccess();
//     } else {
//       setError("Invalid username or password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       <Card className="w-full max-w-sm">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Admin Access</CardTitle>
//           <CardDescription>Enter credentials to view submissions.</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleLogin}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
//             <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
//             {error && (<div className="flex items-center text-sm text-destructive"><ShieldAlert className="w-4 h-4 mr-2" />{error}</div>)}
//           </CardContent>
//           <CardFooter className="flex flex-col gap-4">
//             <Button type="submit" className="w-full"><LogIn className="mr-2 h-4 w-4" /> Sign In</Button>
//             <Link to="/" className="text-sm text-blue-600 hover:underline">← Go back to Home</Link>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };


// // --- DATA DISPLAY COMPONENT ---
// const SubmissionsDisplay = () => {
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         setLoading(true); setError(null);
//         const API_URL = 'https://resonare-job-hub.onrender.com/api/submissions';
//         const response = await fetch(API_URL);
//         if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.message || 'Failed to fetch data from the server.'); }
//         const data: Submission[] = await response.json();
//         setSubmissions(data);
//       } catch (err: any) { setError(err.message || 'An unknown error occurred.'); } 
//       finally { setLoading(false); }
//     };
//     fetchSubmissions();
//   }, []);

//   if (loading) { return <div className="flex justify-center items-center min-h-[60vh] flex-col gap-4"><Loader2 className="w-12 h-12 animate-spin text-primary" /><p className="text-lg text-muted-foreground">Loading Submissions...</p></div>; }
//   if (error) { return <div className="container mx-auto px-4 py-8 text-center text-destructive-foreground bg-destructive rounded-lg"><ServerCrash className="w-12 h-12 mx-auto" /><h2 className="text-2xl font-bold mt-4">Error Fetching Data</h2><p>{error}</p></div>; }
//   if (submissions.length === 0) { return <div className="text-center min-h-[60vh] flex flex-col justify-center items-center gap-4"><FileText className="w-16 h-16 text-muted-foreground" /><h2 className="text-2xl font-semibold">No Submissions Yet</h2><p className="text-muted-foreground">Once the form is submitted, the data will appear here.</p></div>; }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="relative flex items-center justify-center mb-4"><h1 className="text-3xl font-bold text-center">Form Submissions</h1><Link to="/" className="absolute right-4 text-blue-600 hover:underline">Go Home</Link></div>
//       <p className="text-center text-muted-foreground mb-8">Found {submissions.length} total entries.</p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {submissions.map((sub) => (
//           <Dialog key={sub._id}>
//             <DialogTrigger asChild>
//               <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200">
//                 <CardHeader>
//                   <div className="flex justify-between items-start gap-2">
//                     <div><CardTitle className="text-xl mb-1 line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</CardTitle><CardDescription className="line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsEmail : sub.emEmail}</CardDescription></div>
//                     <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'}>{sub.userType === 'jobSeeker' ? 'Job Seeker' : 'Employer'}</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {sub.userType === 'jobSeeker' ? (<div className="flex items-center text-sm text-muted-foreground"><User className="w-4 h-4 mr-2 flex-shrink-0" /> Wants to join as: <strong className="ml-1 font-semibold text-foreground">{sub.jsJoinType}</strong></div>) : (<div className="flex items-center text-sm text-muted-foreground"><Building className="w-4 h-4 mr-2 flex-shrink-0" /> Contact Person: <strong className="ml-1 font-semibold text-foreground">{sub.emContactPerson}</strong></div>)}
//                   <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">Submitted: {new Date(sub.createdAt).toLocaleDateString()}</p>
//                 </CardContent>
//               </Card>
//             </DialogTrigger>
//             <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</DialogTitle>
//                 <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'} className="w-fit">{sub.userType === 'jobSeeker' ? 'Job Seeker Submission' : 'Employer Submission'}</Badge>
//               </DialogHeader>
              
//               {/* --- FIX STARTS HERE --- */}
//               {/* This is the detailed view logic that was missing. I have pasted it back from your old component. */}
//               <div className="grid gap-6 py-4">
//                 {sub.userType === 'jobSeeker' ? (
//                   <>
//                     <section>
//                       <h3 className="font-bold text-lg border-b pb-2 mb-3">Personal Information</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         <DetailItem label="Full Name" value={sub.jsFullName} />
//                         <DetailItem label="Mobile" value={sub.jsMobile} />
//                         <DetailItem label="Email" value={sub.jsEmail} />
//                         <DetailItem label="City" value={sub.jsCity} />
//                         <DetailItem label="Date of Birth" value={sub.jsDOB} />
//                         <DetailItem label="Gender" value={sub.jsGender} />
//                       </div>
//                     </section>
//                     <section>
//                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Education & Skills</h3>
//                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                           <DetailItem label="Highest Qualification" value={sub.jsQualification} />
//                           <DetailItem label="Specialization" value={sub.jsSpecialization} />
//                           <DetailItem label="University" value={sub.jsUniversity} />
//                           <DetailItem label="Year of Completion" value={sub.jsYearCompletion} />
//                           <DetailItem label="Marks/CGPA" value={sub.jsMarks} />
//                        </div>
//                        <div className="mt-4"><DetailItem label="Skills" value={sub.jsSkills} /></div>
//                     </section>
//                     <section>
//                       <h3 className="font-bold text-lg border-b pb-2 mb-3">Work Experience</h3>
//                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                          <DetailItem label="Has Experience?" value={sub.jsWorkExp} />
//                          <DetailItem label="Experience Field" value={sub.jsFieldExp} />
//                          {sub.jsWorkExp === 'yes' && <DetailItem label="Duration" value={`${sub.jsYearsExp || 0}y ${sub.jsMonthsExp || 0}m ${sub.jsDaysExp || 0}d`} />}
//                          <DetailItem label="Last Salary" value={sub.jsLastSalary} />
//                          <DetailItem label="Expected Salary" value={sub.jsExpectedSalary} />
//                        </div>
//                     </section>
//                     <section>
//                       <h3 className="font-bold text-lg border-b pb-2 mb-3">Preferences & Other</h3>
//                        <div className="grid grid-cols-2 gap-4">
//                           <DetailItem label="Joining As" value={sub.jsJoinType} />
//                           <DetailItem label="Heard From" value={sub.heardFrom} />
//                        </div>
//                        <div className="mt-4"><DetailItem label="Work Arrangement" value={sub.jsWorkArrangement} /></div>
//                        <div className="mt-4"><DetailItem label="Why work with us?" value={sub.jsWhyWork} /></div>
//                     </section>
//                   </>
//                 ) : (
//                   <>
//                      <section>
//                         <h3 className="font-bold text-lg border-b pb-2 mb-3">Company Information</h3>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                           <DetailItem label="Company Name" value={sub.emCompanyName} />
//                           <DetailItem label="Contact Person" value={sub.emContactPerson} />
//                           <DetailItem label="Mobile" value={sub.emMobile} />
//                           <DetailItem label="Email" value={sub.emEmail} />
//                         </div>
//                      </section>
//                      <section>
//                         <h3 className="font-bold text-lg border-b pb-2 mb-3">Service Requirements</h3>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                            <DetailItem label="Staff Required" value={sub.emStaffRequired} />
//                            <DetailItem label="Budget" value={sub.emBudget} />
//                            <DetailItem label="Start Date" value={sub.emStartDate} />
//                            <DetailItem label="Heard From" value={sub.heardFrom} />
//                         </div>
//                         <div className="mt-4">
//                           <p className="text-sm font-semibold text-muted-foreground">Services Needed</p>
//                           {sub.emServices && sub.emServices.length > 0 ? (
//                              <div className="flex flex-wrap gap-2 mt-2">
//                               {sub.emServices.map(service => <Badge key={service} variant="outline">{service}</Badge>)}
//                              </div>
//                           ) : <p className="text-md">N/A</p>}
//                         </div>
//                         <div className="mt-4"><DetailItem label="Job/Service Description" value={sub.emJobRoleDesc} /></div>
//                         <div className="mt-4"><DetailItem label="Additional Comments" value={sub.emComments} /></div>
//                      </section>
//                   </>
//                 )}
//               </div>
//               {/* --- FIX ENDS HERE --- */}

//               <DialogModalFooter>
//                 <p className="text-xs text-muted-foreground mr-auto">Submission ID: {sub._id}</p>
//                 <p className="text-xs text-muted-foreground">Submitted On: {new Date(sub.createdAt).toLocaleString()}</p>
//               </DialogModalFooter>
//             </DialogContent>
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   );
// };


// // --- MAIN EXPORTED COMPONENT (The Gatekeeper) ---
// export default function UserData() {
//   const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
//   const handleLoginSuccess = () => {
//     sessionStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };
//   return isAuthenticated ? <SubmissionsDisplay /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />;
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter as DialogModalFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// ADDED Trash2 to the imports
import { Loader2, ServerCrash, User, Building, FileText, LogIn, ShieldAlert, Trash2 } from "lucide-react";

// --- INTERFACE AND HELPER (Unchanged) ---
interface Submission {
  _id: string; createdAt: string; userType: 'jobSeeker' | 'employer';
  jsFullName?: string; jsMobile?: string; jsEmail?: string; jsDOB?: string; jsCity?: string; jsGender?: string; jsQualification?: string; jsSpecialization?: string; jsUniversity?: string; jsYearCompletion?: string; jsMarks?: string; jsSkills?: string; jsWorkExp?: string; jsFieldExp?: string; jsYearsExp?: string; jsMonthsExp?: string; jsDaysExp?: string; jsLastSalary?: string; jsExpectedSalary?: string; jsJoinType?: string; jsWorkArrangement?:string; jsWhyWork?: string;
  emCompanyName?: string; emContactPerson?: string; emMobile?: string; emEmail?: string; emServices?: string[]; emStaffRequired?: string; emJobRoleDesc?: string; emBudget?: string; emStartDate?: string; emComments?: string;
  heardFrom?: string;
}

const DetailItem = ({ label, value }: { label: string; value?: string | number | null }) => {
  if (!value) return null;
  return (
    <div><p className="text-sm font-semibold text-muted-foreground">{label}</p><p className="text-md">{value}</p></div>
  );
};


// --- AUTHENTICATION COMPONENT (Unchanged) ---
const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const correctUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === correctUsername && password === correctPassword) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter credentials to view submissions.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            {error && (<div className="flex items-center text-sm text-destructive"><ShieldAlert className="w-4 h-4 mr-2" />{error}</div>)}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full"><LogIn className="mr-2 h-4 w-4" /> Sign In</Button>
            <Link to="/" className="text-sm text-blue-600 hover:underline">← Go back to Home</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};


// --- DATA DISPLAY COMPONENT (UPDATED) ---
const SubmissionsDisplay = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // --- NEW STATE for handling delete loading status ---
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true); setError(null);
        const API_URL = 'https://resonare-job-hub.onrender.com/api/submissions';
        const response = await fetch(API_URL);
        if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.message || 'Failed to fetch data from the server.'); }
        const data: Submission[] = await response.json();
        setSubmissions(data);
      } catch (err: any) { setError(err.message || 'An unknown error occurred.'); } 
      finally { setLoading(false); }
    };
    fetchSubmissions();
  }, []);

  // --- NEW: FUNCTION TO HANDLE DELETION ---
  const handleDelete = async (submissionId: string) => {
    // 1. Confirm with the user before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this submission? This action cannot be undone.");
    if (!isConfirmed) {
      return; // Stop if the user cancels
    }

    setDeletingId(submissionId); // Set loading state for the specific button
    try {
      const API_URL = `https://resonare-job-hub.onrender.com/api/submissions/${submissionId}`;
      const response = await fetch(API_URL, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete submission.');
      }

      // 2. If successful, remove the submission from the local state
      setSubmissions(currentSubmissions => 
        currentSubmissions.filter(sub => sub._id !== submissionId)
      );

    } catch (err: any) {
      console.error("Deletion Error:", err);
      alert(`Error: ${err.message}`); // Show error to the user
    } finally {
      setDeletingId(null); // Reset loading state
    }
  };

  if (loading) { return <div className="flex justify-center items-center min-h-[60vh] flex-col gap-4"><Loader2 className="w-12 h-12 animate-spin text-primary" /><p className="text-lg text-muted-foreground">Loading Submissions...</p></div>; }
  if (error) { return <div className="container mx-auto px-4 py-8 text-center text-destructive-foreground bg-destructive rounded-lg"><ServerCrash className="w-12 h-12 mx-auto" /><h2 className="text-2xl font-bold mt-4">Error Fetching Data</h2><p>{error}</p></div>; }
  if (submissions.length === 0) { return <div className="text-center min-h-[60vh] flex flex-col justify-center items-center gap-4"><FileText className="w-16 h-16 text-muted-foreground" /><h2 className="text-2xl font-semibold">No Submissions Yet</h2><p className="text-muted-foreground">Once the form is submitted, the data will appear here.</p></div>; }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative flex items-center justify-center mb-4"><h1 className="text-3xl font-bold text-center">Form Submissions</h1><Link to="/" className="absolute right-4 text-blue-600 hover:underline">Go Home</Link></div>
      <p className="text-center text-muted-foreground mb-8">Found {submissions.length} total entries.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((sub) => (
          <Dialog key={sub._id}>
            <DialogTrigger asChild>
              {/* Card preview is unchanged */}
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200">
                 <CardHeader>
                   <div className="flex justify-between items-start gap-2">
                     <div><CardTitle className="text-xl mb-1 line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</CardTitle><CardDescription className="line-clamp-1">{sub.user_type === 'jobSeeker' ? sub.jsEmail : sub.emEmail}</CardDescription></div>
                     <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'}>{sub.userType === 'jobSeeker' ? 'Job Seeker' : 'Employer'}</Badge>
                   </div>
                 </CardHeader>
                 <CardContent>
                   {sub.userType === 'jobSeeker' ? (<div className="flex items-center text-sm text-muted-foreground"><User className="w-4 h-4 mr-2 flex-shrink-0" /> Wants to join as: <strong className="ml-1 font-semibold text-foreground">{sub.jsJoinType}</strong></div>) : (<div className="flex items-center text-sm text-muted-foreground"><Building className="w-4 h-4 mr-2 flex-shrink-0" /> Contact Person: <strong className="ml-1 font-semibold text-foreground">{sub.emContactPerson}</strong></div>)}
                   <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">Submitted: {new Date(sub.createdAt).toLocaleDateString()}</p>
                 </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</DialogTitle>
                <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'} className="w-fit">{sub.userType === 'jobSeeker' ? 'Job Seeker Submission' : 'Employer Submission'}</Badge>
              </DialogHeader>
              
              {/* Detailed view content is unchanged */}
              <div className="grid gap-6 py-4">
                {sub.userType === 'jobSeeker' ? (
                  <>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Personal Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <DetailItem label="Full Name" value={sub.jsFullName} /> <DetailItem label="Mobile" value={sub.jsMobile} /> <DetailItem label="Email" value={sub.jsEmail} /> <DetailItem label="City" value={sub.jsCity} /> <DetailItem label="Date of Birth" value={sub.jsDOB} /> <DetailItem label="Gender" value={sub.jsGender} />
                      </div>
                    </section>
                    <section>
                       <h3 className="font-bold text-lg border-b pb-2 mb-3">Education & Skills</h3>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <DetailItem label="Highest Qualification" value={sub.jsQualification} /> <DetailItem label="Specialization" value={sub.jsSpecialization} /> <DetailItem label="University" value={sub.jsUniversity} /> <DetailItem label="Year of Completion" value={sub.jsYearCompletion} /> <DetailItem label="Marks/CGPA" value={sub.jsMarks} />
                       </div>
                       <div className="mt-4"><DetailItem label="Skills" value={sub.jsSkills} /></div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Work Experience</h3>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         <DetailItem label="Has Experience?" value={sub.jsWorkExp} /> <DetailItem label="Experience Field" value={sub.jsFieldExp} />
                         {sub.jsWorkExp === 'yes' && <DetailItem label="Duration" value={`${sub.jsYearsExp || 0}y ${sub.jsMonthsExp || 0}m ${sub.jsDaysExp || 0}d`} />}
                         <DetailItem label="Last Salary" value={sub.jsLastSalary} /> <DetailItem label="Expected Salary" value={sub.jsExpectedSalary} />
                       </div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Preferences & Other</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <DetailItem label="Joining As" value={sub.jsJoinType} /> <DetailItem label="Heard From" value={sub.heardFrom} />
                       </div>
                       <div className="mt-4"><DetailItem label="Work Arrangement" value={sub.jsWorkArrangement} /></div>
                       <div className="mt-4"><DetailItem label="Why work with us?" value={sub.jsWhyWork} /></div>
                    </section>
                  </>
                ) : (
                  <>
                     <section>
                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Company Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <DetailItem label="Company Name" value={sub.emCompanyName} /> <DetailItem label="Contact Person" value={sub.emContactPerson} /> <DetailItem label="Mobile" value={sub.emMobile} /> <DetailItem label="Email" value={sub.emEmail} />
                        </div>
                     </section>
                     <section>
                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Service Requirements</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           <DetailItem label="Staff Required" value={sub.emStaffRequired} /> <DetailItem label="Budget" value={sub.emBudget} /> <DetailItem label="Start Date" value={sub.emStartDate} /> <DetailItem label="Heard From" value={sub.heardFrom} />
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-muted-foreground">Services Needed</p>
                          {sub.emServices && sub.emServices.length > 0 ? (
                             <div className="flex flex-wrap gap-2 mt-2">{sub.emServices.map(service => <Badge key={service} variant="outline">{service}</Badge>)}</div>
                          ) : <p className="text-md">N/A</p>}
                        </div>
                        <div className="mt-4"><DetailItem label="Job/Service Description" value={sub.emJobRoleDesc} /></div>
                        <div className="mt-4"><DetailItem label="Additional Comments" value={sub.emComments} /></div>
                     </section>
                  </>
                )}
              </div>

              {/* --- FOOTER UPDATED WITH DELETE BUTTON --- */}
              <DialogModalFooter className="sm:justify-between items-center gap-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(sub._id)}
                  disabled={deletingId === sub._id} // Disable button while deleting this specific item
                >
                  {deletingId === sub._id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Submission ID: {sub._id}</p>
                  <p className="text-xs text-muted-foreground">Submitted On: {new Date(sub.createdAt).toLocaleString()}</p>
                </div>
              </DialogModalFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};


// --- MAIN EXPORTED COMPONENT (Unchanged) ---
export default function UserData() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  return isAuthenticated ? <SubmissionsDisplay /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}