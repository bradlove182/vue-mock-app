import { ref } from "vue";
import { defineStore } from "pinia";

export interface User {
    email: string;
    name?: string;
}

export const useUser = defineStore("user", () => {
    const user = ref<User | undefined>(undefined);
    const setUser = (newUser: User) => (user.value = newUser);
    return { user, setUser };
});
