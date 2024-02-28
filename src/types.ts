
export interface Location {
    id: string
    name: string
    default: boolean
    status: string
    locationType: string
    timeZone: string
    address: Address
    revision: string
    archived: boolean
    locationTypes: any[]
  }
  
  export interface Address {
    country: string
    city: string
    streetAddress: StreetAddress
    formattedAddress: string
    geocode: Geocode
  }
  
  export interface StreetAddress {
    number: string
    name: string
    apt: string
  }
  
  export interface Geocode {
    latitude: number
    longitude: number
  }
  
  export type Coord = Location['address']['geocode'];