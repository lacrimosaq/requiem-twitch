import {create} from 'zustand';

interface FormStore{
    visible: boolean;
    type: string;
    onLoginForm: () => void;
    onRegisterForm: () => void;
    onClose: () => void;
};

export const useForm = create<FormStore>((set) => ({
    visible: false,
    type: "",
    onLoginForm: () => set(() => ({visible: true, type: "login"})),
    onRegisterForm: () => set(() => ({visible: true, type: "register"})),
    onClose: () => set(() => ({visible: false, type: ""})),
}));