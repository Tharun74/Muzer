import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "../../lib/db";

const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=dQw4w9WgXcQ$");
const createStreamType = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req : NextResponse){
   try {
    const data = createStreamType.parse(await req.json());
    const isYt = YT_REGEX.test(data.url)
    if(!isYt){
        return NextResponse.json({
            message : 'incorrect url format'
        })
    }
    const extractedId = data.url.split('?v=')[1]
    await prisma.stream.create({
        data : {
            userId : data.creatorId,
            url : data.url,
            extractedId : extractedId
        }
    })
   } catch (error) {
    return NextResponse.json({
        message : 'error while adding a stream'
    })
   }
}

export async function GET( req : NextRequest ){
    const creatorId = req.nextUrl.searchParams.get('creatorId');
    try {
     const streams = await prisma.stream.findMany({
        where : {
            userId : creatorId ?? ''
        }
    })   
     return NextResponse.json({
        streams
     })
    } catch (error) {
        return NextResponse.json({
            message : 'error fetching streams'
        })   
    }
    
}