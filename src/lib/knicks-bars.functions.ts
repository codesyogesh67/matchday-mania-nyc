import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AiBar = {
  name: string;
  neighborhood: string;
  vibe: string[];
  note?: string;
};

const SYSTEM = `You are a NYC nightlife concierge. Return ONLY a strict JSON object matching:
{ "bars": [ { "name": string, "neighborhood": string, "vibe": string[], "note": string } ] }
Each item is a real NYC bar/sports bar/public screening where fans can watch the New York Knicks NBA Finals tonight. 6-10 results. Vibe tags are short like "Rowdy", "Big Screen", "Knicks Bar", "Family", "Outdoor". Do NOT include any prose outside the JSON.`;

export const searchKnicksBars = createServerFn({ method: "POST" })
  .inputValidator(z.object({ query: z.string().max(200).optional() }))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const userPrompt = data.query?.trim()
      ? `Filter for: "${data.query}". Find NYC bars/spots showing the Knicks NBA Finals Game 3 tonight that match.`
      : `List the best NYC bars and public screenings to watch the Knicks NBA Finals Game 3 tonight.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`AI gateway ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: { bars?: AiBar[] } = {};
    try { parsed = JSON.parse(content); } catch { parsed = { bars: [] }; }
    return { bars: parsed.bars ?? [] };
  });
