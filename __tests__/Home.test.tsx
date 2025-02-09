import React from "react";
import { render, screen } from "@testing-library/react";
import { User } from "@supabase/supabase-js";
import Home from "@/components/Home";

const fakeUser: User = {
  id: "user-123",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "",
  created_at: "",
};

describe("Home component", () => {
  test("renders secret message when provided", () => {
    const secretMessage = "This is a secret!";
    render(<Home secretMessage={secretMessage} user={fakeUser} />);

    expect(
      screen.getByText(`Secret Message: ${secretMessage}`)
    ).toBeInTheDocument();
  });

  test("does not render secret message container when secretMessage is null", () => {
    render(<Home secretMessage={null} user={fakeUser} />);
    const messageText = screen.queryByText(/Secret Message:/i);
    expect(messageText).not.toBeInTheDocument();
  });

  test("renders user email", () => {
    render(<Home secretMessage={null} user={fakeUser} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(fakeUser.email as string);
  });

  test("renders Delete Account and Sign out buttons", () => {
    render(<Home secretMessage={null} user={fakeUser} />);
    expect(
      screen.getByRole("button", { name: /Delete Account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign out/i })
    ).toBeInTheDocument();
  });
});
