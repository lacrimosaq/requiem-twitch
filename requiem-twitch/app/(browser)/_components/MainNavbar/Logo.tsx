import Link from "next/link"

export const Logo = () => {
    return(
        <Link href="/">
            <div className="bg-white rounded-full p-1">
                <img src="/logo.svg" alt="RequiemLogo" width={"50px"} height={"50px"}/>
            </div>
        </Link>
    );
}