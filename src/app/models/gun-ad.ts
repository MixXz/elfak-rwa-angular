import { User } from "./user";

export interface GunAd {
    id: string;
    title: string;
    description: string;
    brand: string;
    caliber: string;
    price: number;
    gallery: string[];
    categoryId: number;
    creator?: User;
    
  }
  