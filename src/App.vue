<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <v-layout>
        <v-app-bar>
            <v-container class="d-flex align-center">
                <v-app-bar-title> Mock App </v-app-bar-title>
                <RouterLink to="/login"><v-btn>Login</v-btn></RouterLink>
                <RouterLink to="/register"><v-btn>Register</v-btn></RouterLink>
            </v-container>
        </v-app-bar>
        <v-main>
            <RouterView />
        </v-main>
    </v-layout>
</template>
