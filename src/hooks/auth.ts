import { useUsers } from "@/stores/users";
import { type User } from "@/data/users";

interface LoginReturnType {
    user?: User;
}

interface RegisterReturnType {
    user?: User;
}

export const useLogin = (email: string, password: string): LoginReturnType => {
    const { users } = useUsers();

    const user = users.find((user) => user.email === email && user.password === password);

    return {
        user,
    };
};

export const useRegister = (email: string, password: string): RegisterReturnType => {
    const { users, setUsers } = useUsers();

    const newUser = {
        id: users.length + 1,
        email,
        password,
    };

    setUsers([...users, newUser]);

    return {
        user: newUser,
    };
};
