import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const streamUpvotesType = z.object({
    streamId: string(),
})

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    if (!user) {
        return NextResponse.json({
            message: 'unauthorized'
        })
    }

    try {
        const data = streamUpvotesType.parse(req.json());
        await prisma.upvote.create({
            data: {
                userId : user.id,
                streamId : data.streamId
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: 'error while upvoting'
        })
    }
}