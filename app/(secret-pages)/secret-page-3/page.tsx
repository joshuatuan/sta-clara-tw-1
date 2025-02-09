import FriendDashboard from "@/components/FriendDashboard";
import {
  getAcceptedFriends,
  getAllUsers,
  getFriendRequests,
} from "@/lib/data-service";

export type Friends = {
  message: string | null | undefined;
  id: string | null;
  email: string | undefined;
}[];

export type NonFriends = {
  id: string;
  email: string;
}[];

export type FriendRequests =
  | {
      id: string;
      user_id: string | null;
      requester: {
        email: string;
      } | null;
    }[]
  | null;

export default async function Page() {
  const friends = await getAcceptedFriends();
  const users = await getAllUsers();
  const friendRequests = await getFriendRequests();

  // Extract IDs of friends and pending requests
  const friendIds = friends.map((friend) => friend.id);

  // IDs of users who have sent you a friend request
  const pendingRequestIds = friendRequests
    ?.map((request) => request.user_id)
    .filter((id): id is string => id !== null);

  // Filter out friends and pending requests from the users list
  const nonFriends = users.filter(
    (user) =>
      !friendIds.includes(user.id) && !pendingRequestIds?.includes(user.id)
  );

  return (
    <FriendDashboard
      friends={friends}
      nonFriends={nonFriends}
      friendRequests={friendRequests}
      pendingRequestIds={pendingRequestIds}
    />
  );
}
