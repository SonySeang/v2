import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { FaCalendar as Calendar } from "react-icons/fa";

import { User } from "@prisma/client";

interface DisplayUserDataProps {
  user: User;
}

export default function DisplayUserData({ user }: DisplayUserDataProps) {
  const { email, createdAt } = user;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          {createdAt && (
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4 mr-2" />
              {/* Joined {createdAt} */}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
