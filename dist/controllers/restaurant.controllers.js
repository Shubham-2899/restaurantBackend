"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRestaurantById = exports.deleteRestaurantById = exports.getRestaurantsByPincode = exports.getRestaurantById = exports.addRestaurant = exports.getRestaurants = exports.getHomePage = void 0;
const uuid_1 = require("uuid");
const helper_1 = require("../helper");
const fs_1 = require("fs");
const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("<div><h3>Welcome to Fake Restaurant API</h3></div>");
});
exports.getHomePage = getHomePage;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile("src/Data/restaurants.json", "utf-8");
        let restaurantsData = JSON.parse(data);
        res.send(restaurantsData.restaurants);
    }
    catch (error) {
        console.log("Error pasrsing JSON", error);
    }
});
exports.getRestaurants = getRestaurants;
const addRestaurant = (req, res) => {
    const errorObj = (0, helper_1.validateRequestForAddRestaurantAPI)(req.body);
    if (!(Object.keys(errorObj).length === 0)) {
        res.status(400).send(errorObj);
    }
    else {
        const new_res = Object.assign({ id: (0, uuid_1.v4)() }, req.body);
        fs_1.promises.readFile("src/Data/restaurants.json", "utf-8")
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let restaurantsData = JSON.parse(result);
            restaurantsData["restaurants"].push(new_res);
            try {
                yield fs_1.promises.writeFile("src/Data/restaurants.json", JSON.stringify(restaurantsData, null, 2));
                console.log("Data written to file");
                console.log(restaurantsData);
                res.status(201).send("Restaurant added successfully");
            }
            catch (error) {
                console.error(error);
            }
        }))
            .catch((err) => {
            console.log("Error while adding restaurant", err);
        });
    }
};
exports.addRestaurant = addRestaurant;
const getRestaurantById = (req, res) => {
    if (!(0, uuid_1.validate)(req.params.id)) {
        res.status(400).send("Invalid Id");
    }
    else {
        fs_1.promises.readFile("src/Data/restaurants.json", "utf-8")
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let restaurantsData = JSON.parse(result);
            const object = restaurantsData.restaurants.find((obj) => obj.id === req.params.id);
            if (object === undefined) {
                res.status(404).send("Record Not Found");
                return;
            }
            else {
                res.status(200).send(object);
                console.log("restaurant retrived");
            }
        }))
            .catch((err) => {
            console.log("Error while finding restaurant", err);
        });
    }
};
exports.getRestaurantById = getRestaurantById;
const getRestaurantsByPincode = (req, res) => {
    if (isNaN(req.params.pincode) || req.params.pincode.toString().length !== 6) {
        res.status(400).send("Invalid pincode");
    }
    else {
        fs_1.promises.readFile("src/Data/restaurants.json", "utf-8")
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let restaurantsData = JSON.parse(result);
            const object = restaurantsData.restaurants.filter((obj) => {
                return obj.pincode === +req.params.pincode;
            });
            if (object.length === 0) {
                res.status(404).send("Record Not Found");
                return;
            }
            else {
                res.status(200).send(object);
                console.log("restaurant retrived");
            }
        }))
            .catch((err) => {
            console.log("Error while finding restaurant", err);
        });
    }
};
exports.getRestaurantsByPincode = getRestaurantsByPincode;
const deleteRestaurantById = (req, res) => {
    if (!(0, uuid_1.validate)(req.params.id)) {
        res.status(400).send("Invalid Id");
    }
    else {
        fs_1.promises.readFile("src/Data/restaurants.json", "utf-8")
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let restaurantsData = JSON.parse(result);
            const object = restaurantsData.restaurants.filter((obj) => {
                return obj.id !== req.params.id;
            });
            if (object.length === restaurantsData.restaurants.length) {
                res.status(404).send("Record Not Found");
                return;
            }
            else {
                restaurantsData.restaurants = object;
                try {
                    yield fs_1.promises.writeFile("src/Data/restaurants.json", JSON.stringify(restaurantsData, null, 2));
                    console.log("record deleted");
                    res.status(200).send("Record deleted successfully");
                }
                catch (error) {
                    console.error(error);
                }
            }
        }))
            .catch((err) => {
            console.log("Error while deleting restaurant", err);
        });
    }
};
exports.deleteRestaurantById = deleteRestaurantById;
const updateRestaurantById = (req, res) => {
    // req.body._fromUpdate = false;
    const errorObj = (0, helper_1.validateRequestForAddRestaurantAPI)(req.body);
    if (!(0, uuid_1.validate)(req.params.id)) {
        res.status(400).send("Invalid Id");
    }
    else if (!(Object.keys(errorObj).length === 0)) {
        res.status(400).send(errorObj);
    }
    else {
        fs_1.promises.readFile("src/Data/restaurants.json", "utf-8")
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let restaurantsData = JSON.parse(result);
            const index = restaurantsData.restaurants.findIndex((obj) => obj.id === req.params.id);
            restaurantsData.restaurants[index] = Object.assign(Object.assign({}, restaurantsData.restaurants[index]), req.body);
            try {
                yield fs_1.promises.writeFile("src/Data/restaurants.json", JSON.stringify(restaurantsData, null, 2));
                console.log("Data written to file");
                res.status(200).send("Record updated successfully");
            }
            catch (error) {
                console.error(error);
            }
        }))
            .catch((err) => {
            console.log("Error while updating restaurant", err);
        });
    }
};
exports.updateRestaurantById = updateRestaurantById;
