import "@testing-library/jest-dom";

// Mock ResizeObserver globally for tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
