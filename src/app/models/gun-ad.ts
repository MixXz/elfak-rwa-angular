import { Category } from "./category";
import { User } from "./user";

export interface GunAd {
    id: string;
    title: string;
    description: string;
    brand: string;
    caliber: string;
    price: number;
    gallery: string[];
    category: Category;
    createdBy?: User;
  }
  