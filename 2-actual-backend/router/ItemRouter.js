import { Router } from "express";
import {
  getItem,
  AddItem,
  getItemById,
  getSection,
  getSellerItems,
  deleteItem,
  updateItem,
} from "../controller/ItemController.js";
import { verifyToken, isSeller } from "../middleware/authMiddleware.js";

const ItemRouter = new Router();

ItemRouter.get("/", (req, res) => {
  // If a section query is provided, delegate to the section handler; otherwise, return all items.
  if (req.query) { 
    return getSection(req, res);
  }
  return getItem(req, res);
});
ItemRouter.get("/seller/items", verifyToken, isSeller, getSellerItems);
ItemRouter.post("/", verifyToken, isSeller, AddItem);
ItemRouter.get("/details/:id", getItemById);
ItemRouter.delete("/:id", verifyToken, isSeller, deleteItem);
ItemRouter.put("/:id", verifyToken, isSeller, updateItem);

export default ItemRouter;
