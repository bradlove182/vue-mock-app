<script setup lang="ts">
import { useUser } from "@/stores/users";

const { user } = useUser();
</script>

<template>
    <VResponsive max-width="600px">
        <VSheet>
            {{ user?.email }}
        </VSheet>
    </VResponsive>
</template>
