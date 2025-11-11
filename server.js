const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const { createUserTable } = require("./src/models/User");
const { createQuizTables } = require("./src/models/Quiz");
const { createAssignmentTables } = require("./src/models/Assignment");
const adminRoutes = require("./src/routes/adminRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await createUserTable();
    await createQuizTables();
    await createAssignmentTables();
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.error('Please check your DATABASE_URL in the .env file');
    console.error('Server is running but database is not connected');
  }
});


