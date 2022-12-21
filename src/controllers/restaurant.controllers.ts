import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4, validate } from "uuid";
import {
  IGetRestaurantReq,
  IGetRestaurantsByPincodeReq,
  IRestaurant,
} from "../Utils/interfaces";
const fs = require("fs");

export const getHomePage = (req: Request, res: Response) => {
  res.send("<div><h3>Welcome to Fake Restaurant API</h3></div>");
};

export const getRestaurants = (req: Request, res: Response) => {
  fs.readFile("src/Data/restaurants.json", (err: any, data: string) => {
    if (err) throw err;
    try {
      let restaurantsData = JSON.parse(data);
      res.send(restaurantsData.restaurants);
    } catch (err) {
      console.log("Error pasrsing JSON", err);
    }
  });
};

export const addRestaurant = (req: Request, res: Response) => {
  fs.readFile("src/Data/restaurants.json", (err: any, data: string) => {
    if (err) throw err;
    try {
      const new_res: IRestaurant = {
        id: uuidv4(),
        ...req.body,
      };
      console.log(
        "🚀 ~ file: restaurant.controllers.ts:35 ~ fs.readFile ~ req.body.food_type",
        req.body.food_type
      );
      let restaurantsData = JSON.parse(data);
      restaurantsData["restaurants"].push(new_res);
      fs.writeFile(
        "src/Data/restaurants.json",
        JSON.stringify(restaurantsData, null, 2),
        (err: any) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      console.log(restaurantsData);
    } catch (err) {
      console.log("Error pasrsing JSON", err);
    }
  });
  res.status(201).send("Restaurant added successfully");
};

export const getRestaurantById = (req: IGetRestaurantReq, res: Response) => {
  console.log(
    "🚀 ~ file: restaurant.controllers.ts:64 ~ fs.readFile ~ +req.params.id",
    req.params.id
  );
  if (!validate(req.params.id)) {
    res.status(404).send("Record Not Found or Invalid Id");
  } else {
    fs.readFile("src/Data/restaurants.json", (err: any, data: string) => {
      if (err) throw err;
      try {
        let restaurantsData = JSON.parse(data);
        const object = restaurantsData.restaurants.find(
          (obj: IRestaurant) => obj.id === req.params.id
        );
        console.log(
          "🚀 ~ file: restaurant.controllers.ts:62 ~ fs.readFile ~ object",
          object
        );
        res.status(200).send(object);
        console.log("restaurant retrived");
      } catch (err) {
        console.log("Error pasrsing JSON", err);
      }
    });
  }
};

export const getRestaurantsByPincode = (
  req: IGetRestaurantsByPincodeReq,
  res: Response
) => {
  console.log(
    "🚀 ~ file: restaurant.controllers.ts:64 ~ fs.readFile ~ +req.params.pincode",
    req.params.pincode
  );
  if (isNaN(req.params.pincode)) {
    res.status(404).send("Record Not Found or Invalid pincode");
  } else {
    fs.readFile("src/Data/restaurants.json", (err: any, data: string) => {
      if (err) throw err;
      try {
        let restaurantsData = JSON.parse(data);
        const object = restaurantsData.restaurants.filter(
          (obj: IRestaurant) => {
            return obj.pincode === +req.params.pincode;
          }
        );
        console.log(
          "🚀 ~ file: restaurant.controllers.ts:62 ~ fs.readFile ~ object",
          object
        );
        res.status(200).send(object);
        console.log("restaurant retrived");
      } catch (err) {
        console.log("Error pasrsing JSON", err);
      }
    });
  }
};
