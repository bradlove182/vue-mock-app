<script setup lang="ts">
import { usePosts } from "@/hooks/posts";
import PostCard from "@/components/PostCard.vue";

const posts = usePosts();
</script>

<template>
    <VResponsive class="mx-auto d-flex flex-column" max-width="600px" width="100%">
        <PostCard class="mb-4" v-for="(post, index) in posts" v-bind:key="index" :post="post" />
    </VResponsive>
</template>
