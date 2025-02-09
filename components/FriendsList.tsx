import { Friends } from "@/app/(secret-pages)/secret-page-3/page";
import TextExpander from "./textExpander";

export default function FriendsList({ friends }: { friends: Friends }) {
  return (
    <>
      {friends.length > 0 ? (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li key={friend.id} className="p-1">
              <p>{friend.email}</p>
              {friend.message && friend.message.length > 1 && (
                <p data-testid="secret-message" className="text-sm mt-1">
                  <span>Secret Message:</span>{" "}
                  {<TextExpander maxWords={10}>{friend.message}</TextExpander>}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </>
  );
}
