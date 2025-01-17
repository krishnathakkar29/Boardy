"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useOthers, useSelf } from "@liveblocks/react";
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const SHOW_MAX_USERS = 2;

type Props = {};

const Participants = (props: Props) => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > SHOW_MAX_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, SHOW_MAX_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              name={info.name}
              src={info.picture}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "?"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            borderColor="black"
            name={`${users.length - SHOW_MAX_USERS} more`}
            fallback={`+${users.length - SHOW_MAX_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] w-[110px]">
      <Skeleton />
    </div>
  );
};

export default Participants;
