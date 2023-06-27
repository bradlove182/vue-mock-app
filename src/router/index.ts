import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "@/stores/users";
import LoginView from "../views/auth/LoginView.vue";

export const routes = {
    home: "/",
    register: "/register",
    user: "/user",
    userDashboard: "/user/:id/dashboard",
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: routes.home,
            name: routes.home,
            component: LoginView,
        },
        {
            path: routes.register,
            name: routes.register,
            component: () => import("../views/auth/RegisterView.vue"),
        },
        {
            path: routes.user,
            name: routes.user,
            component: () => import("../views/user/UserDashboardLayout.vue"),
            children: [
                {
                    path: routes.userDashboard,
                    name: routes.userDashboard,
                    component: () => import("../views/user/UserDashboardView.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to) => {
    const { user } = useUser();
    if (!user && [routes.user, routes.userDashboard].includes(String(to.name))) {
        return { name: routes.home };
    }
    if (user && [routes.home, routes.register, routes.user].includes(String(to.name))) {
        return { name: routes.userDashboard, params: { id: user.id } };
    }
});

export default router;
