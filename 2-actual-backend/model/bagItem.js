import mongoose from "mongoose";
const BagItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);
export default mongoose.model("BagItem", BagItemSchema);