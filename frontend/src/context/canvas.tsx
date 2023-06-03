import { FC, ReactNode, createContext, useContext, useState } from 'react';

type TCanvasContext = {
    isPaused: boolean;
    setIsPaused: (toggle: boolean) => void;
    clear: () => void,
    setClear: (clear: () => void) => void;
    error: string | null;
    setError: (err: string|null) => void;
}

const CanvasContext = createContext<TCanvasContext>({
    isPaused: true,
    setIsPaused: () => {},
    clear: () => {},
    setClear: () => {},
    error: null,
    setError: () => {}
});

const CanvasContextWrapper: FC<{children: ReactNode}> = ({children}) => {
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [clear, setClear] = useState<() => void>(() => {});
    const [error, setError] = useState<string|null>(null);

    const value: TCanvasContext = {
        isPaused,
        setIsPaused: (toggle: boolean) => {
            if (!toggle) {
                setError(null);
            }
            setIsPaused(toggle);
        },
        clear,
        setClear,
        error,
        setError,
    }
    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvasContext = () => useContext(CanvasContext);

export default CanvasContextWrapper;