import { validateRequest } from "@/features/auth/actions/auth";
import { db } from "@/db";
import { pushSubscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { PushSubscription } from "web-push";

export async function POST(req: Request) {
  try {
    const newSubscription: PushSubscription | undefined = await req.json();

    if (!newSubscription) {
      return NextResponse.json(
        { error: "Missing push subscription in body" },
        { status: 400 }
      );
    }

    console.log("Received push subscription to add: ", newSubscription);

    const { user, session } = await validateRequest();

    if (!user || !session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log("Inserted values:", {
      sessionId: session.id,
      subscription: JSON.stringify(newSubscription),
    });

    const existingSubscription = await db.query.pushSubscriptionTable.findFirst(
      {
        where: eq(pushSubscriptionTable.sessionId, session.id),
      }
    );

    if (!existingSubscription) {
      await db.insert(pushSubscriptionTable).values({
        sessionId: session.id,
        subscription: JSON.stringify(newSubscription),
      });
    }

    return NextResponse.json(
      { message: "Push subscription saved" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const subscriptionToDelete: string | undefined = await req.json();

    if (!subscriptionToDelete) {
      return NextResponse.json(
        { error: "Missing push subscription in body" },
        { status: 400 }
      );
    }

    console.log("Received push subscription to delete: ", subscriptionToDelete);

    const { user, session } = await validateRequest();

    if (!user || !session) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    await db
      .delete(pushSubscriptionTable)
      .where(eq(pushSubscriptionTable.sessionId, session.id));

    return NextResponse.json(
      { message: "Push subscription deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
