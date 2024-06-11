import Image from "next/image";
import Link from "next/link"

export const Logo = () => {
    return(
        <Link href="/">
            <div className="bg-white rounded-full p-1">
                <Image src="/logo2.svg" alt="RequiemLogo" width={45} height={45}/>
            </div>
        </Link>
    );
}