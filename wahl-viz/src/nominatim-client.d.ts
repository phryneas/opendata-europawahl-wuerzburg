declare module "nominatim-client" {
  export interface Query {
    q: string;
    addressdetails: string;
  }

  export interface Address {
    city: string;
    country: string;
    country_code: string;
    county: string;
    house_number: string;
    postcode: string;
    road: string;
    state: string;
    state_district: string;
    suburb: string;
  }

  export interface ReverseResult {
    address: Address;
    boundingbox: [string, string, string, string];
    display_name: string;
    lat: string;
    licence: string;
    lon: string;
    osm_id: number;
    osm_type: "node" | string;
    place_id: number;
  }

  export type Callback<T> = (err: any, result: T) => void;

  export function global(_: {
    useragent: string;
    referer: string;
    email: string;
  }): void;
  export function search(query: Query, cb: Callback<unknown>): void;
  export function reverse(
    pos: { lat: number; lon: number },
    cb: Callback<ReverseResult>
  ): void;
}
