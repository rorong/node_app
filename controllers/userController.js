// controllers/userController.js
const { User } = require('../models');

exports.getUserProfile = async (req, res, next) => {
 try {
  const user = await User.findByPk(req.user.id);
  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ user }); // Or just the necessary user data
 } catch (error) {
  next(error);
 }
};

exports.updateUserProfile = async (req, res, next) => {
 try {
  const { name, email, /* other fields */ } = req.body; // Get the data from the request body
  const user = await User.findByPk(req.user.id);

  if (!user) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's information
  user.name = name || user.name;  // Use the new value or keep the old one
  user.email = email || user.email;
  // Update other fields similarly

  await user.save(); // Save the changes

  res.status(200).json({ message: 'Profile updated successfully' });
 } catch (error) {
  next(error);
 }
};