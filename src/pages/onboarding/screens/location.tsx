import Button from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { designations } from "@/lib/raw-data/desination"
import { setBasicInformation } from "@/lib/redux/features/ui/onboardingData"
import { moveNext } from "@/lib/redux/features/ui/slider-page-onboarding/OnboardingSliderPageSlice"
import {
  fetchCitiesByStateAndCountry,
  fetchStatesByCountry,
  fetchCountries,
} from "@/lib/redux/features/apis/addressApi"
import { SingleSelect } from "@/components/ui/commons/SingleSelect"
import { City, Country, State } from "@/types/Location"

export default function LocationPage() {
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [selectedCity, setSelectedCity] = useState<any>(null)
  const [selectedState, setSelectedState] = useState<any>(null)
  const [designation, setDesignation] = useState<any>(null)
  const [countries, setCountries] = useState<Country[] | []>([])
  const [states, setStates] = useState<State[] | []>([])
  const [cities, setCities] = useState<City[] | []>([])
  const dispatch = useAppDispatch()

  const getCountries = async () => {
    const data = await fetchCountries()
    setCountries(data)
  }

  const getStates = async () => {
    const states = await fetchStatesByCountry(selectedCountry.iso2)
    setStates(states)
    setCities([])
  }

  const getCities = async () => {
    const cities = await fetchCitiesByStateAndCountry(
      selectedCountry.iso2,
      selectedState.iso2
    )
    setCities(cities)
  }

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      getStates()
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState && selectedCountry) {
      getCities()
    }
  }, [selectedState, selectedCountry, states])

  return (
    <div className="m-auto mt-10 flex h-full w-full max-w-lg flex-col">
      <strong className="mb-10 text-4xl text-foreground">
        Tell us about yourself
      </strong>

      <form className="text-start">
        <div className="flex flex-col gap-4">
          <div>
            <label>Country</label>
            <SingleSelect
              options={countries.map((country) => ({
                value: country.iso2,
                label: country.name,
                raw: country,
              }))}
              value={
                selectedCountry
                  ? {
                      value: selectedCountry.iso2,
                      label: selectedCountry.name,
                      raw: selectedCountry,
                    }
                  : null
              }
              setValue={(option) => setSelectedCountry(option?.raw)}
              placeholder="Select a country"
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="grow">
              <label>State</label>
              <SingleSelect
                options={states.map((state) => ({
                  value: state.iso2,
                  label: state.name,
                  raw: state,
                }))}
                value={
                  selectedState
                    ? {
                        value: selectedState.iso2,
                        label: selectedState.name,
                        raw: selectedState,
                      }
                    : null
                }
                setValue={(option) => setSelectedState(option?.raw)}
                placeholder="Select a state"
                disabled={!selectedCountry}
              />
            </div>

            <div className="grow">
              <label>City</label>
              <SingleSelect
                options={cities.map((city) => ({
                  value: city.id.toString(),
                  label: city.name,
                  raw: city,
                }))}
                value={
                  selectedCity
                    ? {
                        value: selectedCity.id.toString(),
                        label: selectedCity.name,
                        raw: selectedCity,
                      }
                    : null
                }
                setValue={(option) => setSelectedCity(option?.raw)}
                placeholder="Select a city"
                disabled={!selectedState}
              />
            </div>
          </div>

          <div>
            <label>Designation</label>
            <SingleSelect
              options={designations.map((designation) => ({
                value: designation.value,
                label: designation.title,
                raw: designation,
              }))}
              value={
                designation
                  ? {
                      value: designation.value,
                      label: designation.title,
                      raw: designation,
                    }
                  : null
              }
              setValue={(option) => setDesignation(option?.raw)}
              placeholder="Select your designation"
            />
          </div>
        </div>
      </form>
      <Button
        className="mt-5 w-full font-semibold"
        disabled={
          selectedCountry === null ||
          selectedCity == null ||
          selectedState == null ||
          designation == null
        }
        onClick={(e) => {
          e.preventDefault()
          dispatch(
            setBasicInformation({
              country: selectedCountry.name,
              city: selectedCity.name,
              state: selectedState.name,
              designation: designation.title,
            })
          )
          dispatch(moveNext())
        }}
        size="lg"
      >
        Proceed
      </Button>
    </div>
  )
}
