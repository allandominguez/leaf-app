import { render, screen } from "@testing-library/react-native";
import type { ReactNode } from "react";

import App from "./App";

jest.mock("expo-sqlite", () => ({
  SQLiteProvider: ({ children }: { children: ReactNode }) => children,
}));

test("renders the default Expo starter screen", async () => {
  await render(<App />);

  expect(
    screen.getByText("Open up App.tsx to start working on your app!"),
  ).toBeVisible();
});
