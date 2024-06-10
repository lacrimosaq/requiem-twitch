import {create} from 'zustand';

interface FollowingStore{
    followingUsers: any;
    UpdateFollowing: () => void;
};

export const useFollowing = create<FollowingStore>((set) => ({
    followingUsers: [],
    // setFollowedUsers: () => set((value: any) => ({followedUsers: value})),
    UpdateFollowing: () =>{
        console.log("UpdateFollowing");
        fetch("http://localhost:8080/follow/following/" + (localStorage.getItem("id") ?? 0), {
            method: "GET",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json'},
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            set({ followingUsers: json });
        }).catch((err) => {
            console.log('Failed :' + err.message);
        });
    },
}));