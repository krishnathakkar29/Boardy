"use client";
import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import Item from "./item";

type Props = {};

const List = (props: Props) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((mem) => {
        return (
          <Item
            key={mem.organization.id}
            id={mem.organization.id}
            imageUrl={mem.organization.imageUrl}
            name={mem.organization.name}
          />
        );
      })}
    </ul>
  );
};

export default List;
