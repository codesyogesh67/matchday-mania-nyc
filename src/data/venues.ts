export const VENUES: Record<string, { name: string; city: string; country: string }> = {
  metlife: { name: "MetLife Stadium", city: "East Rutherford, NJ", country: "USA" },
  sofi: { name: "SoFi Stadium", city: "Los Angeles, CA", country: "USA" },
  att: { name: "AT&T Stadium", city: "Arlington, TX", country: "USA" },
  levis: { name: "Levi's Stadium", city: "Santa Clara, CA", country: "USA" },
  mercedes: { name: "Mercedes-Benz Stadium", city: "Atlanta, GA", country: "USA" },
  hardrock: { name: "Hard Rock Stadium", city: "Miami Gardens, FL", country: "USA" },
  lincoln: { name: "Lincoln Financial Field", city: "Philadelphia, PA", country: "USA" },
  gillette: { name: "Gillette Stadium", city: "Foxborough, MA", country: "USA" },
  arrowhead: { name: "Arrowhead Stadium", city: "Kansas City, MO", country: "USA" },
  lumen: { name: "Lumen Field", city: "Seattle, WA", country: "USA" },
  bcplace: { name: "BC Place", city: "Vancouver, BC", country: "Canada" },
  bmofield: { name: "BMO Field", city: "Toronto, ON", country: "Canada" },
  azteca: { name: "Estadio Azteca", city: "Mexico City", country: "Mexico" },
  akron: { name: "Estadio Akron", city: "Guadalajara", country: "Mexico" },
  monterrey: { name: "Estadio BBVA", city: "Monterrey", country: "Mexico" },
};

export type VenueId = keyof typeof VENUES;
