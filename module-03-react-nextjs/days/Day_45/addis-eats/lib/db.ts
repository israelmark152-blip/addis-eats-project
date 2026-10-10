export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const DISHES: Dish[] = [
  {
    id: "dish-001",
    name: "Special Doro Wot",
    description:
      "Traditional Ethiopian chicken stew seasoned with berbere and served with injera.",
    price: 450,
    category: "Traditional",
    image:
      "https://live.staticflickr.com/65535/49336635413_0edf299734_o.jpg",
  },
  {
    id: "dish-002",
    name: "Beyaynetu",
    description:
      "A colorful combination of Ethiopian vegetarian stews served on injera.",
    price: 350,
    category: "Vegetarian",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ethiopian_Fasting_Food_-_Bayenatu.jpg",
  },
  {
    id: "dish-003",
    name: "Beef Tibs",
    description:
      "Sautéed beef with onions, peppers, garlic, and Ethiopian spices.",
    price: 500,
    category: "Traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tibs.JPG",
  },
  {
    id: "dish-004",
    name: "Shiro Wot",
    description:
      "A comforting Ethiopian chickpea stew seasoned with traditional spices.",
    price: 250,
    category: "Vegetarian",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Shiro_wet.jpg",
  },
  {
    id: "dish-005",
    name: "Special Kitfo",
    description:
      "A traditional Gurage beef dish served with ayib and traditional accompaniments.",
    price: 550,
    category: "Traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kitfo_Ethiopian_Food.JPG",
  },
  {
    id: "dish-006",
    name: "Firfir",
    description:
      "Pieces of injera mixed with a spicy Ethiopian berbere sauce.",
    price: 280,
    category: "Traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Firfir.JPG",
  },
  {
    id: "dish-007",
    name: "Misir Wot and Gomen",
    description:
      "Ethiopian spiced lentils served with seasoned collard greens.",
    price: 300,
    category: "Vegetarian",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/KIK_ALICHA,_MISIR,_GOMEN_and_TIKIL_GOMEN.jpg",
  },
  {
    id: "dish-008",
    name: "Ethiopian Sambusa",
    description:
      "Crispy triangular pastries filled with seasoned lentils.",
    price: 120,
    category: "Snacks",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sambussa.jpg",
  },
  {
    id: "dish-009",
    name: "Ethiopian Food Platter",
    description:
      "A generous platter featuring injera and a selection of traditional Ethiopian dishes.",
    price: 650,
    category: "Traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ethiopia_traditional_food.JPG",
  },
  {
    id: "dish-010",
    name: "Margherita Pizza",
    description:
      "Classic pizza with tomato sauce, mozzarella cheese, and basil.",
    price: 450,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85",
  },
  {
    id: "dish-011",
    name: "Chicken Pizza",
    description:
      "Pizza topped with chicken, mozzarella, tomato sauce, and vegetables.",
    price: 550,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85",
  },
  {
    id: "dish-012",
    name: "Classic Beef Burger",
    description:
      "A grilled beef patty with lettuce, tomato, cheese, and burger sauce.",
    price: 320,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=85",
  },
  {
    id: "dish-013",
    name: "Chicken Burger",
    description:
      "A crispy chicken fillet served in a bun with fresh vegetables and sauce.",
    price: 300,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=85",
  },
  {
    id: "dish-014",
    name: "Creamy Pasta",
    description:
      "Pasta tossed in a creamy sauce with herbs and Parmesan cheese.",
    price: 380,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=85",
  },
  {
    id: "dish-015",
    name: "French Fries",
    description:
      "Golden, crispy potato fries served hot.",
    price: 150,
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=85",
  },
  {
    id: "dish-016",
    name: "Grilled Fish",
    description:
      "Seasoned grilled fish served with vegetables and lemon.",
    price: 480,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=85",
  },
  {
    id: "dish-017",
    name: "Fresh Mango Juice",
    description:
      "A refreshing mango drink made with ripe mangoes.",
    price: 120,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=85",
  },
  {
    id: "dish-018",
    name: "Ethiopian Coffee",
    description:
      "Freshly brewed Ethiopian coffee with a rich aroma.",
    price: 80,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
  },
];