import { ref } from "vue";
import { defineStore } from "pinia";
import { storedUsers, type User } from "@/data/users";

export const MOCK_APP_VUE_USERS_KEY = "mock.app.vue.users";
export const MOCK_APP_VUE_USER_KEY = "mock.app.vue.user";

const users = ref<User[]>([]);
const user = ref<User | undefined>(undefined);

const dbUser = localStorage.getItem(MOCK_APP_VUE_USER_KEY);
const dbUsers = localStorage.getItem(MOCK_APP_VUE_USERS_KEY);

if (dbUser) {
    user.value = JSON.parse(dbUser);
}

if (dbUsers) {
    users.value = JSON.parse(dbUsers);
} else {
    localStorage.setItem(MOCK_APP_VUE_USERS_KEY, JSON.stringify(storedUsers));
    users.value = storedUsers;
}

const setUsers = (newUsers: User[]) => {
    localStorage.setItem(MOCK_APP_VUE_USERS_KEY, JSON.stringify(newUsers));
    users.value = newUsers;
};

const setUser = (newUser: User | undefined) => {
    if (!newUser) {
        localStorage.removeItem(MOCK_APP_VUE_USER_KEY);
        user.value = newUser;
        return;
    }
    localStorage.setItem(MOCK_APP_VUE_USER_KEY, JSON.stringify(newUser));
    user.value = { ...newUser };
};

export const useUsers = defineStore("users", () => ({ users, setUsers }));

export const useUser = defineStore("user", () => ({ user, setUser }));
