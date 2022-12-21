import { Router } from "express";
import {
  addRestaurant,
  getHomePage,
  getRestaurantById,
  getRestaurants,
  getRestaurantsByPincode,
} from "../controllers/restaurant.controllers";

const router = Router();

router.route("/").get(getHomePage);
router.route("/restaurant").get(getRestaurants);
router.route("/add-restaurant").post(addRestaurant);
router.route("/restaurant/:id").get(getRestaurantById);
router.route("/restaurant/pincode/:pincode").get(getRestaurantsByPincode);
// router.get("/restaurant", getRestaurants); same as router.route().get()

export default router;
