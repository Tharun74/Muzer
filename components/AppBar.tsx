"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AppBar(){
    const session = useSession();

    return <section className="border-b border-gray-800 py-4 bg-gray-900 text-white">
        <div className="container">
           <div className="flex justify-between items-center">
            <Link href={'/'} className="font-bold text-lg text-purple-500">Muzer</Link>
            {session.data?.user && <Button onClick={() => signOut()}>Logout</Button>}
            {!session.data?.user && <Button onClick={() => signIn()}>Get Started</Button>}
        </div> 
        </div>
    </section>

}