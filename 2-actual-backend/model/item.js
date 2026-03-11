import mongoose from "mongoose";
const pricingSchema = new mongoose.Schema({
  original: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage or fixed amount
  price: {
    type: Number,
    required: true,
    default: function () {
      return this.original - this.discount;
    },
  },
});
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: [pricingSchema],

    ImageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Size: { type: String },
    brand: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    section: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 }, // Average rating (1-5)
      count: { type: Number, default: 0 }, // Number of ratings
    },
  },
  { timesetamps: true }
);

export default mongoose.model("Item", itemSchema);
