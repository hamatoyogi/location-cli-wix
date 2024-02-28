import { Coord } from './types';

export function getDistance(cord1: Coord, cord2: Coord) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * cord1.latitude) / 180;
  const radLon1 = (Math.PI * cord1.longitude) / 180;
  const radLat2 = (Math.PI * cord2.latitude) / 180;
  const radLon2 = (Math.PI * cord2.longitude) / 180;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadius * c;

  return distance; // Distance in kilometers
}
