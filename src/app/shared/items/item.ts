export class Item {
  id: string;
  name: string;
  category?: ItemCategory;
  description?: string;
  pictureUrl?: string;
  isDisabled?: Boolean;
  isComplete?: Boolean = false;
    isRequested?: Boolean;
}

export enum ItemCategory {
    Coffee = 'COFFEE',
    Tea = 'TEA',
    Fruits = 'FRUITS',
    Custom = 'CUSTOM',
    Other = 'OTHER'
}
