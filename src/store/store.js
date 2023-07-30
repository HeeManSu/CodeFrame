import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./slices/appStateSlice";

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
    }
})