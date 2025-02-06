import { create } from "zustand";
import { User } from "../types";

interface userStore {
    currentUser: null | User;
    headError: string,
    setCurrentUser: (user:User) => void,
    setHeadError: (errorMessage: string) => void,
}

export const useUserStore = create<userStore>((set) => ({
    currentUser: null,
    headError: "",
    setCurrentUser: (user) => set({currentUser: user}),
    setHeadError: (errorMessage) => set({headError: errorMessage}),
}))

