import React from "react";
import Hint from "../hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
};

const UserAvatar = ({ src, name, fallback, borderColor }: Props) => {
  console.log(name);
  console.log(src);
  return (
    <Hint label={name || "Anonymous"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
