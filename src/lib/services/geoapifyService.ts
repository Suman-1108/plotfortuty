/**
 * Geoapify Maps & Geocoding Service for Thoothukudi District Real Estate
 */

export interface GeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
  district?: string;
  city?: string;
  state?: string;
  postcode?: string;
}

export interface DistanceResult {
  distanceKm: number;
  durationMinutes: number;
  formattedDistance: string;
}

const DEFAULT_THOOTHUKUDI_COORDS = { lat: 8.8954, lng: 78.1632 }; // Tharuvaikulam / Tuticorin

export class GeoapifyService {
  private static apiKey = process.env.GEOAPIFY_API_KEY || '';

  /**
   * Check if Geoapify is configured
   */
  public static isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  /**
   * Get static or dynamic map tile / static map image URL
   */
  public static getStaticMapUrl(lat: number, lng: number, zoom = 14, width = 600, height = 400): string {
    if (!this.isConfigured()) {
      // Fallback open OSM map tile URL or layout fallback
      return `/images/ap-rajan-garden-layout.jpg`;
    }
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=${width}&height=${height}&center=lonlat:${lng},${lat}&zoom=${zoom}&marker=lonlat:${lng},${lat};color:%23668f35;size:medium&apiKey=${this.apiKey}`;
  }

  /**
   * Geocode an address in Thoothukudi / Tamil Nadu
   */
  public static async geocodeAddress(address: string): Promise<GeocodeResult> {
    if (!this.isConfigured()) {
      return {
        formattedAddress: address || 'Tharuvaikulam, Thoothukudi, Tamil Nadu 628105',
        lat: DEFAULT_THOOTHUKUDI_COORDS.lat,
        lng: DEFAULT_THOOTHUKUDI_COORDS.lng,
        district: 'Thoothukudi',
        city: 'Tharuvaikulam',
        state: 'Tamil Nadu',
        postcode: '628105'
      };
    }

    try {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address + ', Thoothukudi, Tamil Nadu, India'
      )}&limit=1&apiKey=${this.apiKey}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Geoapify error: ${res.statusText}`);

      const data = await res.json();
      const feature = data.features?.[0];

      if (!feature) {
        return {
          formattedAddress: address,
          lat: DEFAULT_THOOTHUKUDI_COORDS.lat,
          lng: DEFAULT_THOOTHUKUDI_COORDS.lng
        };
      }

      return {
        formattedAddress: feature.properties.formatted || address,
        lat: feature.properties.lat,
        lng: feature.properties.lon,
        district: feature.properties.county || 'Thoothukudi',
        city: feature.properties.city || feature.properties.suburb,
        state: feature.properties.state || 'Tamil Nadu',
        postcode: feature.properties.postcode
      };
    } catch (err) {
      console.warn('Geoapify geocoding fallback used:', err);
      return {
        formattedAddress: address,
        lat: DEFAULT_THOOTHUKUDI_COORDS.lat,
        lng: DEFAULT_THOOTHUKUDI_COORDS.lng
      };
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  public static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): DistanceResult {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    // Approximate driving time in minutes at 40 km/h avg
    const minutes = Math.max(1, Math.round((d / 40) * 60));

    return {
      distanceKm: parseFloat(d.toFixed(2)),
      durationMinutes: minutes,
      formattedDistance: d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`
    };
  }

  /**
   * Required OpenStreetMap and Geoapify attribution string
   */
  public static getAttribution(): string {
    return 'Powered by Geoapify | © OpenStreetMap contributors';
  }
}
