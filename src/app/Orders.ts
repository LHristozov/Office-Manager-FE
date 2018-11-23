import { Item } from './shared/items/item';

export class Orders {
  id: number;
  order_giver_id?: number;
  item?: Item;
  order_date?: string;
  isComplete?: boolean;
}
