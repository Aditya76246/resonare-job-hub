const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Submission = require('./models/Submission'); // Import the model

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// Allows requests from your React app
app.use(cors()); 
// Allows Express to parse JSON data in the request body
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully with MongoDB Compass!"))
.catch(err => console.error("MongoDB connection error:", err));

// --- API Routes ---

// A simple test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// The main route to handle form submissions
app.post('/api/submit-form', async (req, res) => {
  try {
    // req.body will contain the data from your Formik form
    console.log('Received data:', req.body);

    // Create a new submission document using the Mongoose model
    const newSubmission = new Submission(req.body);

    // Save the document to the database
    const savedSubmission = await newSubmission.save();

    // Send a success response back to the client
    res.status(201).json({ 
      message: 'Form submitted successfully!', 
      data: savedSubmission 
    });

  } catch (error) {
    // Handle potential errors (e.g., validation or database errors)
    console.error("Error saving submission:", error);
    res.status(500).json({ 
      message: 'Error submitting form. Please try again.', 
      error: error.message 
    });
  }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});