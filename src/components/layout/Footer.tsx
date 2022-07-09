import React, {FC} from "react";

const Footer: FC = () => {
    return (
        <footer className={"bg-gray-800  flex flex-col justify-center h-[10%]"}>
            <p className={"text-center text-white text-sm"}>&copy; {new Date().getFullYear()}</p>
            <p className={"text-center text-white"}>Made with <span className={"text-red-500"}>&hearts;</span> by <a
                href={"https://github.com/AleXutzZu"} target={"_blank"} rel="noreferrer">AleXutzZu</a></p>
        </footer>
    );
}

export default Footer;