<script setup lang="ts">
import { ref, computed } from "vue";
import { emailSchema } from "@/data/users";
import { useLogin } from "@/hooks/auth";
import { useUser } from "@/stores/users";
import { useRouter } from "vue-router";
import { routes } from "@/router";

const email = ref("");
const password = ref("");
const loginError = ref<string>();
const canLogin = computed(() => email.value.length > 0 && password.value.length > 0);

const { setUser } = useUser();
const router = useRouter();

const emailRules = computed(() => [
    (value: string) => {
        return emailSchema.safeParse(value).success ? true : "Invalid Email address";
    },
]);

const login = () => {
    const { error, user } = useLogin(email.value, password.value);
    if (error) {
        loginError.value = error;
        return;
    }
    if (user) {
        setUser(user);
        router.push({ name: routes.userDashboard, params: { id: user.id } });
    }
};
</script>

<template>
    <VContainer>
        <VResponsive class="mx-auto" max-width="480px">
            <VSheet rounded class="pa-4">
                <h1 class="text-center">Login</h1>
                <VCardItem>
                    <VForm class="pa-2" validate-on="submit" @submit.prevent @submit="login">
                        {{ loginError }}
                        <VTextField
                            autofocus
                            type="email"
                            label="Email"
                            :rules="emailRules"
                            v-model="email"
                        />
                        <VTextField type="password" label="Password" v-model="password" />
                        <VBtn
                            :disabled="!canLogin"
                            block
                            size="large"
                            variant="flat"
                            color="blue"
                            type="submit"
                            >Login</VBtn
                        >
                    </VForm>
                </VCardItem>
            </VSheet>
        </VResponsive>
    </VContainer>
</template>
