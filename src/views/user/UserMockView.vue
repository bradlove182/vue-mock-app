<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <VResponsive max-width="600px" class="mx-auto">
        <VList rounded>
            <VListItem>
                <h1>{{ route.query.title }}</h1>
            </VListItem>
            <VListItem> Random GUID: {{ route.query.random }} </VListItem>
            <VListItem> User ID: {{ route.query.id }} </VListItem>
            <VListItem> Message: {{ route.query.message }} </VListItem>
        </VList>
    </VResponsive>
</template>
