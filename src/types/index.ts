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

export type ISettlement = {
  payerId: string;
  receiverId: string;
  amount: number;
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
  group: string;
  list: string;
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
    name: "ticket",
    keywords: [
      "ticket",
      "tickets",
      "admission",
      "pass",
      "entry",
      "fare",
      "booking",
      "reservation",
      "seat",
      "concert ticket",
      "movie ticket",
      "event ticket",
      "flight ticket",
      "train ticket",
      "bus ticket",
      "theater ticket",
      "sporting event ticket",
      "show ticket",
      "festival ticket",
      "conference ticket",
      "workshop ticket",
      "expo ticket",
      "exhibition ticket",
      "tour ticket",
      "parking ticket",
      "speeding ticket",
    ],
  },
  {
    name: "car",
    keywords: [
      "car",
      "cab",
      "uber",
      "lyft",
      "taxi",
      "vehicle",
      "rental",
      "hire",
      "vehicle rental",
      "fuel",
      "gas",
      "petrol",
      "diesel",
      "parking",
      "toll",
      "maintenance",
      "repair",
      "insurance",
      "carpool",
      "ride sharing",
      "commute",
      "split fare",
      "fare",
      "road trip",
      "mileage",
      "travel",
      "journey",
      "lease",
      "driver",
      "shared ride",
      "car expenses",
    ],
  },
  {
    name: "bills",
    keywords: [
      "bill",
      "bills",
      "wifi",
      "recharge",
      "invoice",
      "receipt",
      "statement",
      "tab",
      "charge",
      "fee",
      "payment",
      "account",
      "balance",
      "debt",
      "dues",
      "expenses",
      "cost",
      "rent",
      "utilities",
      "electricity bill",
      "water bill",
      "gas bill",
      "internet bill",
      "phone bill",
      "subscription",
      "membership",
      "insurance",
      "credit bill",
      "loan payment",
      "mortgage",
      "medical bill",
      "tuition bill",
      "service charge",
      "finance charge",
    ],
  },
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
  {
    name: "beer",
    keywords: [
      "beer",
      "party",
      "whisky",
      "rum",
      "daru",
      "vodka",
      "pepsi",
      "tequila",
      "brandy",
      "gin",
      "wine",
      "scotch",
      "bourbon",
      "liqueur",
      "cider",
      "sake",
      "mezcal",
      "champagne",
      "martini",
      "cocktail",
      "punch",
      "margarita",
      "soda",
      "cola",
      "spirits",
      "alcohol",
      "booze",
      "brew",
      "stout",
      "lager",
      "ale",
      "malt",
      "draught",
      "pilsner",
      "porter",
      "absinthe",
      "moonshine",
      "schnapps",
      "cooler",
    ],
  },
];

export const imageKeywordPairsGroup = [
  {
    name: "group",
    keywords: ["group", "groups"],
  },
  {
    name: "trip",
    keywords: [
      "trip",
      "vacation",
      "journey",
      "adventure",
      "road trip",
      "holiday",
      "tour",
      "excursion",
      "getaway",
      "expedition",
      "itinerary",
      "backpacking",
      "sightseeing",
      "destination",
    ],
  },
  {
    name: "travel",
    keywords: [
      "travel",
      "explore",
      "journey",
      "voyage",
      "tourism",
      "globetrotter",
      "backpacking",
      "sightseeing",
      "adventure",
      "expedition",
      "holiday",
      "cruise",
      "road trip",
      "flight",
    ],
  },
  {
    name: "roommate",
    keywords: [
      "roommate",
      "flatmate",
      "housemate",
      "living",
      "shared living",
      "apartment",
      "rent",
      "household",
      "tenant",
      "cohabitation",
      "room sharing",
      "living together",
      "shared space",
      "shared expenses",
      "community living",
    ],
  },
  {
    name: "film",
    keywords: [
      "film",
      "movie",
      "cinema",
      "motion picture",
      "screen",
      "director",
      "actor",
      "actress",
      "producer",
      "filmmaking",
      "screenplay",
      "script",
      "genre",
      "blockbuster",
      "indie film",
    ],
  },
  {
    name: "club",
    keywords: [
      "club",
      "association",
      "group",
      "organization",
      "society",
      "community",
      "team",
      "membership",
      "social",
      "gathering",
      "meetup",
      "event",
      "networking",
      "interest group",
      "activity",
    ],
  },
];
