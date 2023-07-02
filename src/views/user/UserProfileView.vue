<script setup lang="ts">
import { useUser, useUsers } from "@/stores/users";
import { ref } from "vue";

const { user, setUser } = useUser();
const { users, setUsers } = useUsers();

const email = ref(user?.email);
const password = ref(user?.password);
const name = ref(user?.name);

const loading = ref(false);

const save = async () => {
    if (user) {
        loading.value = true;

        const userDetails = {
            ...user,
            name: name.value,
        };

        setTimeout(() => {
            setUser(userDetails);
            setUsers(users.map((item) => (item.id === user.id ? userDetails : item)));
            loading.value = false;
        }, 3000);
    }
};
</script>

<template>
    <VResponsive max-width="600px" class="mx-auto">
        <VSheet rounded>
            <VList rounded>
                <VListItem
                    :prepend-avatar="user?.image"
                    :title="name ?? email"
                    :subtitle="name && email"
                />
            </VList>
            <VDivider />
            <VList rounded>
                <VListItem>
                    <VForm validate-on="submit" @submit.prevent="save" :disabled="loading">
                        <VTextField autofocus type="text" label="Name" v-model="name" />
                        <VTextField type="email" label="Email" disabled v-model="email" />
                        <VTextField type="password" label="Password" v-model="password" disabled />
                        <div class="d-flex justify-end">
                            <VBtn
                                size="large"
                                :disabled="loading"
                                variant="flat"
                                color="blue"
                                type="submit"
                            >
                                <v-progress-circular
                                    size="small"
                                    v-if="loading"
                                    indeterminate
                                ></v-progress-circular>
                                <span v-else>Save</span>
                            </VBtn>
                        </div>
                    </VForm>
                </VListItem>
            </VList>
        </VSheet>
    </VResponsive>
</template>
