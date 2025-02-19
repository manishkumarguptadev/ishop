"use client";

import { LogOut, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const AuthStatus = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <Button onClick={() => signIn(undefined, { callbackUrl })}>
        <UserIcon />
        Sign In
      </Button>
    );
  }

  const name = session?.user?.name!;
  const imageUrl = session?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="hover:opcaity-75 size-10 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="flex items-center justify-center bg-gray-300 font-medium">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 text-sm">
            <p className="font-medium leading-none">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            className="h-4 w-full justify-start px-2 py-4"
            variant="ghost"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 size-4" />
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
