<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUser } from "@/stores/users";
import { useRouter } from "vue-router";
import { routes } from "@/router";

const { user, setUser } = useUser();
const router = useRouter();

const logout = () => {
    setUser(undefined);
    router.push({ name: routes.home });
};
</script>

<template>
    <v-layout>
        <v-app-bar>
            <v-container class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                    <v-app-bar-title>Mock App</v-app-bar-title>
                    <RouterLink :to="{ name: routes.userDashboard, params: { id: user?.id } }">
                        <VBtn>Dashboard</VBtn>
                    </RouterLink>
                </div>
                <div class="d-flex align-center">
                    <VAvatar
                        color="black"
                        :image="'https://picsum.photos/600/300?random=' + user?.id"
                    />
                    <div>{{ user?.email }}</div>
                    <v-btn @click="logout">Logout</v-btn>
                </div>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
    </v-layout>
</template>
