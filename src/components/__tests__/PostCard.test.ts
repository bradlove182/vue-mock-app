import { createVuetify } from "vuetify";
import { test, expect, beforeAll, describe } from "vitest";
import { mount } from "@vue/test-utils";

import PostCard from "../PostCard.vue";

const vuetify = createVuetify();

const testPost = {
    id: 1,
    title: "Test Post Title",
    body: "Test Post Body",
    tags: ["Test Post Tag"],
    reactions: 3,
};

describe("Test Post Card component", () => {
    test("Mount", async () => {
        expect(PostCard).toBeTruthy();

        const component = mount(PostCard, {
            props: {
                post: testPost,
            },
            global: {
                plugins: [vuetify],
            },
        });

        expect(component.text()).toContain(testPost.title);

        await component.get("button#like").trigger("click");

        expect(component.text()).toContain(4);
    });
});
