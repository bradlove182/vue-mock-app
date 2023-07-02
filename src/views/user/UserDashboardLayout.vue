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
    <v-app-bar>
        <v-container class="d-flex align-center justify-space-between">
            <div class="d-flex align-center d-gap-4">
                <v-app-bar-title class="mr-4">Mock App</v-app-bar-title>
                <RouterLink :to="{ name: routes.userDashboard, params: { id: user?.id } }">
                    <VBtn :active="router.currentRoute.value.name === routes.userDashboard"
                        >Dashboard</VBtn
                    >
                </RouterLink>
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
