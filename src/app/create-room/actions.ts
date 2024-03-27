"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();
    console.log('session', {session});
    
    if (!session) {
        throw new Error("You must be logged in to create the room.");
    }

    await db.insert(room).values({...roomData, userId: session?.user.id});
};
