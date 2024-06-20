import { configureStore } from "@reduxjs/toolkit";
import stationsReducer from "./features/store/measurements";

const store = configureStore({
    reducer: {
        stations: stationsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

// exporting the dispatch
export type AppDispatch = typeof store.dispatch;

export default store;