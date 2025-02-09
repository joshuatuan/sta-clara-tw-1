import NonFriendsList from "./NonFriendsList";
import FriendRequestList from "./FriendRequestList";
import {
  FriendRequests,
  Friends,
  NonFriends,
} from "@/app/(secret-pages)/secret-page-3/page";
import FriendsList from "./FriendsList";

type FriendDashboardProps = {
  friendRequests: FriendRequests;
  nonFriends: NonFriends;
  friends: Friends;
  pendingRequestIds: string[] | undefined;
};

export default function FriendDashboard({
  friends,
  nonFriends,
  friendRequests,
  pendingRequestIds,
}: FriendDashboardProps) {
  return (
    <div className="max-w-4xl items-center flex flex-col gap-16">
      {/* Add Users Section */}
      <div className="bg-accent p-6 rounded-lg">
        {nonFriends.length === 0 ? (
          <p className="font-medium">No users available to add</p>
        ) : (
          <>
            <h2 className="text-lg font-medium mb-4">Add Users</h2>
            <NonFriendsList
              nonFriends={nonFriends}
              pendingRequestIds={pendingRequestIds}
            />
          </>
        )}
      </div>

      {/* Friends & Friend Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-accent p-8 rounded-lg ">
          <h2 className="text-lg font-medium mb-4">
            Friend Requests <span>({friendRequests?.length})</span>
          </h2>
          <FriendRequestList friendRequests={friendRequests} />
        </div>

        {/* Friends list*/}
        <div className="bg-accent p-8 rounded-lg ">
          <h2 className="text-lg font-medium mb-4">
            Friends <span>({friends?.length})</span>
          </h2>
          <FriendsList friends={friends} />
        </div>
      </div>
    </div>
  );
}
