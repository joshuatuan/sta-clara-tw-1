import { acceptFriendRequestAction } from "@/app/actions/app";
import { Button } from "./ui/button";
import { type FriendRequests } from "@/app/(secret-pages)/secret-page-3/page";

export default function FriendRequestList({
  friendRequests,
}: {
  friendRequests: FriendRequests;
}) {
  return (
    <>
      {friendRequests && friendRequests.length > 0 ? (
        <ul className="space-y-3">
          {friendRequests?.map((friendRequest) => (
            <li
              key={friendRequest.id}
              className="flex justify-between gap-3 items-center"
            >
              <p>{friendRequest.requester?.email}</p>
              <form action={acceptFriendRequestAction}>
                <input
                  type="hidden"
                  name="requestId"
                  value={friendRequest.id}
                />
                <Button
                  size="sm"
                  type="submit"
                  variant="outline"
                  className="font-semibold text-sm"
                >
                  Accept
                </Button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending friend requests.</p>
      )}
    </>
  );
}
