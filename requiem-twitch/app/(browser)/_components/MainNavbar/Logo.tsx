import Link from "next/link"

export const Logo = () => {
    return(
        <Link href="/">
            <div className="bg-white rounded-full p-1">
                <img src="/logo.svg" alt="RequiemLogo" width={"45px"} height={"45px"}/>
            </div>
        </Link>
    );
}