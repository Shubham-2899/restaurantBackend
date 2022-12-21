import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4, validate } from "uuid";
import { validateRequestForAddRestaurantAPI } from "../helper";
import {
  IErrorObj,
  IGetRestaurantReq,
  IGetRestaurantsByPincodeReq,
  IRestaurant,
} from "../Utils/interfaces";
import { promises as fs } from "fs";

export const getHomePage = async (req: Request, res: Response) => {
  res.send("<div><h3>Welcome to Fake Restaurant API</h3></div>");
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("src/Data/restaurants.json", "utf-8");
    let restaurantsData = JSON.parse(data);
    res.send(restaurantsData.restaurants);
  } catch (error) {
    console.log("Error pasrsing JSON", error);
  }
};

export const addRestaurant = (req: Request, res: Response) => {
  const errorObj: IErrorObj = validateRequestForAddRestaurantAPI(req.body);
  if (!(Object.keys(errorObj).length === 0)) {
    res.status(400).send(errorObj);
  } else {
    const new_res: IRestaurant = {
      id: uuidv4(),
      ...req.body,
    };
    fs.readFile("src/Data/restaurants.json", "utf-8")
      .then(async (result) => {
        let restaurantsData = JSON.parse(result);
        restaurantsData["restaurants"].push(new_res);
        try {
          await fs.writeFile(
            "src/Data/restaurants.json",
            JSON.stringify(restaurantsData, null, 2)
          );
          console.log("Data written to file");
          console.log(restaurantsData);
          res.status(201).send("Restaurant added successfully");
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        console.log("Error while adding restaurant", err);
      });
  }
};

export const getRestaurantById = (req: IGetRestaurantReq, res: Response) => {
  if (!validate(req.params.id)) {
    res.status(400).send("Invalid Id");
  } else {
    fs.readFile("src/Data/restaurants.json", "utf-8")
      .then(async (result) => {
        let restaurantsData = JSON.parse(result);
        const object: IRestaurant | undefined =
          restaurantsData.restaurants.find(
            (obj: IRestaurant) => obj.id === req.params.id
          );
        if (object === undefined) {
          res.status(404).send("Record Not Found");
          return;
        } else {
          res.status(200).send(object);
          console.log("restaurant retrived");
        }
      })
      .catch((err) => {
        console.log("Error while finding restaurant", err);
      });
  }
};

export const getRestaurantsByPincode = (
  req: IGetRestaurantsByPincodeReq,
  res: Response
) => {
  if (isNaN(req.params.pincode) || req.params.pincode.toString().length !== 6) {
    res.status(400).send("Invalid pincode");
  } else {
    fs.readFile("src/Data/restaurants.json", "utf-8")
      .then(async (result) => {
        let restaurantsData = JSON.parse(result);
        const object: IRestaurant[] = restaurantsData.restaurants.filter(
          (obj: IRestaurant) => {
            return obj.pincode === +req.params.pincode;
          }
        );
        if (object.length === 0) {
          res.status(404).send("Record Not Found");
          return;
        } else {
          res.status(200).send(object);
          console.log("restaurant retrived");
        }
      })
      .catch((err) => {
        console.log("Error while finding restaurant", err);
      });
  }
};

export const deleteRestaurantById = (req: Request, res: Response) => {
  if (!validate(req.params.id)) {
    res.status(400).send("Invalid Id");
  } else {
    fs.readFile("src/Data/restaurants.json", "utf-8")
      .then(async (result) => {
        let restaurantsData = JSON.parse(result);
        const object: IRestaurant[] = restaurantsData.restaurants.filter(
          (obj: IRestaurant) => {
            return obj.id !== req.params.id;
          }
        );
        if (object.length === restaurantsData.restaurants.length) {
          res.status(404).send("Record Not Found");
          return;
        } else {
          restaurantsData.restaurants = object;
          try {
            await fs.writeFile(
              "src/Data/restaurants.json",
              JSON.stringify(restaurantsData, null, 2)
            );
            console.log("record deleted");
            res.status(200).send("Record deleted successfully");
          } catch (error) {
            console.error(error);
          }
        }
      })
      .catch((err) => {
        console.log("Error while deleting restaurant", err);
      });
  }
};

export const updateRestaurantById = (req: Request, res: Response) => {
  // req.body._fromUpdate = false;
  const errorObj: IErrorObj = validateRequestForAddRestaurantAPI(req.body);
  if (!validate(req.params.id)) {
    res.status(400).send("Invalid Id");
  } else if (!(Object.keys(errorObj).length === 0)) {
    res.status(400).send(errorObj);
  } else {
    fs.readFile("src/Data/restaurants.json", "utf-8")
      .then(async (result) => {
        let restaurantsData = JSON.parse(result);
        const index = restaurantsData.restaurants.findIndex(
          (obj: IRestaurant) => obj.id === req.params.id
        );
        restaurantsData.restaurants[index] = {
          ...restaurantsData.restaurants[index],
          ...req.body,
        };
        try {
          await fs.writeFile(
            "src/Data/restaurants.json",
            JSON.stringify(restaurantsData, null, 2)
          );
          console.log("Data written to file");
          res.status(200).send("Record updated successfully");
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        console.log("Error while updating restaurant", err);
      });
  }
};
