const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering the user' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'abcd', { expiresIn: '3h' });

    // Set an HTTP-only cookie with the token for server-side authentication
    res.cookie('token', token, { httpOnly: true });

    // Set a non-HTTP-only cookie for frontend access
    res.cookie('token-frontend', token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Middleware to check if a user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Read the token from the HTTP-only cookie

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'abcd', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Error-Unauthorized' });
    }
    req.user = decoded;
    next();
  })
};

// Middleware to check if a user is an admin
const checkAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  checkAdmin,
};
