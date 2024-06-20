import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { Measurement, Station } from "../../types/measurements";
import { fetchWeatherData } from "./thunk";
import { RootState } from "../../store";


export type StationStore = {
    stations: Record<string, Station> | null;
    measurements: Record<string, Measurement> | null;
    higherTemp: {
        name: string,
        temp: number
    } | null
    avgTemp: number | null;
    biggestDiff: { name: string, diff: number} | null;
    northSeaStation: string | null;


    loading: boolean;
    error: string | null;
};


const initialState: StationStore = {
    stations: null,
    measurements: null,
    loading: false,
    error: null,
    higherTemp: null,
    avgTemp: null,
    biggestDiff: null,
    northSeaStation: null
}


const stationSlice = createSlice({
    name: 'Stations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(fetchWeatherData.rejected, (state) => {
            state.loading = false;
            state.error = 'error in fetching data'
        }).
        addCase(fetchWeatherData.fulfilled, (state, action) => {

            let highestTemperature: number = 0;
            let totalTemperature: number = 0;
            let temperatureCount = 0;
            let maxDifference = -Infinity;
            let maxDiffStation: { name: string; diff: number } | null = null;
            
            for (const instance of action.payload) {
                const internalId = nanoid();
                const station: Station = {
                    id: internalId,
                    stationid: instance.stationid,
                    stationname: instance.stationname,
                    lat: instance.lat,
                    lon: instance.lon,
                    regio: instance.regio,
                };
                state.stations = {
                    ...state.stations,
                    [station.id]: station
                };
                const measurement: Measurement ={
                    id: nanoid(),
                    timestamp: instance.timestamp,
                    temperature: instance.temperature,
                    groundtemperature: instance.groundtemperature,
                    feeltemperature: instance.feeltemperature,
                    windgusts: instance.windgusts,
                    windspeedBft: instance.windspeedBft,
                    humidity: instance.humidity,
                    precipitation: instance.precipitation,
                    sunpower: instance.sunpower,
                    stationid: instance.stationid,
                };
                state.measurements = {
                    ...state.measurements,
                    [internalId]: measurement
                }

                // detecting the highest temperature station

                if (measurement.temperature && measurement.temperature > highestTemperature) {
                    
                    highestTemperature = measurement.temperature;
                    state.higherTemp = {
                      name: station.stationname,
                      temp: measurement.temperature,
                    };
                }

                // calculation for each
                if (measurement.temperature) {
                    totalTemperature += measurement.temperature;
                    temperatureCount++
                }

                // Calculate the difference between feel temperature and actual temperature
                if (measurement.feeltemperature && measurement.temperature) {
                    const tempDifference = Math.abs(measurement.feeltemperature - measurement.temperature);

                // Update the station with the biggest difference
                if (tempDifference > maxDifference) {
                    maxDifference = tempDifference;
                    maxDiffStation = {
                    name: station.stationname,
                    diff: tempDifference,
                    };
                }

                // Finding the North Sea station
                if (station.regio === 'Noordzee') {
                    state.northSeaStation = station.stationname;
                }

                }
                

                
            }

             // Calculate average temperature
            const averageTemperature = temperatureCount > 0 ? totalTemperature / temperatureCount : null;

            state.avgTemp = averageTemperature;
            state.biggestDiff = maxDiffStation;
        })
    }
});

const selectStationData = (state: RootState) => state.stations;


export const stationSelector = () => createSelector([selectStationData], (stations) => {
    return stations;
})

export default stationSlice.reducer;
