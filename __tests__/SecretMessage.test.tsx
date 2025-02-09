import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SecretMessage from "@/components/SecretMessage";

// Mock the action module before its usage in SecretMessage
jest.mock("@/app/actions/app", () => ({
  createSecretMessageAction: jest.fn(),
}));

describe("SecretMessage Component", () => {
  it("renders a label and the textarea with the given secretMessage", () => {
    const secretMessage = "Top Secret!";
    render(<SecretMessage secretMessage={secretMessage} />);

    // Check for the label
    expect(screen.getByText("Secret Message")).toBeInTheDocument();

    // Check for the textarea with default value and placeholder
    const textarea = screen.getByPlaceholderText(
      "Enter message here"
    ) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe(secretMessage);
  });

  it("renders the submit button", () => {
    render(<SecretMessage secretMessage="A message" />);
    const button = screen.getByRole("button", { name: /Submit/i });
    expect(button).toBeInTheDocument();
  });

  // Optionally, simulate clicking the submit button.
  // Note: The actual call to createSecretMessageAction might be handled by a server action.
  // This test assumes that clicking the button would trigger the formAction.
  it("handles a click on the submit button", async () => {
    render(<SecretMessage secretMessage="A message" />);
    const button = screen.getByRole("button", { name: /Submit/i });
    await fireEvent.click(button);
    // Since createSecretMessageAction is mocked, you could extend this test by checking
    // whether it has been called if your component wiring supports it.
    // For example:
    // expect(createSecretMessageAction).toHaveBeenCalled();
  });
});
