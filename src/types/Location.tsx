export interface Country {
  capital: string
  currency: string
  emoji: string
  id: number
  iso2: string
  iso3: string
  name: string
  native: string
  phonecode: string
}

export interface State {
  id: number
  iso2: string
  name: string
}

export interface City {
  id: number
  latitude: string
  longitude: string
  name: string
}
