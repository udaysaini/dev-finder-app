"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
          {/* (Sign IN) */}
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          isLoggedIn ? (
            <DropdownMenuItem onClick={() => signOut()} >
              <LogOutIcon className="mr-2 " /> Sign Out
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => signIn('google')}>
              <LogInIcon className="mr-2 " /> Sign In
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  const session = useSession();
  console.log({ session });
  return (
    <header className="dark:bg-gray-900 bg-gray-100 py-2 container mx-auto">
      <div className="flex justify-between items-center" >
        <Link href="/" className="flex gap-2 items-center text-xl font-bold hover:underline" >
          <Image
            src="/icon-nobg.png"
            width="60"
            height="60"
            alt="Icon for the Devfinder app."
          />
          DevFinder
        </Link>
        <div className="flex items-center gap-4">
          {/* {session.data?.user?.email}/ */}
          {/* {session.data?.user?.name} */}

          <AccountDropdown />
          <ModeToggle />
          {/* <div></div> */}
        </div>
      </div>
    </header>
  )
}