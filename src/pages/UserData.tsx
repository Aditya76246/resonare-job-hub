// export default function UserData(){
//     return (
//         <div>
//             <h1>I Am Your Data</h1>
//         </div>
//     )
// }

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, ServerCrash, User, Building, FileText } from "lucide-react";

// 1. Define a TypeScript interface for the data from your MongoDB
// This MUST match your Mongoose Schema in `Submission.js`
interface Submission {
  _id: string; // MongoDB automatically adds this
  createdAt: string; // Mongoose `timestamps: true` adds this
  userType: 'jobSeeker' | 'employer';
  
  // Job Seeker Fields
  jsFullName?: string; jsMobile?: string; jsEmail?: string; jsDOB?: string; jsCity?: string; jsGender?: string; jsQualification?: string; jsSpecialization?: string; jsUniversity?: string; jsYearCompletion?: string; jsMarks?: string; jsSkills?: string; jsWorkExp?: string; jsFieldExp?: string; jsYearsExp?: string; jsMonthsExp?: string; jsDaysExp?: string; jsLastSalary?: string; jsExpectedSalary?: string; jsJoinType?: string; jsWorkArrangement?: string; jsWhyWork?: string;

  // Employer Fields
  emCompanyName?: string; emContactPerson?: string; emMobile?: string; emEmail?: string; emServices?: string[]; emStaffRequired?: string; emJobRoleDesc?: string; emBudget?: string; emStartDate?: string; emComments?: string;
  
  // Common Fields
  heardFrom?: string;
}

// A small helper component to make the detail view cleaner
const DetailItem = ({ label, value }: { label: string; value?: string | number | null }) => {
  // Don't render the item if the value is missing or empty
  if (!value) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="text-md">{value}</p>
    </div>
  );
};


export default function UserData() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        // 2. Fetch data from your backend's GET endpoint
        const API_URL = 'https://resonare-job-hub.onrender.com/api/submissions';
        const response = await fetch(API_URL);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data from the server.');
        }

        const data: Submission[] = await response.json();
        setSubmissions(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  // --- Render different UI based on the state ---

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] flex-col gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading Submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-destructive-foreground bg-destructive rounded-lg">
        <ServerCrash className="w-12 h-12 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Error Fetching Data</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center min-h-[60vh] flex flex-col justify-center items-center gap-4">
        <FileText className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">No Submissions Yet</h2>
        <p className="text-muted-foreground">Once the form is submitted, the data will appear here.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Form Submissions</h1>
      <p className="text-center text-muted-foreground mb-8">Found {submissions.length} total entries.</p>
      
      {/* 3. Display each submission as a clickable card in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((sub) => (
          // 4. Wrap the card in a Dialog to show full details on click
          <Dialog key={sub._id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-xl mb-1 line-clamp-1">
                        {sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">{sub.userType === 'jobSeeker' ? sub.jsEmail : sub.emEmail}</CardDescription>
                    </div>
                    <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'}>
                      {sub.userType === 'jobSeeker' ? 'Job Seeker' : 'Employer'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                   {sub.userType === 'jobSeeker' ? (
                       <div className="flex items-center text-sm text-muted-foreground">
                           <User className="w-4 h-4 mr-2 flex-shrink-0" /> Wants to join as: <strong className="ml-1 font-semibold text-foreground">{sub.jsJoinType}</strong>
                       </div>
                   ) : (
                       <div className="flex items-center text-sm text-muted-foreground">
                           <Building className="w-4 h-4 mr-2 flex-shrink-0" /> Contact Person: <strong className="ml-1 font-semibold text-foreground">{sub.emContactPerson}</strong>
                       </div>
                   )}
                   <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                     Submitted: {new Date(sub.createdAt).toLocaleDateString()}
                   </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            {/* 5. The content of the Dialog modal (Full Details View) */}
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {sub.userType === 'jobSeeker' ? sub.jsFullName : sub.emCompanyName}
                </DialogTitle>
                <Badge variant={sub.userType === 'jobSeeker' ? 'default' : 'secondary'} className="w-fit">
                    {sub.userType === 'jobSeeker' ? 'Job Seeker Submission' : 'Employer Submission'}
                </Badge>
              </DialogHeader>

              {/* Conditionally render details based on userType */}
              <div className="grid gap-6 py-4">
                {sub.userType === 'jobSeeker' ? (
                  <>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Personal Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <DetailItem label="Full Name" value={sub.jsFullName} />
                        <DetailItem label="Mobile" value={sub.jsMobile} />
                        <DetailItem label="Email" value={sub.jsEmail} />
                        <DetailItem label="City" value={sub.jsCity} />
                        <DetailItem label="Date of Birth" value={sub.jsDOB} />
                        <DetailItem label="Gender" value={sub.jsGender} />
                      </div>
                    </section>
                    <section>
                       <h3 className="font-bold text-lg border-b pb-2 mb-3">Education & Skills</h3>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <DetailItem label="Highest Qualification" value={sub.jsQualification} />
                          <DetailItem label="Specialization" value={sub.jsSpecialization} />
                          <DetailItem label="University" value={sub.jsUniversity} />
                          <DetailItem label="Year of Completion" value={sub.jsYearCompletion} />
                          <DetailItem label="Marks/CGPA" value={sub.jsMarks} />
                       </div>
                       <div className="mt-4"><DetailItem label="Skills" value={sub.jsSkills} /></div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Work Experience</h3>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         <DetailItem label="Has Experience?" value={sub.jsWorkExp} />
                         <DetailItem label="Experience Field" value={sub.jsFieldExp} />
                         {sub.jsWorkExp === 'yes' && <DetailItem label="Duration" value={`${sub.jsYearsExp || 0}y ${sub.jsMonthsExp || 0}m ${sub.jsDaysExp || 0}d`} />}
                         <DetailItem label="Last Salary" value={sub.jsLastSalary} />
                         <DetailItem label="Expected Salary" value={sub.jsExpectedSalary} />
                       </div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">Preferences & Other</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <DetailItem label="Joining As" value={sub.jsJoinType} />
                          <DetailItem label="Heard From" value={sub.heardFrom} />
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
                          <DetailItem label="Company Name" value={sub.emCompanyName} />
                          <DetailItem label="Contact Person" value={sub.emContactPerson} />
                          <DetailItem label="Mobile" value={sub.emMobile} />
                          <DetailItem label="Email" value={sub.emEmail} />
                        </div>
                     </section>
                     <section>
                        <h3 className="font-bold text-lg border-b pb-2 mb-3">Service Requirements</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           <DetailItem label="Staff Required" value={sub.emStaffRequired} />
                           <DetailItem label="Budget" value={sub.emBudget} />
                           <DetailItem label="Start Date" value={sub.emStartDate} />
                           <DetailItem label="Heard From" value={sub.heardFrom} />
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-muted-foreground">Services Needed</p>
                          {sub.emServices && sub.emServices.length > 0 ? (
                             <div className="flex flex-wrap gap-2 mt-2">
                              {sub.emServices.map(service => <Badge key={service} variant="outline">{service}</Badge>)}
                             </div>
                          ) : <p className="text-md">N/A</p>}
                        </div>
                        <div className="mt-4"><DetailItem label="Job/Service Description" value={sub.emJobRoleDesc} /></div>
                        <div className="mt-4"><DetailItem label="Additional Comments" value={sub.emComments} /></div>
                     </section>
                  </>
                )}
              </div>
              <DialogFooter>
                  <p className="text-xs text-muted-foreground mr-auto">Submission ID: {sub._id}</p>
                  <p className="text-xs text-muted-foreground">Submitted On: {new Date(sub.createdAt).toLocaleString()}</p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}