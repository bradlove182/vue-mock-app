import { createVuetify } from "vuetify";
import { test, expect, describe, vi } from "vitest";
import { mount } from "@vue/test-utils";

import UserProfileView from "../user/UserProfileView.vue";

const vuetify = createVuetify();

vi.mock("@/stores/users", () => ({
    useUser: vi.fn(() => ({
        user: {
            id: 1,
            email: "test@test.com",
            password: "password",
            name: "Test",
        },
        setUser: vi.fn(),
    })),
    useUsers: vi.fn(() => ({
        users: [],
        setUsers: vi.fn(),
    })),
}));

describe("Test User Profile view", () => {
    test("Mount", async () => {
        expect(UserProfileView).toBeTruthy();

        const component = mount(UserProfileView, {
            global: {
                plugins: [vuetify],
            },
        });

        await component.get("input[type='text']").setValue("Test Name");

        await component.get("button").trigger("click");

        expect(component.text()).toContain("Test Name");
        expect(component.text()).toContain("test@test.com");
    });
});
