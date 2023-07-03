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

const generateUUID = () => crypto.randomUUID();

const mockRoutes = [
    {
        query: {
            title: "First Page",
            random: generateUUID(),
            id: user?.id,
            message: "Friendly message from the first page.",
        },
    },
    {
        query: {
            title: "Second Page",
            random: generateUUID(),
            id: user?.id,
            message: "Friendly message from the second page.",
        },
    },
    {
        query: {
            title: "Third Page",
            random: generateUUID(),
            id: user?.id,
            message: "Friendly message from the third page.",
        },
    },
];
</script>

<template>
    <v-app-bar>
        <v-container class="d-flex align-center justify-space-between">
            <div class="d-flex align-center d-gap-4">
                <v-app-bar-title class="mr-4">Mock App</v-app-bar-title>
                <RouterLink
                    class="mr-4"
                    :to="{ name: routes.userDashboard, params: { id: user?.id } }"
                >
                    <VBtn :active="router.currentRoute.value.name === routes.userDashboard"
                        >Dashboard</VBtn
                    >
                </RouterLink>
                <VMenu open-on-hover location="bottom">
                    <template v-slot:activator="{ props }">
                        <RouterLink
                            v-bind="props"
                            :to="{
                                name: routes.userMock,
                                params: { id: user?.id },
                                query: {
                                    title: 'Mock Page',
                                    random: generateUUID(),
                                    id: user?.id,
                                    message: 'This is a friendly message.',
                                },
                            }"
                        >
                            <VBtn :active="router.currentRoute.value.name === routes.userMock">
                                Mock Page
                            </VBtn>
                        </RouterLink>
                    </template>
                    <VList rounded>
                        <VListItem v-for="(route, index) in mockRoutes" v-bind:key="index">
                            <RouterLink
                                :to="{
                                    name: routes.userMock,
                                    params: { id: user?.id },
                                    query: route.query,
                                }"
                            >
                                <VBtn
                                    :active="
                                        router.currentRoute.value.query.title === route.query.title
                                    "
                                >
                                    {{ route.query.title }}
                                </VBtn>
                            </RouterLink>
                        </VListItem>
                    </VList>
                </VMenu>
            </div>
            <div class="d-flex align-center">
                <VMenu location="bottom end">
                    <template v-slot:activator="{ props }">
                        <VBtn icon v-bind="props">
                            <VAvatar color="black" :image="user?.image" />
                        </VBtn>
                    </template>
                    <VCard min-width="300">
                        <VList>
                            <VListItem
                                :prepend-avatar="user?.image"
                                :title="user?.name ?? user?.email"
                                :subtitle="user?.name && user?.email"
                            >
                                <template v-slot:append>
                                    <VBtn @click="logout" icon="mdi-logout" variant="text" />
                                </template>
                            </VListItem>
                        </VList>
                        <VDivider />
                        <VList>
                            <VListItem>
                                <RouterLink
                                    :to="{ name: routes.userProfile, params: { id: user?.id } }"
                                >
                                    <VBtn variant="text" width="100%" prepend-icon="mdi-account">
                                        View Profile
                                    </VBtn>
                                </RouterLink>
                            </VListItem>
                        </VList>
                    </VCard>
                </VMenu>
            </div>
        </v-container>
    </v-app-bar>
    <v-layout>
        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
    </v-layout>
</template>
