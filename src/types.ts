interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface ShoppingList {
  id: string;
  date: string;
  items: Item[];
}

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
}

export interface ApiResponse {
  data: ShoppingItem;
}
