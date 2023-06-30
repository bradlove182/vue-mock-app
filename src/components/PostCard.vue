<script setup lang="ts">
import { type Post } from "@/data/posts";
import { ref } from "vue";

const props = defineProps<{ post: Post }>();

const liked = ref(false);
const reactions = ref<Post["reactions"]>(props.post.reactions);

const like = () => {
    if (!liked.value) {
        reactions.value++;
        liked.value = true;
    } else {
        reactions.value--;
        liked.value = false;
    }
};
</script>

<template>
    <VCard>
        <v-img
            :height="300"
            aspect-ratio="21/9"
            cover
            :src="'https://picsum.photos/600/300?random=' + post.id"
        >
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate />
                </div>
            </template>
        </v-img>
        <VCardItem>
            <VChipGroup>
                <VChip size="small" v-for="(tag, tagIndex) in post.tags" v-bind:key="tagIndex">
                    {{ tag }}
                </VChip>
            </VChipGroup>
            <VCardTitle>
                {{ post.title }}
            </VCardTitle>
        </VCardItem>
        <VCardText>
            {{ post.body }}
        </VCardText>
        <VCardActions class="justify-space-between">
            <VBtn icon="mdi-share" />
            <div class="d-flex align-center red">
                <span>{{ reactions }}</span>
                <VBtn :color="liked ? 'red' : 'white'" icon="mdi-heart" @click="like" />
            </div>
        </VCardActions>
    </VCard>
</template>
