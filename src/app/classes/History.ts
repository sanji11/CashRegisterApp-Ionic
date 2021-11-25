import { Product } from "./Product";

export interface History extends Product{

    totalPrice: number;
    dateTime: Date;
}