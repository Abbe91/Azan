import type { Location } from '../types';

export function calculateQiblaDirection(location: Location): number {
  const meccaLat = 21.4225;
  const meccaLng = 39.8262;
  const lat = location.latitude;
  const lng = location.longitude;

  const y = Math.sin(toRad(meccaLng - lng));
  const x = Math.cos(toRad(lat)) * Math.tan(toRad(meccaLat)) -
           Math.sin(toRad(lat)) * Math.cos(toRad(meccaLng - lng));
  
  let qibla = toDeg(Math.atan2(y, x));
  return (qibla + 360) % 360;
}

function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

function toDeg(rad: number): number {
  return rad * 180 / Math.PI;
}