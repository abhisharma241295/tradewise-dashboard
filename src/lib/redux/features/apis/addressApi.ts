import axios from "axios"

export const fetchCountries = async () => {
  const reqOptions = {
    url: `https://api.countrystatecity.in/v1/countries`,
    method: "GET",
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRIES_STATE_CITY_API_KEY,
    },
  }
  try {
    const response = await axios.request(reqOptions)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchStatesByCountry = async (countryCode: any) => {
  const reqOptions = {
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    method: "GET",
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRIES_STATE_CITY_API_KEY,
    },
  }
  try {
    const response = await axios.request(reqOptions)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchCitiesByStateAndCountry = async (
  countryCode: any,
  stateCode: any
) => {
  const reqOptions = {
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
    method: "GET",
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRIES_STATE_CITY_API_KEY,
    },
  }
  try {
    const response = await axios.request(reqOptions)
    return response.data
  } catch (error) {
    throw error
  }
}
