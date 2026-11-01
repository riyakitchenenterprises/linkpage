/**
 * Delivery Zone & Area Checker for Riya's Kitchen | Cakes
 * Base Location: Zensar Technologies, Kharadi, Pune (18.5528° N, 73.9350° E)
 * Delivery Radius: Up to 15 km
 */

export const KITCHEN_BASE = {
  name: "Zensar Technologies, Kharadi, Pune",
  lat: 18.5528,
  lng: 73.9350,
  maxRadiusKm: 15
};

// Curated list of Pune localities and distances from Zensar Kharadi
export const PUNE_LOCALITIES = [
  { name: "Kharadi", pincode: "411014", dist: 1.5, inZone: true },
  { name: "Chandan Nagar", pincode: "411014", dist: 2.8, inZone: true },
  { name: "Wadgaon Sheri", pincode: "411014", dist: 3.5, inZone: true },
  { name: "Mundhwa", pincode: "411036", dist: 4.2, inZone: true },
  { name: "Keshav Nagar", pincode: "411036", dist: 3.8, inZone: true },
  { name: "Viman Nagar", pincode: "411014", dist: 4.8, inZone: true },
  { name: "Magarpatta City", pincode: "411028", dist: 5.5, inZone: true },
  { name: "Hadapsar", pincode: "411028", dist: 6.2, inZone: true },
  { name: "Kalyani Nagar", pincode: "411006", dist: 6.8, inZone: true },
  { name: "Wagholi", pincode: "412207", dist: 6.5, inZone: true },
  { name: "Amanora Park Town", pincode: "411028", dist: 5.9, inZone: true },
  { name: "Koregaon Park", pincode: "411001", dist: 7.5, inZone: true },
  { name: "Tingre Nagar", pincode: "411015", dist: 8.2, inZone: true },
  { name: "Lohegaon", pincode: "411047", dist: 8.5, inZone: true },
  { name: "Yerawada", pincode: "411006", dist: 8.8, inZone: true },
  { name: "Dhanori", pincode: "411015", dist: 9.5, inZone: true },
  { name: "Ghorpadi", pincode: "411001", dist: 7.8, inZone: true },
  { name: "Camp (Pune Cantonment)", pincode: "411001", dist: 10.2, inZone: true },
  { name: "Fatima Nagar", pincode: "411040", dist: 9.8, inZone: true },
  { name: "Wanowrie", pincode: "411040", dist: 10.5, inZone: true },
  { name: "Vishrantwadi", pincode: "411015", dist: 10.8, inZone: true },
  { name: "Pune Railway Station", pincode: "411001", dist: 10.5, inZone: true },
  { name: "Kondhwa", pincode: "411048", dist: 12.5, inZone: true },
  { name: "Shivajinagar", pincode: "411005", dist: 13.0, inZone: true },
  { name: "Swargate", pincode: "411042", dist: 13.8, inZone: true },
  { name: "Manjri", pincode: "412307", dist: 7.2, inZone: true },
  { name: "Fursungi", pincode: "412308", dist: 11.0, inZone: true },
  { name: "Bopodi", pincode: "411020", dist: 14.5, inZone: true },
  { name: "Aundh", pincode: "411007", dist: 16.5, inZone: false },
  { name: "Baner", pincode: "411045", dist: 19.0, inZone: false },
  { name: "Wakad", pincode: "411057", dist: 22.0, inZone: false },
  { name: "Hinjawadi", pincode: "411057", dist: 25.0, inZone: false },
  { name: "Kothrud", pincode: "411038", dist: 17.5, inZone: false },
  { name: "Pimpri", pincode: "411018", dist: 20.0, inZone: false },
  { name: "Chinchwad", pincode: "411033", dist: 22.5, inZone: false }
];

/**
 * Calculate Haversine distance between two coordinates in kilometers
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Check delivery serviceability for input query
 */
export async function checkServiceability(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return { success: false, message: "Please enter an area name or pincode." };

  // 1. Direct locality / pincode match from database
  const matched = PUNE_LOCALITIES.find(loc => 
    loc.name.toLowerCase() === q || 
    loc.pincode === q ||
    loc.name.toLowerCase().includes(q) ||
    q.includes(loc.name.toLowerCase())
  );

  if (matched) {
    return {
      success: true,
      inZone: matched.dist <= KITCHEN_BASE.maxRadiusKm,
      distanceKm: matched.dist,
      areaName: matched.name,
      pincode: matched.pincode,
      source: "database"
    };
  }

  // 2. Geocoding via OpenStreetMap for custom addresses in Pune
  try {
    const encoded = encodeURIComponent(`${query}, Pune, Maharashtra, India`);
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=1`, {
      headers: { "Accept-Language": "en" }
    });
    
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.length > 0) {
        const place = data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const dist = calculateDistanceKm(KITCHEN_BASE.lat, KITCHEN_BASE.lng, lat, lng);

        return {
          success: true,
          inZone: dist <= KITCHEN_BASE.maxRadiusKm,
          distanceKm: dist,
          areaName: place.display_name.split(',')[0],
          source: "nominatim"
        };
      }
    }
  } catch (err) {
    // Fallback if network blocked
  }

  // 3. Fallback message if area not recognized
  return {
    success: false,
    message: `We couldn't accurately locate "${query}". We deliver anywhere within 15 km of Zensar Kharadi (Viman Nagar, Hadapsar, Magarpatta, Koregaon Park, Wagholi, Kalyani Nagar & more). Feel free to confirm on WhatsApp!`
  };
}

/**
 * Check serviceability via device GPS location
 */
export function checkGPSLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ success: false, message: "Geolocation is not supported by your browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const dist = calculateDistanceKm(KITCHEN_BASE.lat, KITCHEN_BASE.lng, lat, lng);

        resolve({
          success: true,
          inZone: dist <= KITCHEN_BASE.maxRadiusKm,
          distanceKm: dist,
          areaName: "Your Current Location",
          source: "gps"
        });
      },
      (err) => {
        let errorMsg = "Unable to fetch location. Please enter your area name or pincode above.";
        if (err.code === 1) errorMsg = "Location permission denied. Please enter your area manually.";
        resolve({ success: false, message: errorMsg });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
