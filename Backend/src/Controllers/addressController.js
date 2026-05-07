const { Address, User } = require("../Models");

// ================= ADD ADDRESS =================
// @route   POST /api/v1/address/add
// @desc    Add a new address for the logged-in user
// @access  Private
exports.addAddress = async (req, res) => {
  try {
    const { name, street, city, state, postal_code, lat, lon } = req.body;
    const user_id = req.user.id;

    if (!name || !street || !city || !state || !postal_code) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, street, city, state, and postal code.",
      });
    }

    const newAddress = await Address.create({
      user_id,
      name,
      street,
      city,
      state,
      postal_code,
      lat,
      lon,
    });

    // If this is the user's first address, set it as default
    const user = await User.findById(user_id);
    if (!user.default_address) {
      user.default_address = newAddress._id;
      await user.save({ validateModifiedOnly: true });
    }

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET MY ADDRESSES =================
// @route   GET /api/v1/address/my
// @desc    Get all addresses for the logged-in user
// @access  Private
exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.user.id });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ADDRESS BY ID =================
// @route   GET /api/v1/address/:id
// @desc    Get a single address by ID
// @access  Private
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Ensure the user owns the address
    if (address.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "User not authorized." });
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE ADDRESS =================
// @route   PUT /api/v1/address/:id
// @desc    Update an address
// @access  Private
exports.updateAddress = async (req, res) => {
  try {
    let address = await Address.findById(req.params.id);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Ensure the user owns the address
    if (address.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "User not authorized." });
    }

    address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE ADDRESS =================
// @route   DELETE /api/v1/address/:id
// @desc    Delete an address
// @access  Private
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Ensure the user owns the address
    if (address.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "User not authorized." });
    }

    // Check if the address to be deleted is the default one
    const user = await User.findById(req.user.id);
    if (
      user.default_address &&
      user.default_address.toString() === address._id.toString()
    ) {
      user.default_address = undefined; // or null
      await user.save({ validateModifiedOnly: true });
    }

    await address.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= SET DEFAULT ADDRESS =================
// @route   PATCH /api/v1/address/default/:id
// @desc    Set an address as default
// @access  Private
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Ensure the user owns the address
    if (address.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "User not authorized." });
    }

    const user = await User.findById(req.user.id);
    user.default_address = address._id;
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      success: true,
      message: "Default address updated successfully.",
      default_address_id: address._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
