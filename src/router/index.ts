import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "@/stores/users";
import LoginView from "../views/auth/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: "login",
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/auth/RegisterView.vue"),
        },
        {
            path: "/user/:id",
            name: "user",
            component: () => import("../views/user/UserDashboardLayout.vue"),
            children: [
                {
                    path: "dashboard",
                    component: () => import("../views/user/UserDashboardView.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to) => {
    const { user } = useUser();
    switch (to.name) {
        case "home":
            return !user ? { name: "login" } : { name: "user" };

        case "login":
            return user && { name: "user" };

        case "register":
            return user && { name: "user" };

        case "user":
            return !user && { name: "login" };

        default:
            break;
    }
});

export default router;
