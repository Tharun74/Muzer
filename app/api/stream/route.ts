import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "../../lib/db";

const youtubesearchapi = require("youtube-search-api");

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
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: {width:number},b: {width:number}) => a.width < b.width ? -1 : 1 );
    const stream = await prisma.stream.create({
        data : {
            userId : data.creatorId,
            url : data.url,
            extractedId : extractedId,
            title : res.title ?? "No Title",
            smallImg : (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0Dz-g-P7q-2fGiUKam9pE6plbkbAjg4I0g&s",
            bigImg : thumbnails[thumbnails.length - 1].url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0Dz-g-P7q-2fGiUKam9pE6plbkbAjg4I0g&s"
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
