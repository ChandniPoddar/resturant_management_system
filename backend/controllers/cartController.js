import userModel from '../models/userModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body; // Make sure frontend sends `itemId`
    if (!itemId) {
      return res.status(400).json({ success: false, message: "No itemId provided" });
    }

    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

    res.json({ success: true, message: 'Product added to cart', cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ success: false, message: "No itemId provided" });
    }

    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

    res.json({ success: true, message: 'Product removed from cart', cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Fetch cart items
export const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
