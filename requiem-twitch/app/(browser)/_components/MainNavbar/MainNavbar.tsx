import { Logo } from "./Logo";
import { FormButtons } from "./FormButtons";
import { Search } from "./Search";

export const MainNavbar = ({setChildState}) => {
    return (
        <nav className="fixed top-0 w-full h-20 bg-gray-800 px-2 lg:px-4 flex justify-between items-center">
            <Logo/>
            <Search/>
            <FormButtons setChildState={setChildState}/>
        </nav>
    );
}