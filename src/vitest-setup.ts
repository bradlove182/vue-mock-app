import { vi } from "vitest";

const ResizeObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserver);
