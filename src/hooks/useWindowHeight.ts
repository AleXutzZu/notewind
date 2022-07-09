import {useEffect, useState} from "react";


const useWindowHeight = (): number => {
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = (): void => setWindowHeight(window.innerHeight)

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowHeight;
}

export default useWindowHeight;