import { useUsers } from "@/stores/users";
import { bannedUsers, type User } from "@/data/users";

interface LoginReturnType {
    error?: string;
    user?: User;
}

export const useLogin = (email: string, password: string): LoginReturnType => {
    const { users } = useUsers();

    const user = users.find((user) => user.email === email && user.password === password);
    const isValidUser = !bannedUsers.includes(email);

    if (!user) {
        return {
            error: "Email or Password is incorrect.",
        };
    }

    if (!isValidUser) {
        return {
            error: "This user has been banned.",
        };
    }

    return {
        user,
    };
};
