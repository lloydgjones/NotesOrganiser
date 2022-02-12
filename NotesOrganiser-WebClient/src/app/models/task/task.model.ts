import { Item } from "../item/item.model";

export class Task implements Item {
  _id:any;
  account:any;
  name:any;
  content:any;
  time: Date;
  weight:Number;
}
