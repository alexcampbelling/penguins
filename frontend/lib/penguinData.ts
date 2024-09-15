export type PenguinData = {
  id: string;
  name: string;
  suburb?: string;
  street?: string;
  imageUrl: string;
  rarity?: string;
};

// The keys are the URL endings on the qr codes to differentiate them.
export const penguinData: Record<string, PenguinData> = {
  TM7l7t: {
    id: "TM7l7t",
    name: "Men in Black Penguin",
    suburb: "Kensington",
    imageUrl: "/images/penguin_mib.jpg",
    rarity: "common",
  },
  Wkoykt: {
    id: "Wkoykt",
    name: "Gangster Penguin",
    suburb: "Flemington",
    imageUrl: "/images/penguin_gangster.jpg",
    rarity: "common",
  },
  Lp9m2x: {
    id: "Lp9m2x",
    name: "Surfer Penguin",
    street: "Beach Rd",
    imageUrl: "/images/penguin_surfer.png",
    rarity: "rare",
  },
};
