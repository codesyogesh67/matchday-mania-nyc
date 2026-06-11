export type Vibe = "Rowdy" | "Chill" | "International" | "Classic Pub" | "Family";
export type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Hoboken" | "Jersey City";

export type Bar = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  neighborhood: string;
  borough: Borough;
  vibe: Vibe;
  rating: number;
  price: "$" | "$$" | "$$$";
  supports: string[];
  distance: string;
  specialsTemplate: string;
  tags?: string[];
  hot?: boolean;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type RawBar = Omit<Bar, "id"> & { id?: string };
const RAW: RawBar[] = [
  // MANHATTAN
  { name: "Mustang Harry's", address: "352 7th Ave, New York, NY 10001", phone: "(212) 629-0006", neighborhood: "Midtown", borough: "Manhattan", vibe: "Rowdy", rating: 4.4, price: "$$", supports: [], distance: "—", specialsTemplate: "Game day specials", tags: ["20+ TVs", "Official Watch Party"], hot: true },
  { name: "Magic Hour Rooftop", address: "485 7th Ave (Moxy Times Square Hotel), New York, NY 10018", phone: "(212) 967-6969", neighborhood: "Midtown", borough: "Manhattan", vibe: "Chill", rating: 4.5, price: "$$$", supports: [], distance: "—", specialsTemplate: "Rooftop watch party", tags: ["Rooftop", "Retractable Roof"], hot: true },
  { name: "Virgil's Real BBQ", address: "152 W 44th St, New York, NY 10036", phone: "(212) 921-9494", neighborhood: "Times Square", borough: "Manhattan", vibe: "Family", rating: 4.3, price: "$$", supports: [], distance: "—", specialsTemplate: "BBQ + match", tags: ["Full BBQ Menu", "Times Sq"] },
  { name: "Stout NYC", address: "215 W 35th St, New York, NY 10001", phone: "(212) 629-6191", neighborhood: "Midtown", borough: "Manhattan", vibe: "Rowdy", rating: 4.3, price: "$$", supports: [], distance: "—", specialsTemplate: "Epic TV setup", tags: ["Near MSG", "Rowdy"] },
  { name: "Legends Bar", address: "6 W 33rd St, New York, NY 10001", phone: "(212) 967-7792", neighborhood: "Midtown", borough: "Manhattan", vibe: "Classic Pub", rating: 4.2, price: "$$", supports: [], distance: "—", specialsTemplate: "3 floors of sports", tags: ["3 Floors", "Near MSG"] },
  { name: "Goldie's Tavern", address: "135 W 30th St, New York, NY 10001", phone: "(212) 643-9367", neighborhood: "Chelsea", borough: "Manhattan", vibe: "Chill", rating: 4.1, price: "$$", supports: [], distance: "—", specialsTemplate: "Tavern specials", tags: ["Chill Vibe"] },
  { name: "Crompton Ale House", address: "159 W 26th St, New York, NY 10001", phone: "(212) 255-9745", neighborhood: "Chelsea", borough: "Manhattan", vibe: "Classic Pub", rating: 4.0, price: "$$", supports: [], distance: "—", specialsTemplate: "Ale + match", tags: ["Ale House"] },
  { name: "The Ainsworth", address: "45 E 33rd St, New York, NY 10016", phone: "(212) 518-7598", neighborhood: "Midtown", borough: "Manhattan", vibe: "Rowdy", rating: 3.9, price: "$$", supports: [], distance: "—", specialsTemplate: "Lively rooftop", tags: ["Rooftop", "Lively"] },
  { name: "Amity Hall", address: "80 W 3rd St, New York, NY 10012", phone: "(212) 337-0019", neighborhood: "West Village", borough: "Manhattan", vibe: "Chill", rating: 4.2, price: "$$", supports: [], distance: "—", specialsTemplate: "Downtown chill", tags: ["Downtown"] },
  { name: "Hurley's Saloon", address: "232 W 48th St, New York, NY 10036", phone: "(212) 765-8981", neighborhood: "Midtown", borough: "Manhattan", vibe: "Classic Pub", rating: 4.1, price: "$$", supports: [], distance: "—", specialsTemplate: "Classic NYC saloon", tags: ["Classic NYC Bar"] },
  { name: "Harlem Tavern", address: "2153 Frederick Douglass Blvd, New York, NY 10026", phone: "(212) 866-4500", neighborhood: "Harlem", borough: "Manhattan", vibe: "Chill", rating: 4.3, price: "$$", supports: [], distance: "—", specialsTemplate: "Beer garden watch party", tags: ["Beer Garden", "Uptown"] },
  { name: "Standings Bar", address: "43 E 7th St, New York, NY 10003", phone: "(212) 420-0671", neighborhood: "East Village", borough: "Manhattan", vibe: "Classic Pub", rating: 4.6, price: "$$", supports: [], distance: "—", specialsTemplate: "Old NY intimate", tags: ["Old NY Feel", "Intimate"], hot: true },
  { name: "Nevada Smiths", address: "100 3rd Ave, New York, NY 10003", phone: "(917) 402-1510", neighborhood: "East Village", borough: "Manhattan", vibe: "International", rating: 3.9, price: "$$", supports: [], distance: "—", specialsTemplate: "Home of football", tags: ["3 Floors", "Global Sports"] },
  // BROOKLYN
  { name: "FancyFree", address: "175 DeKalb Ave, Brooklyn, NY 11205", phone: "(718) 522-0400", neighborhood: "Fort Greene", borough: "Brooklyn", vibe: "Chill", rating: 4.5, price: "$$", supports: [], distance: "—", specialsTemplate: "Cocktail watch party", tags: ["Cocktails", "Local Fave"], hot: true },
  { name: "The Dram Shop", address: "339 9th St, Brooklyn, NY 11215", phone: "(718) 788-1444", neighborhood: "Park Slope", borough: "Brooklyn", vibe: "Rowdy", rating: 4.6, price: "$$", supports: [], distance: "—", specialsTemplate: "7 TVs + projector", tags: ["Projector", "Best Brooklyn Bar"], hot: true },
  { name: "Time Out Market", address: "55 Water St, Brooklyn, NY 11201", phone: "(929) 337-8666", neighborhood: "DUMBO", borough: "Brooklyn", vibe: "Family", rating: 4.3, price: "$$", supports: [], distance: "—", specialsTemplate: "Food hall watch", tags: ["Food Hall", "2 Floors"] },
  { name: "Black Forest Brooklyn", address: "733 Flatbush Ave, Brooklyn, NY 11226", phone: "(718) 856-1700", neighborhood: "Flatbush", borough: "Brooklyn", vibe: "International", rating: 4.2, price: "$$", supports: [], distance: "—", specialsTemplate: "Steins + projection", tags: ["Beer Hall", "Patio"] },
  { name: "Baker's Bar", address: "1 Cornelia St, Brooklyn, NY 11201", phone: "(718) 643-2523", neighborhood: "Carroll Gardens", borough: "Brooklyn", vibe: "Chill", rating: 4.1, price: "$$", supports: [], distance: "—", specialsTemplate: "Local cozy spot", tags: ["Cozy", "Local Spot"] },
  { name: "Brooklyn Bowl", address: "61 Wythe Ave, Brooklyn, NY 11249", phone: "(718) 963-3369", neighborhood: "Williamsburg", borough: "Brooklyn", vibe: "Rowdy", rating: 4.4, price: "$$", supports: [], distance: "—", specialsTemplate: "Bowling + big screens", tags: ["Huge Space", "Full Bar"] },
  { name: "Brooklyn Crab", address: "24 Reed St, Brooklyn, NY 11231", phone: "(718) 643-2722", neighborhood: "Red Hook", borough: "Brooklyn", vibe: "Family", rating: 4.0, price: "$$", supports: [], distance: "—", specialsTemplate: "Waterfront watch", tags: ["Waterfront", "Seafood"] },
  // QUEENS
  { name: "Pig Beach Astoria", address: "33-02 Vernon Blvd, Astoria, NY 11106", phone: "(718) 440-0900", neighborhood: "Astoria", borough: "Queens", vibe: "Rowdy", rating: 4.7, price: "$$", supports: [], distance: "—", specialsTemplate: "28ft jumbotron", tags: ["65 TVs", "Outdoor BBQ"], hot: true },
  { name: "One Station Plaza", address: "21310 41st Ave, Bayside, NY 11361", phone: "(718) 229-9660", neighborhood: "Bayside", borough: "Queens", vibe: "Classic Pub", rating: 4.0, price: "$$", supports: [], distance: "—", specialsTemplate: "Local watch spot", tags: ["Local Spot"] },
  // BRONX
  { name: "Rambling House", address: "4292 Katonah Ave, Bronx, NY 10470", phone: "(718) 994-7480", neighborhood: "Woodlawn", borough: "Bronx", vibe: "Classic Pub", rating: 4.1, price: "$$", supports: [], distance: "—", specialsTemplate: "Irish pub + match", tags: ["Irish Pub", "Bronx Staple"] },
];

export const BARS: Bar[] = RAW.map(b => ({ ...b, id: b.id ?? slug(b.name) }));
