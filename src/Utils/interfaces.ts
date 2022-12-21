import { Request } from "express";

export type FOOD_TYPE = "veg" | "non-veg" | "both";
export interface IRestaurant {
  id: string;
  name: string;
  food_type: FOOD_TYPE;
  city: string;
  area: string;
  pincode: number;
  description: string;
  opening_time: Date;
  closing_time: Date;
}

export interface IGetRestaurantReq extends Request<{ id: IRestaurant["id"] }> {}
export interface IGetRestaurantsByPincodeReq
  extends Request<{ pincode: IRestaurant["pincode"] }> {}
export interface IAddRestaurantReq extends Request {}
