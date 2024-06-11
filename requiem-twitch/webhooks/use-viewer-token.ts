import { ApiUrls } from "@/app/path";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { toast } from "sonner";


export const useViewerToken = (hostIdentity: number) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    
    useEffect(() => {
        const createToken = async () => {
            if(!hostIdentity) return;
            await fetch(ApiUrls.GO_APP_API_URL + "/create-token/" + hostIdentity + "?viewerId=" + (localStorage.getItem("id") ?? 0), {
                method: "POST",
                // headers: headers,
            }).then(resp => {
                return resp.json()
            }).then(json => {
                setToken(json);
                const decodedToken = jwtDecode(json) as JwtPayload & {name?: string}
                const name = decodedToken?.name;
                const identity = decodedToken?.sub;
                if(identity) setIdentity(identity);
                if(name) setName(name);
            }).catch((err) => {
                toast.error("Something went wrong")
            });
        }
        createToken();
    }, [hostIdentity]);

    return{
        token,
        name,
        identity
    };
}