const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/social_media', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  socialMediaHandle: String,
  images: [String],
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/submit', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map((file) => file.filename);
    const user = new User({ name, socialMediaHandle, images: imagePaths });
    await user.save();
    res.status(200).send('User saved successfully');
  } catch (error) {
    res.status(500).send('Error saving user');
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
