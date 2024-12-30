import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  return <div>page</div>;
};

export default page;
