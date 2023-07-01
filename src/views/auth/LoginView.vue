<script setup lang="ts">
import { ref, computed } from "vue";
import { bannedUsers, emailSchema } from "@/data/users";
import { useLogin } from "@/hooks/auth";
import { useUser, useUsers } from "@/stores/users";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import type { SubmitEventPromise } from "vuetify";

const email = ref("");
const password = ref("");
const canLogin = computed(() => email.value.length > 0 && password.value.length > 0);
const loading = ref(false);

const { users } = useUsers();
const { setUser } = useUser();
const router = useRouter();

const emailRules = computed(() => [
    (value: string) => {
        return emailSchema.safeParse(value).success ? true : "Invalid Email address";
    },
    (value: string) => {
        return bannedUsers.includes(value) ? "This user has been banned." : true;
    },
    (value: string) => {
        return users.find((item) => item.email === value && item.password === password.value)
            ? true
            : "Email or Password is incorrect.";
    },
]);

const login = async (event: SubmitEventPromise) => {
    const { valid } = await event;

    if (!valid) {
        return;
    }

    loading.value = true;

    const { user } = useLogin(email.value, password.value);

    if (user) {
        setTimeout(() => {
            setUser(user);
            router.push({ name: routes.userDashboard, params: { id: user.id } });
        }, 10000);
    }
};
</script>

<template>
    <VContainer>
        <VResponsive class="mx-auto" max-width="480px">
            <VSheet rounded class="pa-4">
                <h1 class="text-center">Login</h1>
                <VCardItem>
                    <VForm
                        class="pa-2"
                        validate-on="submit"
                        @submit.prevent="login"
                        :disabled="loading"
                    >
                        <VTextField
                            autofocus
                            type="email"
                            label="Email"
                            :rules="emailRules"
                            v-model="email"
                        />
                        <VTextField type="password" label="Password" v-model="password" />
                        <VBtn
                            :disabled="!canLogin || loading"
                            block
                            size="large"
                            variant="flat"
                            color="blue"
                            type="submit"
                        >
                            <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
                            <span v-else>Login</span>
                        </VBtn>
                    </VForm>
                </VCardItem>
            </VSheet>
            <p class="mt-4 text-center">
                Don't have an account? <RouterLink :to="routes.register">Register</RouterLink>
            </p>
        </VResponsive>
    </VContainer>
</template>
