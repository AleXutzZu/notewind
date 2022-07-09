import useWindowWidth from "./useWindowWidth";

const useShortenTitle = () => {
    const windowWidth = useWindowWidth();
    const percentage: number = (windowWidth >= 768 ? 1/3 : 2/3);
    const fontSize: number = (windowWidth >= 768 ? 16 : 12);

    return (title: string): string => {
        const noteSize: number = windowWidth * percentage;
        const titleBoxSize: number = noteSize * 0.8;
        const numberOfCharacters: number = Math.floor(titleBoxSize / fontSize);

        if (title.length <= numberOfCharacters) {
            return title;
        }
        return title.substring(0, numberOfCharacters) + "...";
    };
}

export default useShortenTitle;