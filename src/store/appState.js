import { atom } from "jotai";
import { gradients } from "../data/gradient";



const DEFAULT_JS_VALUE = `function hello() {
  console.log("Hello, World!");
}

hello();`;

export const initAppState = {
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
};

export const appStateAtom = atom(initAppState);
