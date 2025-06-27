import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import * as XLSX from 'xlsx';

// Import your shared components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import UI components from shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter as DialogModalFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Import icons from lucide-react
import { Loader2, ServerCrash, User, Building, FileText, LogIn, ShieldAlert, Trash2, Search, ListFilter, Download, Calendar, X } from "lucide-react";

// --- INTERFACES & ANIMATION VARIANTS ---
interface Submission {
  _id: string; createdAt: string; userType: 'jobSeeker' | 'employer';
  jsFullName?: string; jsMobile?: string; jsEmail?: string; jsDOB?: string; jsCity?: string; jsGender?: string; jsQualification?: string; jsSpecialization?: string; jsUniversity?: string; jsYearCompletion?: string; jsMarks?: string; jsSkills?: string; jsWorkExp?: string; jsFieldExp?: string; jsYearsExp?: string; jsMonthsExp?: string; jsDaysExp?: string; jsLastSalary?: string; jsExpectedSalary?: string; jsJoinType?: string; jsWorkArrangement?:string; jsWhyWork?: string;
  emCompanyName?: string; emContactPerson?: string; emMobile?: string; emEmail?: string; emServices?: string[]; emStaffRequired?: string; emJobRoleDesc?: string; emBudget?: string; emStartDate?: string; emComments?: string;
  heardFrom?: string;
  // --- NEW: Add the new field to the interface ---
  heardFromDetail?: string;
}

const DetailItem = ({ label, value }: { label: string; value?: string | number | null }) => {
  // --- UPDATED: Conditionally render the item only if value exists ---
  if (!value) return null;
  return (
    <div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <p className="text-md break-words">{value}</p>
    </div>
  );
};

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, };
const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } }, };


// --- LOGIN SCREEN COMPONENT (Unchanged) ---
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
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-sm bg-card/50 backdrop-blur-sm shadow-lg">
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


// --- SUBMISSIONS DISPLAY COMPONENT (UPDATED WITH FIXES) ---
const SubmissionsDisplay = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [filterUserType, setFilterUserType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

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

  const handleDelete = async (submissionId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this submission? This action cannot be undone.");
    if (!isConfirmed) return;
    setDeletingId(submissionId);
    try {
      const API_URL = `https://resonare-job-hub.onrender.com/api/submissions/${submissionId}`;
      const response = await fetch(API_URL, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete submission.');
      }
      setSubmissions(currentSubmissions => 
        currentSubmissions.filter(sub => sub._id !== submissionId)
      );
    } catch (err: any) {
      console.error("Deletion Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };
  
  const handleDownload = () => {
    if (filteredSubmissions.length === 0) {
      alert("No data to download.");
      return;
    }
    setIsDownloading(true);
    try {
      // --- UPDATED: Excel export logic to include the new fields ---
      const dataToExport = filteredSubmissions.map(sub => {
        const commonData = {
            'Heard From': sub.heardFrom || '',
            'Reference/Source': sub.heardFromDetail || '',
            'Submitted On': new Date(sub.createdAt).toLocaleString(),
        };

        if (sub.userType === 'jobSeeker') {
          return {
            'User Type': 'Job Seeker',
            'Name': sub.jsFullName || '',
            'Email': sub.jsEmail || '',
            'Mobile': sub.jsMobile || '',
            'City': sub.jsCity || '',
            'DOB': sub.jsDOB || '',
            'Qualification': sub.jsQualification || '',
            'Specialization': sub.jsSpecialization || '',
            'Skills': sub.jsSkills || '',
            'Experience': sub.jsWorkExp === 'yes' ? `${sub.jsYearsExp || 0}y ${sub.jsMonthsExp || 0}m` : 'No',
            'Expected Salary': sub.jsExpectedSalary || '',
            ...commonData
          };
        } else {
          return {
            'User Type': 'Employer',
            'Company Name': sub.emCompanyName || '',
            'Contact Person': sub.emContactPerson || '',
            'Email': sub.emEmail || '',
            'Mobile': sub.emMobile || '',
            'Staff Required': sub.emStaffRequired || '',
            'Services Needed': (sub.emServices || []).join(', '),
            'Job Description': sub.emJobRoleDesc || '',
            'Budget': sub.emBudget || '',
            ...commonData
          };
        }
      });
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `Submissions_Data_${date}.xlsx`);
    } catch (e) {
      console.error("Error creating Excel file:", e);
      alert("Failed to create Excel file.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const filteredSubmissions = submissions
    .filter(sub => {
      if (filterUserType === 'all') return true;
      return sub.userType === filterUserType;
    })
    .filter(sub => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      const keywords = term.split(' ').filter(k => k);
      let searchableContent = '';
      // --- UPDATED: Add new fields to the searchable content ---
      const commonSearchable = [sub.heardFrom, sub.heardFromDetail].join(' ').toLowerCase();

      if (sub.userType === 'jobSeeker') {
        searchableContent = [ sub.jsFullName, sub.jsEmail, sub.jsCity, sub.jsSkills, sub.jsQualification, sub.jsSpecialization, sub.jsUniversity, commonSearchable ].join(' ').toLowerCase();
      } else if (sub.userType === 'employer') {
        searchableContent = [ sub.emCompanyName, sub.emContactPerson, sub.emEmail, sub.emStaffRequired, sub.emJobRoleDesc, ...(sub.emServices || []), commonSearchable ].join(' ').toLowerCase();
      }
      return keywords.every(keyword => searchableContent.includes(keyword));
    })
    .filter(sub => {
      if (!startDate && !endDate) return true;
      const submissionDate = new Date(sub.createdAt);
      const start = startDate ? new Date(startDate) : null;
      if (start) start.setUTCHours(0, 0, 0, 0);
      const end = endDate ? new Date(endDate) : null;
      if (end) end.setUTCHours(23, 59, 59, 999);
      if (start && end) return submissionDate >= start && submissionDate <= end;
      if (start) return submissionDate >= start;
      if (end) return submissionDate <= end;
      return true;
    });

  // The rest of the component layout is unchanged...
  if (loading) { return <div className="flex justify-center items-center flex-1 flex-col gap-4"><Loader2 className="w-12 h-12 animate-spin text-primary" /><p className="text-lg text-muted-foreground">Loading Submissions...</p></div>; }
  if (error) { return <div className="flex-1 flex items-center justify-center p-4"><div className="container mx-auto px-4 py-8 text-center text-destructive-foreground bg-destructive rounded-lg"><ServerCrash className="w-12 h-12 mx-auto" /><h2 className="text-2xl font-bold mt-4">Error Fetching Data</h2><p>{error}</p></div></div>; }
  if (submissions.length === 0) { return <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center"><FileText className="w-16 h-16 text-muted-foreground" /><h2 className="text-2xl font-semibold">No Submissions Yet</h2><p className="text-muted-foreground">Once the form is submitted, the data will appear here.</p></div>; }
  
  return (
    <>
      <motion.div className="text-center mb-8" initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Form Submissions
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Showing {filteredSubmissions.length} of {submissions.length} total entries.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card/30 backdrop-blur-sm rounded-lg border sticky top-4 z-20 items-center"
      >
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by name, skill, reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 text-base"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Label htmlFor="startDate" className="sr-only">Start Date</Label>
            <Input id="startDate" type="date" value={startDate || ''} onChange={(e) => setStartDate(e.target.value)} className="h-11" />
            <span className="text-muted-foreground">-</span>
            <Label htmlFor="endDate" className="sr-only">End Date</Label>
            <Input id="endDate" type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} min={startDate || ''} className="h-11" />
            <Button variant="ghost" size="icon" onClick={() => { setStartDate(null); setEndDate(null); }} className="h-11 w-11 shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-4 w-full">
            <Select value={filterUserType} onValueChange={setFilterUserType}>
              <SelectTrigger className="w-full sm:w-[180px] h-11 text-base">
                <ListFilter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="jobSeeker">Job Seekers</SelectItem>
                <SelectItem value="employer">Employers</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-11 w-full sm:w-auto" onClick={handleDownload} disabled={isDownloading || filteredSubmissions.length === 0}>
              {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer} initial="hidden" animate="visible"
      >
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((sub) => (
            <Dialog key={sub._id}>
              <DialogTrigger asChild>
                <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200 h-full bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <div><CardTitle className="text-xl mb-1 line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</CardTitle><CardDescription className="line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsEmail : sub.emEmail}</CardDescription></div>
                        <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'}>{sub.userType === 'jobSeeker' ? 'Job Seeker' : 'Employer'}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {sub.userType === 'jobSeeker' ? (<div className="flex items-center text-sm text-muted-foreground"><User className="w-4 h-4 mr-2 flex-shrink-0" /> Wants to join as: <strong className="ml-1 font-semibold text-foreground">{sub.jsJoinType}</strong></div>) : (<div className="flex items-center text-sm text-muted-foreground"><Building className="w-4 h-4 mr-2 flex-shrink-0" /> Contact Person: <strong className="ml-1 font-semibold text-foreground">{sub.emContactPerson}</strong></div>)}
                      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">Submitted: {new Date(sub.createdAt).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}</DialogTitle>
                  <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'} className="w-fit">{sub.userType === 'jobSeeker' ? 'Job Seeker Submission' : 'Employer Submission'}</Badge>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {sub.userType === 'jobSeeker' ? ( <> 
                      <section><h3 className="font-bold text-lg border-b pb-2 mb-3">Personal Information</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><DetailItem label="Full Name" value={sub.jsFullName} /> <DetailItem label="Mobile" value={sub.jsMobile} /> <DetailItem label="Email" value={sub.jsEmail} /> <DetailItem label="City" value={sub.jsCity} /> <DetailItem label="Date of Birth" value={sub.jsDOB} /> <DetailItem label="Gender" value={sub.jsGender} /></div></section> 
                      <section><h3 className="font-bold text-lg border-b pb-2 mb-3">Education & Skills</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><DetailItem label="Highest Qualification" value={sub.jsQualification} /> <DetailItem label="Specialization" value={sub.jsSpecialization} /> <DetailItem label="University" value={sub.jsUniversity} /> <DetailItem label="Year of Completion" value={sub.jsYearCompletion} /> <DetailItem label="Marks/CGPA" value={sub.jsMarks} /></div><div className="mt-4"><DetailItem label="Skills" value={sub.jsSkills} /></div></section> 
                      <section><h3 className="font-bold text-lg border-b pb-2 mb-3">Work Experience</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><DetailItem label="Has Experience?" value={sub.jsWorkExp} /> <DetailItem label="Experience Field" value={sub.jsFieldExp} />{sub.jsWorkExp === 'yes' && <DetailItem label="Duration" value={`${sub.jsYearsExp || 0}y ${sub.jsMonthsExp || 0}m ${sub.jsDaysExp || 0}d`} />}<DetailItem label="Last Salary" value={sub.jsLastSalary} /> <DetailItem label="Expected Salary" value={sub.jsExpectedSalary} /></div></section> 
                      <section>
                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Preferences & Other</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Joining As" value={sub.jsJoinType} />
                            <DetailItem label="Heard From" value={sub.heardFrom} />
                            {/* --- NEW: Conditionally display the detail --- */}
                            <DetailItem label="Reference / Source" value={sub.heardFromDetail} />
                        </div>
                        <div className="mt-4"><DetailItem label="Work Arrangement" value={sub.jsWorkArrangement} /></div>
                        <div className="mt-4"><DetailItem label="Why work with us?" value={sub.jsWhyWork} /></div>
                      </section> 
                    </>
                  ) : ( <> 
                      <section><h3 className="font-bold text-lg border-b pb-2 mb-3">Company Information</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><DetailItem label="Company Name" value={sub.emCompanyName} /> <DetailItem label="Contact Person" value={sub.emContactPerson} /> <DetailItem label="Mobile" value={sub.emMobile} /> <DetailItem label="Email" value={sub.emEmail} /></div></section> 
                      <section>
                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Service Requirements</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <DetailItem label="Staff Required" value={sub.emStaffRequired} />
                            <DetailItem label="Budget" value={sub.emBudget} />
                            <DetailItem label="Start Date" value={sub.emStartDate} />
                            <DetailItem label="Heard From" value={sub.heardFrom} />
                             {/* --- NEW: Conditionally display the detail --- */}
                            <DetailItem label="Reference / Source" value={sub.heardFromDetail} />
                        </div>
                        <div className="mt-4"><p className="text-sm font-semibold text-muted-foreground">Services Needed</p>{sub.emServices && sub.emServices.length > 0 ? (<div className="flex flex-wrap gap-2 mt-2">{sub.emServices.map(service => <Badge key={service} variant="outline">{service}</Badge>)}</div>) : <p className="text-md">N/A</p>}</div>
                        <div className="mt-4"><DetailItem label="Job/Service Description" value={sub.emJobRoleDesc} /></div>
                        <div className="mt-4"><DetailItem label="Additional Comments" value={sub.emComments} /></div>
                      </section> 
                    </>
                  )}
                </div>
                <DialogModalFooter className="sm:justify-between items-center gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(sub._id)} disabled={deletingId === sub._id}>
                    {deletingId === sub._id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                    Delete
                  </Button>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Submission ID: {sub._id}</p>
                    <p className="text-xs text-muted-foreground">Submitted On: {new Date(sub.createdAt).toLocaleString()}</p>
                  </div>
                </DialogModalFooter>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">No Matching Submissions</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};


// --- MAIN EXPORTED COMPONENT (Unchanged) ---
export default function UserData() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-x-hidden">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      <main className="flex-1 relative z-10 flex flex-col container mx-auto px-4 py-12">
        {isAuthenticated ? <SubmissionsDisplay /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />}
      </main>
      <Footer />
    </div>
  );
}