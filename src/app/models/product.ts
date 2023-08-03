export interface Product {
  _id:string
  brand:string;
  category:string;
  description:string;
  price:number;
  rating:number;
  thumbnail:string;
  title: string;
  images: [string];
  quantity:undefined |number
}

