import { Request } from "express";
export interface IRestaurant {
  id: number;
  name: string;
  food_type: "veg" | "non-veg" | "both";
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
