export type Vibe = "Rowdy" | "Chill" | "International" | "Classic Pub" | "Family";
export type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Hoboken" | "Jersey City";

export type Bar = {
  id: string;
  name: string;
  neighborhood: string;
  borough: Borough;
  vibe: Vibe;
  rating: number;
  price: "$" | "$$" | "$$$";
  supports: string[]; // team ids
  distance: string;
  specialsTemplate: string;
};

export const BARS: Bar[] = [
  { id: "futebol-social", name: "Futebol Social", neighborhood: "Astoria", borough: "Queens", vibe: "International", rating: 4.8, price: "$$", supports: ["bra","arg","por"], distance: "1.2 mi", specialsTemplate: "$5 caipirinhas on every goal" },
  { id: "lions-den", name: "The Lion's Den", neighborhood: "Hell's Kitchen", borough: "Manhattan", vibe: "Classic Pub", rating: 4.6, price: "$$", supports: ["eng","sco"], distance: "0.8 mi", specialsTemplate: "£5 pints all match" },
  { id: "samba-lounge", name: "Samba Lounge", neighborhood: "Little Brazil", borough: "Manhattan", vibe: "Rowdy", rating: 4.9, price: "$$", supports: ["bra"], distance: "0.5 mi", specialsTemplate: "Free shots when Brazil scores" },
  { id: "borough-tap", name: "The Borough Tap", neighborhood: "Williamsburg", borough: "Brooklyn", vibe: "Chill", rating: 4.5, price: "$$", supports: ["usa","can"], distance: "2.1 mi", specialsTemplate: "$3 Bud Lights kickoff to whistle" },
  { id: "futbol-republic", name: "Futbol Republic", neighborhood: "Lower East Side", borough: "Manhattan", vibe: "Rowdy", rating: 4.7, price: "$$", supports: ["arg","mex","usa"], distance: "1.6 mi", specialsTemplate: "Buy-one-get-one wings" },
  { id: "el-azteca", name: "El Azteca Cantina", neighborhood: "Sunset Park", borough: "Brooklyn", vibe: "International", rating: 4.7, price: "$", supports: ["mex"], distance: "3.4 mi", specialsTemplate: "$4 Modelos, $6 micheladas" },
  { id: "die-stube", name: "Die Stube", neighborhood: "Yorkville", borough: "Manhattan", vibe: "Classic Pub", rating: 4.4, price: "$$", supports: ["ger","aut","sui"], distance: "2.0 mi", specialsTemplate: "Stein specials + pretzels" },
  { id: "pitch-32", name: "Pitch 32", neighborhood: "Hoboken", borough: "Hoboken", vibe: "Rowdy", rating: 4.6, price: "$$", supports: ["usa","arg","ita"], distance: "4.5 mi", specialsTemplate: "$2 off drafts during match" },
  { id: "blue-stone", name: "Blue Stone Lane", neighborhood: "Greenpoint", borough: "Brooklyn", vibe: "Chill", rating: 4.3, price: "$$", supports: ["aus","eng"], distance: "3.0 mi", specialsTemplate: "Flat whites + Tooheys" },
  { id: "the-celtic", name: "The Celtic Cross", neighborhood: "Murray Hill", borough: "Manhattan", vibe: "Classic Pub", rating: 4.5, price: "$$", supports: ["sco","eng","irl"], distance: "1.1 mi", specialsTemplate: "Guinness happy hour all match" },
  { id: "the-cup-jc", name: "The Cup", neighborhood: "Downtown JC", borough: "Jersey City", vibe: "International", rating: 4.6, price: "$$", supports: ["por","esp","bra"], distance: "5.2 mi", specialsTemplate: "Tapas trio $15" },
  { id: "saigon-soccer", name: "Saigon Soccer Club", neighborhood: "Bushwick", borough: "Brooklyn", vibe: "Chill", rating: 4.4, price: "$", supports: ["jpn","kor"], distance: "4.1 mi", specialsTemplate: "Pho + Sapporo combo $14" },
  { id: "park-pitch", name: "Park & Pitch", neighborhood: "Park Slope", borough: "Brooklyn", vibe: "Family", rating: 4.2, price: "$$", supports: ["usa","mex","can"], distance: "3.6 mi", specialsTemplate: "Kids eat free during day matches" },
  { id: "the-touchline", name: "The Touchline", neighborhood: "Long Island City", borough: "Queens", vibe: "Rowdy", rating: 4.8, price: "$$", supports: ["arg","uru","col"], distance: "1.9 mi", specialsTemplate: "Asado plates + Quilmes towers" },
  { id: "fc-bronx", name: "FC Bronx", neighborhood: "Mott Haven", borough: "Bronx", vibe: "International", rating: 4.5, price: "$", supports: ["dom","mex","usa"], distance: "6.8 mi", specialsTemplate: "Tres Leches shots when home team scores" },
  { id: "the-pitchman", name: "The Pitchman", neighborhood: "East Village", borough: "Manhattan", vibe: "Rowdy", rating: 4.7, price: "$$", supports: ["eng","ned","ger"], distance: "1.4 mi", specialsTemplate: "Half-off cocktails at halftime" },
  { id: "casa-mineira", name: "Casa Mineira", neighborhood: "Newark Ave", borough: "Jersey City", vibe: "International", rating: 4.7, price: "$$", supports: ["bra","por"], distance: "5.5 mi", specialsTemplate: "Feijoada Saturday" },
  { id: "wembley-west", name: "Wembley West", neighborhood: "Chelsea", borough: "Manhattan", vibe: "Classic Pub", rating: 4.4, price: "$$$", supports: ["eng"], distance: "1.0 mi", specialsTemplate: "Fish & chips $12 on matchdays" },
];
