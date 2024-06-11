import { ApiUrls } from '@/app/path';
import {create} from 'zustand';

interface RecommendedStore{
    recommendedUsers: any;
    UpdateRecommended: () => void;
};

export const useRecommended = create<RecommendedStore>((set) => ({
    recommendedUsers: [],
    // setFollowedUsers: () => set((value: any) => ({followedUsers: value})),
    UpdateRecommended: () =>{
        console.log("UpdateRecommended");
        fetch(ApiUrls.JAVA_APP_API_URL + "/user/recommended/" + (localStorage.getItem("id") ?? 0), {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            set({ recommendedUsers: json });
        }).catch((err) => {
            console.log('Failed :' + err.message);
        });
    },
}));