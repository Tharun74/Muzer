import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "../../lib/db";
//@ts-ignore
import { youtubesearchapi } from "youtube-search-api";

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const createStreamType = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req : NextResponse){
   try {
    const data = createStreamType.parse(await req.json());
    const isYt = data.url.match(YT_REGEX)
    if(!isYt){
        return NextResponse.json({
            message : 'incorrect url format'
        })
    }
    const extractedId = data.url.split('?v=')[1]
    const res = youtubesearchapi.GetVideoDetails(extractedId);
    console.log(res);
    const stream = await prisma.stream.create({
        data : {
            userId : data.creatorId,
            url : data.url,
            extractedId : extractedId
        }
    })
    return NextResponse.json({
        message : 'Added Stream',
        streamId : stream.id,
    })
   } catch (error) {
    return NextResponse.json({
        error : `${error}`
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
