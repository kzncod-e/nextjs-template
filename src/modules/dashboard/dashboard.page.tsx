"use client";

import { useEffect, useState } from "react";
import { dummyData } from "./dummyData";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AgentActivity from "./components/agent-activity";
import { Label } from "@/components/ui/label";
export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<{
    [key: number]: string;
  }>({});
  const handleSelect = (index, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  const prompData = [
    "Login to the platform and record startTime.",
    "Create one post with niche-related content (AI/tech/lifestyle). Add a short caption and save the post ID/link.",
    "Scroll through the feed naturally. Record multiple viewed posts.",
    "Watch several videos until completion. Record title and duration.",
    "Like relevant posts from the same niche. Save post IDs, titles, and authors.",
    "Save or bookmark interesting posts. Record them.",
    "Comment naturally on a few posts. Record post ID, title, author, and comment text.",
    "Follow several niche-related accounts. Save username and account name.",
  ];

  const selectData = [
    {
      label: "Select the First Prompt",
      title: "First prompt",
      data: prompData,
    },
    {
      label: "Select the Second Prompt",

      title: "Second prompt",
      data: prompData,
    },
    {
      label: "Select the Third Prompt",
      title: "Third prompt",
      data: prompData,
    },
    {
      label: "Select the Fourth Prompt",

      title: "Fourt prompt",
      data: prompData,
    },
    {
      label: "Select the Fifth Prompt",

      title: "Fifth prompt",
      data: prompData,
    },
    {
      label: "Select the Sixth Prompt",

      title: "Sixth Prompt",
      data: prompData,
    },
    {
      label: "Select the Seventh Prompt",

      title: "Seventh Prompt",
      data: prompData,
    },
    {
      label: "Select the Eight Prompt",

      title: "Eight Prompt",
      data: prompData,
    },
  ];
  const getAi = async () => {
    try {
      console.log("🚀 Starting Ollama API call...");
      setLoading(true);
      setError(null);

      console.log("📡 Sending POST request to /api/ollama");
      const res = await axios.post("/api/ollama");

      console.log("✅ Response received:", res);
      console.log("Response data:", res.data);

      if (res.data.success) {
        setData(res.data.data);
        console.log("✨ Ollama result stored in state:", res.data.data);
      } else {
        setError(res.data.error || "Failed to fetch ollama data");
        console.warn("⚠️ API returned error:", res.data.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);

      console.error("Error message:", errorMessage);
    } finally {
      setLoading(false);
      console.log("✅ Loading complete");
    }
  };

  useEffect(() => {
    console.log("🎯 Dashboard page mounted, calling getAi()");
    getAi();
  }, []);

  const handlegetAiActivity = async () => {
    try {
      const res = await axios.post("/api/ollama");
      console.log(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Debug Info - Remove in production */}

        {/* Header */}
        <div className="flex flex-col items-center justify-between">
          <div className="w-full bg-slate-100 p-10 rounded-2xl">
            <form action="" className="w-fit p-6 bg-white">
              {selectData.map((el, index) => (
                <Select
                  key={index}
                  onValueChange={(value) => handleSelect(index, value)}
                >
                  <div className="flex flex-col gap-4">
                    <Label className="mt-2 font-sans text-black/40">
                      {el.label}
                    </Label>

                    <div>
                      <SelectTrigger className="w-[40rem]">
                        <SelectValue
                          placeholder={selectedValues[index] || el.title}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Prompt</SelectLabel>

                          {el.data.map((ele, idx) => {
                            const isUsed =
                              Object.values(selectedValues).includes(ele) &&
                              selectedValues[index] !== ele;

                            return (
                              <SelectItem
                                key={idx}
                                value={ele}
                                disabled={isUsed}
                              >
                                {ele}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </div>
                  </div>
                </Select>
              ))}
            </form>
          </div>
          {/* <h1 className="text-2xl font-semibold tracking-tight">
            AI Agent Overview
          </h1> */}
          <div className="flex w-full mt-7 justify-end">
            <button
              onClick={handlegetAiActivity}
              className="rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-sm font-medium"
            >
              Refresh Data
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Agent Session</p>
            <p className="text-base font-medium">{dummyData.sessionId}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Platform</p>
            <p className="text-base font-medium">{dummyData.platform}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium text-green-600 capitalize">
              {dummyData.status}
            </p>
          </div>
        </div>

        <AgentActivity dummyData={dummyData} />
      </div>
    </div>
  );
}
