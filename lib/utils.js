// Formule d'Haversine approximatise les fonctions atan2 et sin pour des petites distances
export function lightHaversine(
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = φ2 - φ1;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const φm = (φ1 + φ2) / 2;
  const x = Δλ * Math.cos(φm);
  const y = Δφ;
  const d = Math.sqrt(x * x + y * y);
  const k1 = (3 * x * x * y - y * y * y) / (6 * R * R);
  const k2 = (3 * y * y * x - x * x * x) / (6 * R * R);

  return R * d * (1 + (k1 + k2));
}

export function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatDate(creationDate) {
  const date = new Date(creationDate);
  return ` ${new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date)} ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
}


// Entre 1 et 15 caractères sans caractères spéciaux
export const USERNAME_REGEX = /^[a-z0-9\s.,]{1,15}$/i;

// Format adresse email
export const EMAIL_REGEX = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/i;

// Minimum 4 caractères
export const PASSWORD_REGEX = /^.{4,}$/i;
