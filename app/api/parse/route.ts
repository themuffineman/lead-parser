import { Parser } from "@/lib/htmlparser";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { html, platform } = await req.json();
    const parser = new Parser({ html, platform });
    const extractedData = await parser.parseHTML();
    return new Response(JSON.stringify(extractedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error parsing HTML:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
