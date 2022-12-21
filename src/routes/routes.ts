import { Router } from "express";
import {
  addRestaurant,
  deleteRestaurantById,
  getHomePage,
  getRestaurantById,
  getRestaurants,
  getRestaurantsByPincode,
  updateRestaurantById,
} from "../controllers/restaurant.controllers";

const router = Router();

router.route("/").get(getHomePage);
router.route("/restaurants").get(getRestaurants);
router.route("/add-restaurant").post(addRestaurant);
router.route("/restaurant/:id").get(getRestaurantById);
router.route("/restaurants/pincode/:pincode").get(getRestaurantsByPincode);
router.route("/restaurant/:id").delete(deleteRestaurantById);
router.route("/restaurant/:id").put(updateRestaurantById);
// router.get("/restaurant", getRestaurants); same as router.route().get()

export default router;
