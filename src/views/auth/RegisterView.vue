<script setup lang="ts">
import { ref, computed } from "vue";
import { emailSchema, passwordSchema } from "@/data/users";
import { useRegister } from "@/hooks/auth";
import { useUser, useUsers } from "@/stores/users";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import type { SubmitEventPromise } from "vuetify";

const email = ref("");
const password = ref("");
const canRegister = computed(() => email.value.length > 0 && password.value.length > 0);
const loading = ref(false);

const { users } = useUsers();
const { setUser } = useUser();
const router = useRouter();

const emailRules = computed(() => [
    (value: string) => {
        return emailSchema.safeParse(value).success ? true : "Invalid Email address";
    },
    (value: string) => {
        return users.find((user) => user.email === value)
            ? "A user with that email already exists."
            : true;
    },
]);

const passwordRules = computed(() => [
    (value: string) => {
        return passwordSchema.safeParse(value).success
            ? true
            : "Password needs to be 6 characters or more.";
    },
]);

const register = async (event: SubmitEventPromise) => {
    const { valid } = await event;

    if (!valid) {
        return;
    }

    loading.value = true;

    const { user } = useRegister(email.value, password.value);

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
                <h1 class="text-center">Register</h1>
                <VCardItem>
                    <VForm class="pa-2" validate-on="submit" @submit.prevent="register">
                        <VTextField
                            autofocus
                            type="email"
                            label="Email"
                            :rules="emailRules"
                            v-model="email"
                        />
                        <VTextField
                            type="password"
                            label="Password"
                            v-model="password"
                            :rules="passwordRules"
                        />
                        <VBtn
                            :disabled="!canRegister || loading"
                            block
                            size="large"
                            variant="flat"
                            color="blue"
                            type="submit"
                        >
                            <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
                            <span v-else>Register</span>
                        </VBtn>
                    </VForm>
                </VCardItem>
            </VSheet>
            <p class="mt-4 text-center">
                Already have an account? <RouterLink :to="routes.home">Login</RouterLink>
            </p>
        </VResponsive>
    </VContainer>
</template>
