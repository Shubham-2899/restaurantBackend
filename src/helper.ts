import { ifError } from "assert";
import { isError } from "util";
import { IErrorObj } from "./Utils/interfaces";

export const validateRequestForAddRestaurantAPI = (body: any): IErrorObj => {
  const errorObj: IErrorObj = {};
  for (var key in body) {
    switch (key) {
      case "name":
        if (!body.name || body.name === " ") {
          errorObj["name"] = "Restaurant name can not be empty";
        }
        break;
      case "city":
        if (!body.city || body.city === " ") {
          errorObj["city"] = "City name can not be empty";
        }
        break;
      case "pincode":
        if (typeof body.pincode != "number") {
          errorObj["pincode"] = "pincode must be number";
        } else if (body.pincode.toString().length !== 6) {
          errorObj["pincode"] = "pincode must be 6 digit long code";
        }
        break;
      case "food_type":
        if (!["veg", "non-veg", "both"].includes(body.food_type)) {
          errorObj["food_type"] = "Invalid food_type";
        }
        break;
    }
  }
  return errorObj;
};
