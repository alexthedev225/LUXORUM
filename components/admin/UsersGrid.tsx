import React from "react";
import UserCard from "./UserCard";
import { UserData } from "./types";

interface UsersGridProps {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (userId: string) => void;
}

export default function UsersGrid({ users, onEdit, onDelete }: UsersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-2 sm:px-0">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
