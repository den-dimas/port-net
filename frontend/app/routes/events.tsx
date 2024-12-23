import { useEffect, useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

import { eventsCategories } from "~/constants/categories";

import SelectButton from "~/components/SelectButton";
import AuthorizedEventTable from "~/components/events/AuthorizedEventTable";

import { getConfig } from "~/utils/session.server";
import emailjs from "emailjs-com";

export const loader: LoaderFunction = async ({ request }) => {
  const config = await getConfig(request);

  return json({ config });
};

export default function Events() {
  const { config } = useLoaderData<typeof loader>();

  const [selectedView, setSelectedViews] = useState(eventsCategories[0]);
  const [messages, setMessages] = useState<any>({});
  const [status, setStatus] = useState("disconnected");
  const [isLoading, setIsLoading] = useState(true);

  const [riskPackets, setRiskPackets] = useState<any>([]);
  const [rendered, setRendered] = useState(0);

  const sendEmail = (riskData: any, analysis: string) => {
    const message = `
  Risk detected in the network:
  
  Risk Data (JSON):
  ${JSON.stringify(riskData, null, 2)}
  
  Analysis:
  ${analysis}
    `;

    const templateParams = {
      to_name: "Admin",
      from_name: "DeepNet Monitoring System",
      to_email: config.email,
      message,
    };

    console.log("Sending email with params:", templateParams);

    emailjs.send("service_sy9eq0o", "template_oo6zqks", templateParams, "JBuCRj6OKhUoSVS9P").then(
      (response) => {
        console.log("Email sent successfully:", response.status, response.text);
      },
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  };

  const analyzeRiskWithOpenAI = async (riskData: any) => {
    try {
      if (!config.aiEnabled) {
        sendEmail(riskData, "Analysis is disabled!");
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an assistant trained to analyze risk data and suggest mitigations.",
            },
            {
              role: "user",
              content: `Analyze the following risk data and provide a summary with potential actions to mitigate the risk:\n\n${JSON.stringify(
                riskData,
                null,
                2
              )}`,
            },
          ],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const analysis = data.choices[0]?.message?.content?.trim();
      console.log("OpenAI Analysis:", analysis);

      sendEmail(riskData, analysis);
    } catch (error) {
      console.error("Error analyzing risk with OpenAI:", error);
    }
  };

  /********
   * Websokcet useEffect
   **/
  useEffect(() => {
    if (!config.wsEnabled) {
      setStatus("disabled");
      setIsLoading(false);
      return;
    }

    const ws = new WebSocket("ws://localhost:5057");

    ws.onopen = () => {
      setStatus("connected");
      setIsLoading(false);
      console.log("Connected to WebSocket");
    };

    ws.onclose = () => {
      setStatus("disconnected");
      console.log("Disconnected from WebSocket");
    };

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      setMessages(data);

      const risks = data.known_flows.filter((d: any) => d.info_risk.score >= 8);

      if (risks.length != riskPackets.length) {
        setRiskPackets((prev: any) => risks);
      }
    };

    ws.onerror = (error: any) => {
      setStatus("error");
    };

    return () => {
      ws.close();
    };
  }, []);

  /********
   * Analyze AI useffect
   **/
  useEffect(() => {
    if (rendered >= 1) {
      const emailReady = localStorage.getItem("emailReady");

      if (!emailReady) {
        localStorage.setItem("emailReady", JSON.stringify({ time: Date.now() }));

        console.log(config.notificationsEnabled, riskPackets.length);
        if (config.notificationsEnabled && riskPackets.length) {
          analyzeRiskWithOpenAI(riskPackets);
          console.log("Analyze this day!");
        }
      } else {
        const t = JSON.parse(emailReady).time;
        const dt = Date.now() - t;
        const oneDay = 24 * 60 * 60 * 1000;

        if (dt > oneDay && config.notificationsEnabled && riskPackets.length) {
          analyzeRiskWithOpenAI(riskPackets);
          console.log("Analyze this day!");
        }
      }
    }

    if (rendered < 1) setRendered(rendered + 1);
  }, [riskPackets.length]);

  return (
    <div className="py-6 px-4 flex flex-col gap-6 text-xs">
      <h1 className="header">Events</h1>

      <div className="flex flex-row gap-4 w-full">
        {eventsCategories.map((v, i) => (
          <SelectButton key={i} title={v} onClick={() => setSelectedViews(v)} isSelected={selectedView == v} />
        ))}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : status !== "disabled" ? (
        <>
          {selectedView == "Authorized Events" && (
            <AuthorizedEventTable data={!!messages && !!messages["known_flows"] ? messages["known_flows"] : []} />
          )}

          {selectedView == "Security Events" && (
            <AuthorizedEventTable data={!!messages && !!messages["unknown_flows"] ? messages["unknown_flows"] : []} />
          )}
        </>
      ) : (
        "Connection disabled, turn it on in configurations!"
      )}
    </div>
  );
}

