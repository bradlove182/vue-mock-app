import { ref } from "vue";
import { defineStore } from "pinia";
import { type User, storedUsers } from "@/data/users";

export const useUsers = defineStore("users", () => {
    const users = ref<User[]>(storedUsers);
    const setUsers = (newUsers: User[]) => (users.value = newUsers);
    return { users, setUsers };
});

export const useUser = defineStore("user", () => {
    const user = ref<User | undefined>(undefined);
    const setUser = (newUser: User) => (user.value = newUser);
    return { user, setUser };
});
