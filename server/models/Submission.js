// const mongoose = require('mongoose');

// const submissionSchema = new mongoose.Schema({
//   // Common fields for both user types
//   userType: { type: String, required: true, enum: ['jobSeeker', 'employer'] },
//   heardFrom: String,
//   agreeTerms: { type: Boolean, required: true },
  
//   // --- Job Seeker Fields ---
//   jsFullName: String,
//   jsMobile: String,
//   jsEmail: String,
//   jsDOB: String,
//   jsCity: String,
//   jsGender: String,
//   jsQualification: String,
//   jsSpecialization: String,
//   jsUniversity: String,
//   jsYearCompletion: String,
//   jsMarks: String,
//   jsSkills: String,
//   jsWorkExp: String,
//   jsFieldExp: String,
//   jsYearsExp: String,
//   jsMonthsExp: String,
//   jsDaysExp: String,
//   jsLastSalary: String,
//   jsExpectedSalary: String,
//   jsJoinType: String,
//   jsWorkArrangement: String,
//   jsWhyWork: String,
  
//   // --- Employer Fields ---
//   emCompanyName: String,
//   emContactPerson: String,
//   emMobile: String,
//   emEmail: String,
//   emServices: [String], // Array of strings for the checkboxes
//   emStaffRequired: String,
//   emJobRoleDesc: String,
//   emBudget: String,
//   emStartDate: String,
//   emComments: String,
// }, {
//   // Automatically add createdAt and updatedAt fields
//   timestamps: true 
// });

// const Submission = mongoose.model('Submission', submissionSchema);

// module.exports = Submission;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // Common fields for both user types
  userType: { type: String, required: true, enum: ['jobSeeker', 'employer'] },
  heardFrom: String,
  // --- ADD THIS LINE ---
  heardFromDetail: String, // To store the friend's name or other source
  // --------------------
  agreeTerms: { type: Boolean, required: true },
  
  // --- Job Seeker Fields ---
  jsFullName: String,
  jsMobile: String,
  jsEmail: String,
  jsDOB: String,
  jsCity: String,
  jsGender: String,
  jsQualification: String,
  jsSpecialization: String,
  jsUniversity: String,
  jsYearCompletion: String,
  jsMarks: String,
  jsSkills: String,
  jsWorkExp: String,
  jsFieldExp: String,
  jsYearsExp: String,
  jsMonthsExp: String,
  jsDaysExp: String,
  jsLastSalary: String,
  jsExpectedSalary: String,
  jsJoinType: String,
  jsWorkArrangement: String,
  jsWhyWork: String,
  
  // --- Employer Fields ---
  emCompanyName: String,
  emContactPerson: String,
  emMobile: String,
  emEmail: String,
  emServices: [String], // Array of strings for the checkboxes
  emStaffRequired: String,
  emJobRoleDesc: String,
  emBudget: String,
  emStartDate: String,
  emComments: String,
}, {
  // Automatically add createdAt and updatedAt fields
  timestamps: true 
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;