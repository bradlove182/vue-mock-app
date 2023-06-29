import { storedPosts } from "@/data/posts";
import { ref } from "vue";

export const usePosts = () => {
    const posts = ref(storedPosts);

    return posts.value;
};
