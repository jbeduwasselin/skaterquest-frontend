//Cette implementation de la formule d'haversine approxime
//les fonctions atan2 et sin pour des petites distances
export function lightHaversine(
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = φ2 - φ1;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  // Mean latitude for cosine term
  const φm = (φ1 + φ2) / 2;
  // Taylor series expansion terms
  const x = Δλ * Math.cos(φm);
  const y = Δφ;
  const d = Math.sqrt(x * x + y * y);
  // Third-order correction terms
  const k1 = (3 * x * x * y - y * y * y) / (6 * R * R);
  const k2 = (3 * y * y * x - x * x * x) / (6 * R * R);

  return R * d * (1 + (k1 + k2));
}

export function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}
