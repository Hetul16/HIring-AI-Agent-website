
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require("./routes/users");
const candidateRoutes = require("./routes/candidates");

app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});



// Second Try Intermidiate  code 


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// const app = express();

// // Enhanced Middleware setup
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(bodyParser.json());

// // Import routes before using them
// const userRoutes = require("./routes/users");

// // Routes
// app.use("/api/users", userRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "API is running..." });
// });

// // MongoDB Connection with better error handling
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Start server only after DB connection
// const startServer = async () => {
//   try {
//     await connectDB();
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup error:", error);
//   }
// };

// startServer();

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something broke!" });
// });















// First code basic one 

// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const { spawn } = require('child_process');
// const path = require('path');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(bodyParser.json());

// // Import routes
// const userRoutes = require("./routes/users");
// const candidateRoutes = require("./routes/candidates"); // New route file

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/candidates", candidateRoutes); // Add candidate routes

// // Create the candidates route handler (routes/candidates.js)
// const router = express.Router();

// router.post("/find", async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       jobRole,
//       jobDescription,
//       startDate,
//       endDate,
//       candidatesRequired
//     } = req.body;

//     // Spawn Python process with the hiring agent script
//     const pythonProcess = spawn('python', [
//       path.join(__dirname, '../python/hiring_agent.py'),
//       '--email', email,
//       '--password', password,
//       '--subject', jobRole, // Using jobRole as subject filter
//       '--start-date', startDate,
//       '--end-date', endDate,
//       '--job-description', jobDescription,
//       '--num-candidates', candidatesRequired
//     ]);

//     let dataString = '';
//     let errorString = '';

//     pythonProcess.stdout.on('data', (data) => {
//       dataString += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       errorString += data.toString();
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         console.error('Python script error:', errorString);
//         return res.status(500).json({ 
//           error: 'Candidate processing failed',
//           details: errorString
//         });
//       }

//       try {
//         const results = JSON.parse(dataString);
//         res.json({
//           success: true,
//           candidates: results
//         });
//       } catch (error) {
//         res.status(500).json({ 
//           error: 'Failed to parse results',
//           details: error.message 
//         });
//       }
//     });

//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ 
//       error: 'Internal server error',
//       details: error.message 
//     });
//   }
// });

// module.exports = router;

// // Update your FindCandidatesPage.tsx to use the new endpoint
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/find`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to fetch candidates');
//     }

//     const data = await response.json();
//     if (data.success) {
//       toast.success('Candidates found successfully!');
//       // Store candidates in state or context
//       // You might want to create a separate context for candidates
//       navigate('/dashboard', { state: { candidates: data.candidates } });
//     }
//   } catch (error) {
//     toast.error(error.message || 'Failed to fetch candidates');
//     console.error('Error:', error);
//   }
// };


// // Update MongoDB Schema (models/Candidate.js)
// const mongoose = require('mongoose');

// const candidateSchema = new mongoose.Schema({
//   fileName: String,
//   score: Number,
//   comparativeAdvantage: String,
//   reasons: String,
//   resumeText: String,
//   jobRole: String,
//   processedDate: {
//     type: Date,
//     default: Date.now
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// });

// module.exports = mongoose.model('Candidate', candidateSchema);