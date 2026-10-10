export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Traditional" | "Vegetarian" | "Drinks";
  image: string;
}

export const DISHES: Dish[] = [
  {
    id: "1",
    name: "Special Doro Wot",
    description: "Slow-cooked spicy chicken stew served with hard-boiled egg and injera.",
    price: 450,
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=80",
  },
  {
    id: "2",
    name: "Beyaynetu",
    description: "Assorted vegetarian stews including shiro, lentils, collard greens, and cabbage.",
    price: 300,
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "3",
    name: "Tibs",
    description: "Sautéed beef cooked with onions, garlic, rosemary, and green chilies.",
    price: 500,
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  },
  {
    id: "4",
    name: "Tej (Ethiopian Honey Wine)",
    description: "Traditional fermented honey wine with a rich floral sweetness.",
    price: 150,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
  },
];