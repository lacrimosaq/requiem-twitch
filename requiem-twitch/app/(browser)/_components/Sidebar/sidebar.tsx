import { useEffect, useState } from "react";
import { Recommended } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
    const [recommended, setRecommended] = useState<any| null>([]);

    const CreatePromise = async () => {
        // console.log("chmo");
        await new Promise(resolve => setTimeout(resolve, 1000));
        let jsonString = '{"username": "sketcher_8", "avatar": "/default_avatar.jpg"}';
        let user = Object.assign({}, JSON.parse(jsonString));
        setRecommended([user]);
    }

    useEffect(() => {
        CreatePromise();
    }, []);
    
    const LoadRecommended = () => {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        fetch("http://localhost:8080/auth/login", {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            setRecommended(json);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        });
    }
    
    return(
        <div>
            <Wrapper>
                <Toggle/>
                <div className="pt-4 md:pt-0">
                    <Recommended data={recommended}/>
                </div>
            </Wrapper>
        </div>
    );
}

export const  SidebarSkeleton = () => {
    return(
    <aside className= "fixed left-0 flex flex-col h-full bg-slate-700 border-r border-[#2d2E35] z-50 md:w-[60px] w-[256px]">
        <ToggleSkeleton/>
    </aside>
    );
};