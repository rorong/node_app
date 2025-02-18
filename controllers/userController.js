const { User } = require('../models');
const bcrypt = require('bcrypt');

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses || [],
      isVerified: user.isVerified
    });
  } catch (error) {
    next(error);
  }
};

// Update profile (name, email, password)
// If password is changed, rehash and set isVerified to false for re-verification.
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, newPassword } = req.body;
    const user = req.user;
    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.isVerified = false;
    }
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully. Please reverify if your password or email changed.' });
  } catch (error) {
    next(error);
  }
};

// Manage Addresses
exports.getAddresses = async (req, res, next) => {
  try {
    const addresses = req.user.addresses || [];
    res.status(200).json({ addresses });
  } catch (error) {
    next(error);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const { address } = req.body;
    const user = req.user;
    const addresses = user.addresses || [];
    addresses.push(address);
    user.addresses = addresses;
    await user.save();
    res.status(201).json({ message: 'Address added successfully', addresses });
  } catch (error) {
    next(error);
  }
};

// Export addresses as CSV
exports.exportAddressesCSV = async (req, res, next) => {
  try {
    const addresses = req.user.addresses || [];
    let csv = 'Address\n';
    addresses.forEach(addr => {
      csv += `"${addr}"\n`;
    });
    res.setHeader('Content-disposition', 'attachment; filename=addresses.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

// Export addresses as PDF (simulation)
exports.exportAddressesPDF = async (req, res, next) => {
  try {
    const addresses = req.user.addresses || [];
    let pdfContent = 'Addresses:\n\n';
    addresses.forEach((addr, index) => {
      pdfContent += `${index + 1}. ${addr}\n`;
    });
    res.setHeader('Content-disposition', 'attachment; filename=addresses.pdf');
    res.set('Content-Type', 'application/pdf');
    res.status(200).send(pdfContent);
  } catch (error) {
    next(error);
  }
};