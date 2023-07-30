import { atom } from "jotai";


export const initExportSettings = {
    showWaterMark: true,
    renderScale: "1x",
    renderFormat: "png",
};
export const exportSettingsAtom = atom(initExportSettings);
