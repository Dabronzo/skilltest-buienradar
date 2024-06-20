import { createAsyncThunk } from "@reduxjs/toolkit";
import mockData from "../../data/data-source.json";
import { BuienradarAPI, buienradarAPISchema } from "../../types/measurements";


export const fetchWeatherData = createAsyncThunk<BuienradarAPI, string>(
    'fetchWeatherData',
    async (query, {rejectWithValue}) => {
        try {

            const validData = buienradarAPISchema.safeParse(mockData);

            if (validData.error) {
                console.log(validData.error.message)
                return rejectWithValue('error validation')
            }

            return validData.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
)
