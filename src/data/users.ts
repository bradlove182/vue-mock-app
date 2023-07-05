import { z } from "zod";

export type User = z.infer<typeof userSchema>;

export const emailSchema = z.string().email().min(1);
export const passwordSchema = z.string().min(6);

export const userSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    email: emailSchema,
    password: passwordSchema,
    image: z.string().optional(),
});

export const storedUsers: User[] = [
    {
        id: 1,
        name: "Admin",
        email: "admin@mock.app",
        password: "password",
        image: "https://picsum.photos/seed/1/600/300",
    },
    {
        id: 2,
        name: "Banned User",
        email: "banned@mock.app",
        password: "password",
        image: "https://picsum.photos/seed/2/600/300",
    },
];

export const bannedUsers: string[] = ["banned@mock.app"];
