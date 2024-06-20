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


// Question 5: Which weather station recorded the highest temperature?

// Question 6: What is the average temperature?

// Question 7: What is the station with the biggest difference between feel temperature and the actual temperature?

// Question 8: Which weather station is located in the North Sea?

// Question 9: Create a bar chart, using a python package of your choice, with the temperature for each station.