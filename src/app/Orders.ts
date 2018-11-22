import { Item } from './shared/items/item';

export class Orders {
  id?: string;
  order_giver_id?: string;
  item?: Item;
  order_date?: string;
  isComplete?: Boolean;
}
