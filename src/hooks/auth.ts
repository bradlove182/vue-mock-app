import { useUsers } from "@/stores/users";
import { type User } from "@/data/users";

interface AuthReturnType {
    user?: User;
}

export const useLogin = (email: string, password: string): AuthReturnType => {
    const { users } = useUsers();

    const user = users.find((user) => user.email === email && user.password === password);

    return {
        user,
    };
};

export const useRegister = (email: string, password: string): AuthReturnType => {
    const { users, setUsers } = useUsers();

    const id = users.length + 1;

    const newUser = {
        id,
        email,
        password,
        image: `https://picsum.photos/seed/${id}/600/300`,
    };

    setUsers([...users, newUser]);

    return {
        user: newUser,
    };
};
