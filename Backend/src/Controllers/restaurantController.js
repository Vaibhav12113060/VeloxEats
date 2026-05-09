const { Restaurant } = require("../Models");

exports.createRestaurant = async (req, res) => {
  try {
    // Check if user already owns a restaurant
    const existingRestaurant = await Restaurant.findOne({
      user_id: req.user.id,
    });

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "You already own a restaurant",
      });
    }

    // Request Body Data
    const restaurantData = {
      ...req.body,
      user_id: req.user.id,
    };

    // Restaurant Image
    if (req.file) {
      restaurantData.image = req.file.path;
    }

    // Create Restaurant
    const restaurant = await Restaurant.create(restaurantData);

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MY RESTAURANT =================

exports.getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      user_id: req.user.id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found for this user",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET NEARBY RESTAURANTS =================

exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [parseFloat(lng), parseFloat(lat)],
          },

          $maxDistance: 10000,
        },
      },
    });

    res.status(200).json({
      success: true,
      totalRestaurants: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
