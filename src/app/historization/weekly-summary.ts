import { Item } from '../shared/items/item';

export class WeeklySummary {
    items: Item[];
    week: string;

    constructor(items: Item[], week: string) {
        this.items = items;
        this.week = week;
    }
}
