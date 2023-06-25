<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUser } from "@/stores/users";

const { user } = useUser();
</script>

<template>
    <v-layout>
        <v-app-bar>
            <v-container class="d-flex align-center">
                <v-app-bar-title>Mock App</v-app-bar-title>
                <div>{{ user?.email }}</div>
            </v-container>
        </v-app-bar>
        <v-main>
            <RouterView />
        </v-main>
    </v-layout>
</template>
