"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByPincode = exports.getRestaurantById = exports.addRestaurant = exports.getRestaurants = void 0;
const fs = require("fs");
const getRestaurants = (req, res) => {
    fs.readFile("src/Data/restaurants.json", (err, data) => {
        if (err)
            throw err;
        try {
            let restaurantsData = JSON.parse(data);
            res.send(restaurantsData.restaurants);
        }
        catch (err) {
            console.log("Error pasrsing JSON", err);
        }
    });
};
exports.getRestaurants = getRestaurants;
const addRestaurant = (req, res) => {
    fs.readFile("src/Data/restaurants.json", (err, data) => {
        if (err)
            throw err;
        try {
            let restaurantsData = JSON.parse(data);
            restaurantsData["restaurants"].push(req.body);
            fs.writeFile("src/Data/restaurants.json", JSON.stringify(restaurantsData, null, 2), (err) => {
                if (err)
                    throw err;
                console.log("Data written to file");
            });
            console.log(restaurantsData);
        }
        catch (err) {
            console.log("Error pasrsing JSON", err);
        }
    });
    // res.sendStatus(201);
    //   console.log("req body", req.body);
    res.status(201).send("Restaurant added successfully");
};
exports.addRestaurant = addRestaurant;
const getRestaurantById = (req, res) => {
    console.log("🚀 ~ file: restaurant.controllers.ts:64 ~ fs.readFile ~ +req.params.id", req.params.id);
    if (isNaN(req.params.id)) {
        res.status(404).send("Record Not Found or Invalid Id");
    }
    else {
        fs.readFile("src/Data/restaurants.json", (err, data) => {
            if (err)
                throw err;
            try {
                let restaurantsData = JSON.parse(data);
                const object = restaurantsData.restaurants.find((obj) => obj.id === +req.params.id);
                console.log("🚀 ~ file: restaurant.controllers.ts:62 ~ fs.readFile ~ object", object);
                res.status(200).send(object);
                console.log("restaurant retrived");
            }
            catch (err) {
                console.log("Error pasrsing JSON", err);
            }
        });
    }
};
exports.getRestaurantById = getRestaurantById;
const getRestaurantsByPincode = (req, res) => {
    console.log("🚀 ~ file: restaurant.controllers.ts:64 ~ fs.readFile ~ +req.params.pincode", req.params.pincode);
    if (isNaN(req.params.pincode)) {
        res.status(404).send("Record Not Found or Invalid pincode");
    }
    else {
        fs.readFile("src/Data/restaurants.json", (err, data) => {
            if (err)
                throw err;
            try {
                let restaurantsData = JSON.parse(data);
                const object = restaurantsData.restaurants.filter((obj) => {
                    return obj.pincode === +req.params.pincode;
                });
                console.log("🚀 ~ file: restaurant.controllers.ts:62 ~ fs.readFile ~ object", object);
                res.status(200).send(object);
                console.log("restaurant retrived");
            }
            catch (err) {
                console.log("Error pasrsing JSON", err);
            }
        });
    }
};
exports.getRestaurantsByPincode = getRestaurantsByPincode;
