import { z } from "zod";

export type User = z.infer<typeof userSchema>;

export const emailSchema = z.string().email().min(1);
export const passwordSchema = z.string().min(6);

export const userSchema = z.object({
    name: z.optional(z.string()),
    email: emailSchema,
    password: passwordSchema,
});

export const storedUsers: User[] = [
    {
        name: "Admin",
        email: "admin@app.fake",
        password: "adminpassword",
    },
    {
        name: "Banned User",
        email: "banned@app.fake",
        password: "bannedpassword",
    },
];

export const bannedUsers: string[] = ["banned@app.fake"];
