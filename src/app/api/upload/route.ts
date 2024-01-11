import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    const blob = await put(filename as string, request.body!, {
        access: "public",
    });

    return NextResponse.json(blob);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get("url") as string;
    await del(urlToDelete);

    return new Response();
}
