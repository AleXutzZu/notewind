import React, {FC} from "react";

const Header: FC = () => {
    return (
        <header className={"flex items-center justify-center bg-blue-50 rounded-b-2xl h-[10%]"}>
            <h1 className={"text-blue-600 text-6xl font-bold"}>My Notes</h1>
        </header>
    );
}

export default Header;