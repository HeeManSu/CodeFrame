import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor } from "../contexts/EditorContext";
import Editor from "./Editor/Editor";
import { getExtentions } from "./Editor/get-extentions";
import { darkTheme, lightTheme } from "./Editor/themes";

import { useDispatch, useSelector } from "react-redux";
import { updateAppState } from "../store/slices/appStateSlice";

const Preview = () => {
  const appState = useSelector((state) => state.appState);
  const { canvasRef } = useEditor();
  return (
    <div
      className={`w-full overflow-x-auto my-8 px-4 mb-40 ${appState.darkMode ? "dark" : ""
        }`}
    >
      <div
        className="mx-auto overflow-hidden w-fit bg-repeat bg-center rounded-xl relative"
      // style={{
      //   backgroundImage: "url(/transparent-bg-pattern.png)",
      // }}
      >
        <div
          ref={canvasRef}
          className="bg-no-repeat bg-cover bg-center relative"
          style={{
            padding: appState.padding,
            backgroundImage: appState.backgroundImage,
            backgroundColor: appState.backgroundColor,
          }}
        >
          <Window />
        </div>
      </div>
    </div>
  )
}

export default Preview


const Window = () => {
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const [extentions, setExtentions] = useState([]);
  const { canvasRef } = useEditor();
  console.log(canvasRef)
  const appState = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const theme = useMemo(
    () => (appState.darkMode ? darkTheme : lightTheme),
    [appState.darkMode]
  );

  const onCodeChange = useCallback(
    (value) => {
      dispatch(updateAppState({
        code: value
      }))
    },
    [appState, dispatch]
  );

  useEffect(() => {
    setExtentions(getExtentions(appState.language));
  }, [appState.language]);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setBgWidth(canvasRef.current.clientWidth);
      setBgHeight(canvasRef.current.clientHeight);
    }
  }, [appState.padding, appState.code, appState.title, canvasRef]);

  return (
    <div
      className="dark:bg-gray-800 rounded-xl bg-white text-gray-800 dark:text-gray-100 shadow-2xl border-black/30 border dark:border-white/30 relative overflow-hidden"
      style={{
        boxShadow: `0 0 0 1px ${appState.darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
          } ${appState.dropShadow ? ", 0px 12px 30px -3px rgba(0, 0, 0, 0.4)" : ""
          }`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundImage: appState.backgroundThumb,
          backgroundColor: appState.backgroundColor,
          width: bgWidth,
          height: bgHeight,
          left: `-${appState.padding}`,
          top: `-${appState.padding}`,
          zIndex: -5,
          opacity: appState.bgBlur ? 0.3 : 0,
          filter: `blur(${appState.bgBlur ? 60 : 0}px)`,
        }}
        className="w-full h-full absolute inset-0 bg-no-repeat bg-cover bg-center"
      />
      <WindowTitleBar />
      <Editor
        value={appState.code}
        onChange={onCodeChange}
        extensions={extentions}
        theme={theme}
        basicSetup={{
          foldGutter: false,
          allowMultipleSelections: false,
          lineNumbers: appState.showLineNumber,
          highlightActiveLine: false,
        }}
        style={{
          outline: "none",
          fontSize: appState.fontSize,
        }}
      />
    </div>
  );
};


const WindowTitleBar = () => {
  // const [appState, setAppState] = useAtom(appStateAtom);
  const appState = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  return (
    <div className="px-4 h-12 flex items-center gap-8 z-20">
      <div className="flex items-center gap-2 h-full">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <input
        value={appState.filename}
        translate="no"
        autoCorrect="off"
        onChange={(e) => {
        dispatch(updateAppState({
          filename: e.target.value
        }))
        }}
        className="w-auto min-w-0 bg-transparent outline-none p-0 border-0 text-center text-gray-600 dark:text-gray-300 flex-1"
      />
      <div className="flex items-center gap-2.5 opacity-0">
        <div className="w-3" />
        <div className="w-3" />
        <div className="w-3" />
      </div>
    </div>
  );
};
