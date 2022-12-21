"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controllers_1 = require("../controllers/restaurant.controllers");
const router = (0, express_1.Router)();
router.route("/").get(restaurant_controllers_1.getHomePage);
router.route("/restaurant").get(restaurant_controllers_1.getRestaurants);
router.route("/add-restaurant").post(restaurant_controllers_1.addRestaurant);
router.route("/restaurant/:id").get(restaurant_controllers_1.getRestaurantById);
router.route("/restaurant/pincode/:pincode").get(restaurant_controllers_1.getRestaurantsByPincode);
// router.get("/restaurant", getRestaurants); same as router.route().get()
exports.default = router;
