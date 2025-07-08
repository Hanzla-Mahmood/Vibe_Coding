
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database: CRUD');
});

// Student Schema
const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  age: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema, 'CRUD');

// Routes

// Create (Insert) student
app.post('/api/students', async (req, res) => {
  try {
    const { rollNo, name, department, semester, age } = req.body;
    
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this roll number already exists' });
    }

    const student = new Student({ rollNo, name, department, semester, age });
    await student.save();
    res.status(201).json({ message: 'Student record created successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (Show) student by roll number
app.get('/api/students/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
app.put('/api/students/:rollNo', async (req, res) => {
  try {
    const { name, department, semester, age } = req.body;
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      { name, department, semester, age },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student record updated successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/api/students/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
