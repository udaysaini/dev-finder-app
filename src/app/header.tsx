"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const session = useSession();
    console.log({session})
    return (
        <div>
          <div><ModeToggle /></div>
          {
            session?.data ? (
                <Button onClick={() => signOut()} >Sign Out</Button>
            ) : (
                <Button onClick={() => signIn('google')}>Sign In</Button>
            )
          }
        </div>
    )
}