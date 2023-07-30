import classNames from "classnames";
import {  MdCheck } from "react-icons/md";
import BackgroundPicker from "./BackgroundPicker";
import * as Select from "@radix-ui/react-select";
import { toPng, toJpeg, toSvg } from "html-to-image";


import { updateAppState, initialState } from "../store/slices/appStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEditor } from "../contexts/EditorContext";
import { useCallback } from "react";




const ToolBar = () => {

    const appState = useSelector((state) => state.appState)
    const dispatch = useDispatch();
    const { canvasRef } = useEditor();
    console.log(canvasRef)

    const onReset = () => {
        dispatch(updateAppState(initialState));

    }

    const onExport = useCallback(async () => {
        if (!canvasRef.current) {
            return;
        }

        var imageUrl = null;
        const fileExtension = `.${appState.renderFormat.toLowerCase()}`;

        switch (fileExtension) {
            case ".jpeg":
                imageUrl = await toJpeg(canvasRef.current);
                break;
            case ".svg":
                imageUrl = await toSvg(canvasRef.current);
                break;
            default:
                imageUrl = await toPng(canvasRef.current);
                break;
        }

        if (!imageUrl) return;
        const filename = `${appState.filename || "Untitled"}${fileExtension}`;
        const link = document.createElement("a");
        link.download = filename;
        link.href = imageUrl;
        link.click();
    }, [appState.renderFormat, appState.filename, canvasRef]);

   
    return (
        <div className=" w-full left-0 right-0 p-4 z-20 pointer-events-none">
            <div className="mx-auto max-w-fit min-w-0 pointer-events-auto">
                <div className="bg-gray-900/60 ring-offset-white/20 ring-offset-1 rounded-2xl backdrop-blur-xl ring-1 ring-black/40 shadow-2xl">
                    <div className="flex gap-4 p-4 overflow-x-auto items-center">
                        <BackgroundPicker />
                        <SwitchItem
                            label="Dark Mode"
                            value={appState.darkMode}
                            onChange={() =>
                                dispatch(updateAppState({
                                    ...appState, darkMode: !appState.darkMode
                                }))
                            }
                        />
                        <SwitchItem
                            label="Line Number"
                            value={appState.showLineNumber}
                            onChange={() =>
                                dispatch(updateAppState({
                                    showLineNumber: !appState.showLineNumber,
                                }))
                            }
                        />
                        <SelectItem
                            label="Font Size"
                            options={[
                                "12px",
                                "14px",
                                "16px",
                                "18px",
                                "20px",
                                "22px",
                                "24px",
                                "28px",
                                "32px",
                            ]}
                            value={appState.fontSize}
                            onChange={(value) => {
                                dispatch(updateAppState({
                                    ...appState,
                                    fontSize: value,
                                }))

                            }}
                        />
                        <SelectItem
                            label="Padding"
                            options={["36px", "48px", "64px", "80px", "96px"]}
                            value={appState.padding}
                            onChange={(value) => {
                                dispatch(updateAppState({
                                    ...appState,
                                    padding: value,
                                }))

                            }}
                        />
                        <SelectItem
                            label="Language"
                            options={[
                                "javascript",
                                "typescript",
                                "jsx",
                                "rust",
                                "python",
                                "c",
                                "c++",
                                "c#",
                                "html",
                                "markdown",
                                "css",
                                "scss",
                                "java",
                                "json",
                                "xml",
                                "text",
                                "wast",
                                "lezer",
                                "sql",
                                "php",
                                "swift",
                            ].sort((a, b) => (a < b ? -1 : 1))}
                            value={appState.language}
                            onChange={(value) => {
                                dispatch(updateAppState({
                                    ...appState,
                                    language: value,
                                }));
                            }}
                        />
                        <div className="w-px min-w-[1px] bg-white/10 h-12" />
                        <div className="flex h-10 rounded-md">
                            <button
                                onClick={() => onExport()}
                                className="bg-primary-500 hover:bg-primary-600 px-4 flex items-center justify-center h-full border-r border-r-primary-600 truncate rounded-md text-white"
                            >
                                Export
                            </button>

                        </div>
                        <button
                            onClick={() => onReset()}
                            className="bg-gray-500/10 hover:bg-gray-500/20 px-4 flex items-center justify-center rounded-md h-10"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolBar;




const SwitchItem = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={`${label}-input`}
                className="text-xs text-white/30 truncate"
            >
                {label}
            </label>
            <button
                id={`${label}-input`}
                className="h-7 w-12 rounded-full ring-1 ring-white/20 relative"
                onClick={() => onChange(!value)}
            >
                <div
                    className={classNames(
                        "absolute h-5 w-5 rounded-full top-1 transition-all",
                        {
                            "left-1 bg-white/30": !value,
                            "left-6 bg-indigo-500": value,
                        }
                    )}
                ></div>
            </button>
        </div>
    );
};



const SelectItem = ({
    label,
    value,
    onChange,
    options,
    
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={`${label}-input`} className="text-xs text-white/30">
                {label}
            </label>
            <Select.Root
                value={value}
                defaultValue={value}
                onValueChange={(e) => onChange(e)}
            >
                <Select.Trigger className="appearance-none h-7 rounded-md ring-1 ring-white/20 relative px-3 text-sm flex gap-2 items-center text-white/50 hover:text-white/90 overflow-hidden bg-transparent cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                    <Select.Value />
                    <Select.Icon />
                </Select.Trigger>
                <Select.Content className="bg-gray-900 border border-gray-800 p-2 rounded-lg">
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        {options.map((option, i) => (
                            <Select.Item
                                key={i}
                                value={option}
                                className="hover:bg-indigo-500 hover:text-white px-2 h-6 flex items-center gap-2 rounded outline-none cursor-pointer"
                            >
                                <Select.ItemText>{option}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <MdCheck />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Root>
        </div>
    );
};

