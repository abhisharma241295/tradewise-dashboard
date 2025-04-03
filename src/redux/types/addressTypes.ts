export interface CountryName {
    common: string,
}

export interface CountryFlag {
    svg: string,
}

export interface Country {
    cca2: string,
    name: CountryName,
    flags: CountryFlag,
}

export interface SelectedCountry {
    value: string,
    label: string,
    flag: string,
}