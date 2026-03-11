import Item from "../model/item.js";
export const getItem = async (req, res) => {
  try {
    const data = await Item.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error while fetching items" });
  }
};

export const getSellerItems = async (req, res) => {
  try {
    const data = await Item.find({ seller: req.user.userId });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching seller items:", error);
    res.status(500).json({ message: "Server error while fetching seller items" });
  }
};
export const getSection = async (req, res) => {
  try {
    let filter = {};
    const { section, category, q } = req.query; 
    
    // Add text search based on Title/Brand if `q` is provided
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ];
    }

    if (section !== undefined) filter.section = section; 
    if (category !== undefined) filter.category = category; 
    
    const data = await Item.find(filter);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error while fetching items" });
  }
};
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Item.findById(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Server error while fetching item" });
  }
};

export const AddItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      imageUrl,
      size,
      section,
      isFeatured,
    } = req.body;

    const newItem = new Item({
      name,
      price,
      ImageUrl: imageUrl || `/images/${Math.floor(Math.random() * 8) + 1}.jpg`,
      description,
      Size: size || "One Size",
      brand: brand || "StyleHub",
      category,
      section,
      isFeatured: isFeatured || false,
      rating: {
        average: 0,
        count: 0,
      },
      seller: req.user.userId,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      item: savedItem,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.seller.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error while deleting item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.seller.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to edit this item" });
    }
    
    // Perform update
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server error while updating item" });
  }
};
