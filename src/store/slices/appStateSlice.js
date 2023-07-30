import { createSlice } from "@reduxjs/toolkit";
import { gradients } from "../../data/gradient";

const DEFAULT_JS_VALUE = `function hello() {
  console.log("Hello, World!");
}

hello();`;

export const initialState = {
    filename: "Untitled",
    darkMode: true,
    dropShadow: true,
    showTitle: false,
    showLineNumber: true,
    bgBlur: true,
    fontSize: "16px",
    language: "javascript",
    padding: "36px",
    title: "Title Text",
    code: DEFAULT_JS_VALUE,
    backgroundImage: gradients[0].gradient,
    backgroundThumb: gradients[0].gradient,
    backgroundColor: gradients[0].color,
    renderFormat: "png",
};

const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        updateAppState: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
})

export const { updateAppState } = appStateSlice.actions;
export default appStateSlice.reducer;