import { NextRequest, NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({ region: "ap-northeast-2" });

const GROUP_TO_FUNCTION: Record<string, string> = {
  pdf: "toolpop-pdf-process",
  office: "toolpop-libreoffice",
  image: "toolpop-image-process",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, file, filename, options, group } = body;

    if (!tool || !file || !group) {
      return NextResponse.json(
        { error: "Missing required fields: tool, file, group" },
        { status: 400 },
      );
    }

    const functionName = GROUP_TO_FUNCTION[group];
    if (!functionName) {
      return NextResponse.json(
        { error: `Unknown group: ${group}` },
        { status: 400 },
      );
    }

    const payload = JSON.stringify({ tool, file, filename, options });

    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: new TextEncoder().encode(
        JSON.stringify({ body: payload }),
      ),
    });

    const response = await lambda.send(command);

    if (response.FunctionError) {
      const errorPayload = JSON.parse(
        new TextDecoder().decode(response.Payload),
      );
      return NextResponse.json(
        { error: errorPayload.errorMessage ?? "Lambda execution failed" },
        { status: 500 },
      );
    }

    const result = JSON.parse(new TextDecoder().decode(response.Payload));
    const resultBody = JSON.parse(result.body);

    if (result.statusCode !== 200) {
      return NextResponse.json(
        { error: resultBody.error ?? "Processing failed" },
        { status: result.statusCode },
      );
    }

    return NextResponse.json(resultBody);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
