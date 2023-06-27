import { z } from "zod";

export type User = z.infer<typeof userSchema>;

export const emailSchema = z.string().email().min(1);
export const passwordSchema = z.string().min(6);

export const userSchema = z.object({
    id: z.number(),
    name: z.optional(z.string()),
    email: emailSchema,
    password: passwordSchema,
});

export const storedUsers: User[] = [
    {
        id: 1,
        name: "Admin",
        email: "admin@app.fake",
        password: "password",
    },
    {
        id: 2,
        name: "Banned User",
        email: "banned@app.fake",
        password: "password",
    },
];

export const bannedUsers: string[] = ["banned@app.fake"];
