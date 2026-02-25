export async function POST(req) {
  const data = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an organizational intelligence analyst." },
        { role: "user", content: `Analyze these responses and provide a concise executive summary. Data: ${JSON.stringify(data)}` }
      ]
    })
  });

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content || "No analysis available.";

  return Response.json({
    summary: text
  });
}
