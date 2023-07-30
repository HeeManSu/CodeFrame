import {
    createContext,
    useContext,
    useRef,
    
} from "react";


export const EditorContext = createContext(null);
export const EditorProvider = ({ children }) => {

    const canvasRef = useRef(null);

    
    return (
        <EditorContext.Provider
            value={{
                canvasRef,
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}
export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw "Editor context is not initialized!";
    }
    return context;
};