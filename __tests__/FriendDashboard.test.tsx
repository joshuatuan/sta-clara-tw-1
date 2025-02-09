import React from "react";
import { render, screen } from "@testing-library/react";
import NonFriendsList from "@/components/NonFriendsList";
import FriendRequestList from "@/components/FriendRequestList";
import FriendsList from "@/components/FriendsList";

// Sample data interface based on the component's expected type
interface User {
  id: string;
  email: string;
}

jest.mock("@/app/actions/app", () => ({
  sendFriendRequestAction: jest.fn(), // or a simple noop function
}));

describe("Friend Dashboard", () => {
  const nonFriends: User[] = [
    { id: "1", email: "user1@example.com" },
    { id: "2", email: "user2@example.com" },
  ];

  it("renders a list of non-friends with their emails and Add buttons", () => {
    render(<NonFriendsList nonFriends={nonFriends} pendingRequestIds={[]} />);

    // Check if both emails are rendered
    nonFriends.forEach((user) => {
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });

    // All buttons should be enabled as there are no pending requests
    const addButtons = screen.getAllByRole("button", { name: /add/i });
    expect(addButtons).toHaveLength(nonFriends.length);
    addButtons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });

  it("renders a list of friend requests when available", () => {
    const friendRequests = [
      { id: "1", user_id: "3", requester: { email: "test1@example.com" } },
      { id: "2", user_id: "4", requester: { email: "test2@example.com" } },
    ];

    render(<FriendRequestList friendRequests={friendRequests} />);

    // Check that the requester emails are rendered.
    expect(screen.getByText("test1@example.com")).toBeInTheDocument();
    expect(screen.getByText("test2@example.com")).toBeInTheDocument();

    // Ensure that Accept buttons are rendered.
    const buttons = screen.getAllByRole("button", { name: /accept/i });
    expect(buttons).toHaveLength(2);
  });

  it("renders 'No friends yet.' when friends array is empty", () => {
    render(<FriendsList friends={[]} />);
    expect(screen.getByText("No friends yet.")).toBeInTheDocument();
  });

  it("renders friend emails and shows secret message only when available", () => {
    const friends = [
      {
        id: "1",
        email: "friend1@example.com",
        message: "This is a secret message that should be truncated properly.",
      },
      {
        id: "2",
        email: "friend2@example.com",
        message: "", // Does not trigger the secret message render
      },
    ];

    render(<FriendsList friends={friends} />);

    // Check that each friend's email is rendered
    expect(screen.getByText("friend1@example.com")).toBeInTheDocument();
    expect(screen.getByText("friend2@example.com")).toBeInTheDocument();

    // The secret message should only render for friend1.
    const secretMessageParagraph = screen.getByTestId("secret-message");
    expect(secretMessageParagraph).toBeInTheDocument();
  });
});
