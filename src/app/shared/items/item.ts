export class Item {
    id: string;
    name: string;
    category?: ItemCategory;
    description?: string;
    pictureUrl?: string;
}

export enum ItemCategory {
    Coffee = 'COFFEE',
    Tea = 'TEA',
    Fruits = 'FRUITS',
    Custom = 'CUSTOM'
}
