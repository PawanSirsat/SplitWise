export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export interface UniqueUserIdsResponse {
  data: any[]; // Adjust this based on the actual structure of your response data
  isLoading: boolean;
  // Add any other properties you might expect in the response
}

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewGroup = {
  userId: string;
  groupName: string;
  members: string[];
};

export type INewExpense = {
  desc: string;
  paidBy: string;
  group: string;
  Time: string;
  splitMember: string[];
  amount: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type INewFriend = {
  currentId: string;
  friendId: string;
};

export const imageKeywordPairs = [
  {
    name: "coffee",
    keywords: [
      "coffee",
      "chai",
      "milk",
      "espresso",
      "latte",
      "cappuccino",
      "americano",
      "barista",
      "beans",
      "brew",
      "caffeine",
      "cup",
      "mug",
      "aroma",
      "roast",
    ],
  },
  {
    name: "chicken",
    keywords: [
      "chicken",
      "meat",
      "beef",
      "grilled",
      "fried",
      "roast",
      "barbecue",
      "wing",
      "drumstick",
      "marinated",
      "spicy",
    ],
  },
  {
    name: "burger",
    keywords: [
      "burger",
      "bread",
      "breakfast",
      "cheeseburger",
      "veggie burger",
      "bun",
      "fast food",
      "ketchup",
      "mustard",
      "lettuce",
      "tomato",
    ],
  },
  {
    name: "pizza",
    keywords: [
      "pizza",
      "dominos",
      "slice",
      "cheese",
      "pepperoni",
      "crust",
      "delivery",
      "italian",
      "mushroom",
      "olive",
      "tomato sauce",
    ],
  },
  {
    name: "food",
    keywords: [
      "food",
      "restaurant",
      "restro",
      "panipuri",
      "dinner",
      "lunch",
      "plate",
      "culinary",
      "gastronomy",
      "meal",
    ],
  },
  {
    name: "cart",
    keywords: [
      "order",
      "amazon",
      "flipkart",
      "shopping",
      "basket",
      "online",
      "purchase",
      "checkout",
    ],
  },
  {
    name: "grocery",
    keywords: [
      "grocery",
      "dmart",
      "mart",
      "shopping",
      "supermarket",
      "aisle",
      "products",
      "basket",
    ],
  },
  {
    name: "list",
    keywords: [
      "list",
      "checklist",
      "items",
      "planning",
      "organization",
      "task",
      "note",
    ],
  },
  {
    name: "fruits",
    keywords: [
      "fruit",
      "fruits",
      "mangoes",
      "mango",
      "apple",
      "banana",
      "orange",
      "grapes",
      "kiwi",
      "pineapple",
    ],
  },
  {
    name: "shop",
    keywords: [
      "shop",
      "store",
      "retail",
      "buy",
      "retail therapy",
      "mall",
      "boutique",
    ],
  },
  {
    name: "icecream",
    keywords: [
      "ice",
      "icecream",
      "sundae",
      "cone",
      "flavors",
      "chocolate",
      "vanilla",
      "strawberry",
    ],
  },
  {
    name: "vegetable",
    keywords: [
      "vegetable",
      "veg",
      "vegetable",
      "green",
      "healthy",
      "fresh",
      "organic",
      "market",
    ],
  },
];
