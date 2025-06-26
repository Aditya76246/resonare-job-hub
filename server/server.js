// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const Submission = require('./models/Submission'); // Your existing model import

// const app = express();
// const PORT = process.env.PORT || 5000;

// // --- Middleware ---
// app.use(cors()); 
// app.use(express.json());

// // --- Database Connection ---
// // Note: In newer versions of Mongoose, useNewUrlParser and useUnifiedTopology 
// // are no longer needed and can be removed. The connection will still work.
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log("MongoDB connected successfully!"))
// .catch(err => console.error("MongoDB connection error:", err));

// // --- API Routes ---

// // A simple test route (unchanged)
// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });

// // The main route to handle form submissions (unchanged)
// app.post('/api/submit-form', async (req, res) => {
//   try {
//     console.log('Received data:', req.body);
//     const newSubmission = new Submission(req.body);
//     const savedSubmission = await newSubmission.save();
//     res.status(201).json({ 
//       message: 'Form submitted successfully!', 
//       data: savedSubmission 
//     });
//   } catch (error) {
//     console.error("Error saving submission:", error);
//     res.status(500).json({ 
//       message: 'Error submitting form. Please try again.', 
//       error: error.message 
//     });
//   }
// });

// // --- NEW: GET route to fetch all submissions ---
// // This is the endpoint your UserData component will call.
// app.get('/api/submissions', async (req, res) => {
//   try {
//     // 1. Find all documents in the 'submissions' collection.
//     // 2. Sort them by the 'createdAt' field in descending order (newest first).
//     //    This requires your Mongoose schema to have `timestamps: true`.
//     const allSubmissions = await Submission.find({}).sort({ createdAt: -1 });

//     // Send the array of submissions back to the client with a 200 OK status.
//     res.status(200).json(allSubmissions);

//   } catch (error) {
//     // Handle any database errors that occur during the fetch.
//     console.error("Error fetching submissions:", error);
//     res.status(500).json({ 
//       message: 'Failed to fetch submissions.', 
//       error: error.message 
//     });
//   }
// });


// // --- Start the Server ---
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
require('dotenv').config();

const Submission = require('./models/Submission'); // Your existing model import

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

// --- API Routes ---

// A simple test route (unchanged)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// The main route to handle form submissions (unchanged)
app.post('/api/submit-form', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const newSubmission = new Submission(req.body);
    const savedSubmission = await newSubmission.save();
    res.status(201).json({ 
      message: 'Form submitted successfully!', 
      data: savedSubmission 
    });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ 
      message: 'Error submitting form. Please try again.', 
      error: error.message 
    });
  }
});

// GET route to fetch all submissions (unchanged)
app.get('/api/submissions', async (req, res) => {
  try {
    const allSubmissions = await Submission.find({}).sort({ createdAt: -1 });
    res.status(200).json(allSubmissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ 
      message: 'Failed to fetch submissions.', 
      error: error.message 
    });
  }
});

// --- NEW: DELETE route to remove a submission by ID ---
app.delete('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameter

    // Use Mongoose's findByIdAndDelete to find the document and remove it.
    const deletedSubmission = await Submission.findByIdAndDelete(id);

    // If no document was found with that ID, it returns null.
    if (!deletedSubmission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    // Send a success response.
    res.status(200).json({ message: 'Submission deleted successfully!' });

  } catch (error) {
    // Handle potential errors, such as an invalid ID format or database issues.
    console.error("Error deleting submission:", error);
    res.status(500).json({
      message: 'Failed to delete submission.',
      error: error.message
    });
  }
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});