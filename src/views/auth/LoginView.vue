<script setup lang="ts">
import { ref, type VNodeRef } from "vue";
import { userSchema } from "@/data/users";

const email = ref<HTMLInputElement>();
const password = ref<HTMLInputElement>();

const validateLogin = () => {
    return userSchema.safeParse({
        email: email.value?.value,
        password: password.value?.value,
    });
};

const login = () => {
    console.log(validateLogin());
};
</script>

<template>
    <VContainer>
        <VResponsive class="mx-auto" max-width="480px">
            <VCard class="pa-4">
                <VCardItem>
                    <VCardTitle>Mock App</VCardTitle>
                    <VCardSubtitle>Login</VCardSubtitle>
                </VCardItem>
                <VForm class="pa-2">
                    <VTextField
                        autofocus
                        ref="email"
                        type="email"
                        label="Email"
                        variant="underlined"
                    />
                    <VTextField
                        type="password"
                        label="Password"
                        variant="underlined"
                        ref="password"
                    />
                </VForm>
                <VCardActions>
                    <VBtn block size="large" variant="flat" color="blue" @click="login">Login</VBtn>
                </VCardActions>
            </VCard>
        </VResponsive>
    </VContainer>
</template>
