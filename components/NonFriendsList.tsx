import { sendFriendRequestAction } from "@/app/actions/app";
import { Button } from "./ui/button";
import { NonFriends } from "@/app/(secret-pages)/secret-page-3/page";

export default function NonFriendsList({
  nonFriends,
  pendingRequestIds,
}: {
  nonFriends: NonFriends;
  pendingRequestIds: string[] | undefined;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {nonFriends.map((user) => {
        const hasPendingRequest = pendingRequestIds?.includes(user.id);
        return (
          <li
            key={user.id}
            className="flex gap-8 items-center justify-between p-1"
          >
            <p className="">{user.email}</p>
            <form action={sendFriendRequestAction}>
              <input type="hidden" name="friendId" value={user.id} />
              <Button
                size="sm"
                type="submit"
                variant="outline"
                disabled={hasPendingRequest}
                className="font-semibold text-sm"
              >
                Add
              </Button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
