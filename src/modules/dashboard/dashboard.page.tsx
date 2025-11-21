"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

import { Label } from "@/components/ui/label";
import DashboardLoader from "../todos/components/loader";
import { useAgentStore } from "@/store/agent.store";
import AgentListPage from "./components/agent-review";
import { selectData } from "./data";
import toast from "react-hot-toast";
import { Bot, Globe, Server, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZodError } from "zod";
import LoadingScreen from "../todos/components/loader";
export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [instance, setInstance] = useState("");
  const [agentProvider, setAgentProvider] = useState("google");
  const [error, setError] = useState<string | null>(null);
  const { setAgentData, agentData, clearAgentData } = useAgentStore.getState();
  const [selectedStep, setselectedStep] = useState<{
    [key: number]: string;
  }>({});
  const handleSelect = (index: number, value: string) => {
    setselectedStep((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const agentsData = ["ollama", "moonshot", "google"];
  // const getAi = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await axios.post("/api/agent/activity", {
  //       selectedStep,
  //       instance,
  //       platform,
  //       agentProvider,
  //     });

  //     const stream = res.data?.data?.data;

  //     if (!stream) {
  //       setError("Invalid agent response");
  //       toast.error("Invalid agent response");
  //       return;
  //     }
  //     console.log(stream, "ini data");

  //     // Cek index 1 null
  //     if (stream[1] == null) {
  //       console.error("data not exist");

  //       setError("Agent did not return valid data for index 1");
  //       toast.error("Agent did not return valid data for index 1");
  //       return;
  //     }

  //     console.log("📌 Stream Data", stream);

  //     let mainData = stream[1];

  //     let parsedData;
  //     parsedData = JSON.parse(mainData);
  //   } catch (err: any) {
  //     if (err.status === 400) {
  //       toast.error("Please Fill all input field");
  //       return;
  //     }

  //     setError(err?.message || "Unknown error occurred");
  //     toast.error(err?.message || "Unknown error occurred");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [platform, instance, agentProvider, selectedStep]);

  const handlegetAiActivity = useCallback(async () => {
    try {
      setLoading(true);
      clearAgentData();
      const res = await axios.post("http://127.0.0.1:5000/run-x-agent", {
        platform,
        selectedStep: Object.values(selectedStep),
      });
      console.log(res, ">>>>>>>>>>>> ini res");

      // console.log(res.data.final, "ini data respond>>>>>>>>>>>>>>");
      const result = res.data.final;
      setAgentData(JSON.parse(result));
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message[0]);
      }
      toast.error("failed to run ai agent please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [agentData, selectData, platform]);
  useEffect(() => {
    console.log(loading, "loadingg.....");
  }, [loading]);

  const platforms = useMemo(
    () => [
      { value: "youtube.com", label: "YouTube", icon: "📺" },
      { value: "instagram.com", label: "Instagram", icon: "📷" },
      { value: "x.com", label: "Twitter", icon: "🐦" },
      { value: "tiktok.com", label: "TikTok", icon: "🎵" },
    ],
    []
  );
  const instances = useMemo(
    () => [
      {
        label: "instance 1",
        value: "http://103.215.228.166:7809",
      },
      {
        label: "instance 2",
        value: "http://103.215.228.166:7810",
      },
      {
        label: "instance 3",
        value: "http://103.215.228.166:7811",
      },
      {
        label: "instance 4",
        value: "http://103.215.228.166:7812",
      },
      {
        label: "instance 5",
        value: "http://103.215.228.166:7813",
      },
    ],
    []
  );

  return (
    <div className="p-8 space-y-6">
      {/* Form Wrapper Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-slate-600" />
            <Label className="text-base font-semibold text-slate-700">
              Platform
            </Label>
          </div>

          <Select onValueChange={setPlatform}>
            <SelectTrigger className="w-full h-12 border-slate-300 hover:border-slate-400 transition">
              <SelectValue placeholder="Select your platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Platforms</SelectLabel>
                {platforms.map((p) => (
                  <SelectItem
                    key={p.value}
                    value={p.value}
                    className="cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Instance Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-slate-600" />
            <Label className="text-base font-semibold text-slate-700">
              Instance
            </Label>
          </div>

          <Select onValueChange={setInstance}>
            <SelectTrigger className="w-full h-12 border-slate-300 hover:border-slate-400 transition">
              <SelectValue placeholder="Select an instance" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Instances</SelectLabel>
                {instances.map((i) => (
                  <SelectItem
                    key={i.value}
                    value={i.value}
                    className="cursor-pointer"
                  >
                    {i.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Agent Provider */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-slate-600" />
            <Label className="text-base font-semibold text-slate-700">
              Agent Provider
            </Label>
          </div>

          <Select onValueChange={setAgentProvider}>
            <SelectTrigger className="w-full h-12 border-slate-300 hover:border-slate-400 transition">
              <SelectValue placeholder="Select an agent provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Agents</SelectLabel>
                {agentsData.map((agent, idx) => (
                  <SelectItem
                    key={idx}
                    value={agent}
                    className="cursor-pointer"
                  >
                    {agent}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic Step Selection */}
        {selectData.map((step, index) => (
          <div key={index}>
            <Label className="text-base font-semibold text-slate-700 block mb-3">
              {step.label}
            </Label>

            <Select onValueChange={(value) => handleSelect(index, value)}>
              <SelectTrigger className="w-full h-12 border-slate-300 hover:border-slate-400 transition">
                <SelectValue placeholder={selectedStep[index] || step.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  {step.data.map((opt, idx) => {
                    const isUsed =
                      Object.values(selectedStep).includes(opt) &&
                      selectedStep[index] !== opt;

                    return (
                      <SelectItem
                        key={idx}
                        value={opt}
                        disabled={isUsed}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {opt}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex w-full justify-end">
        <Button disabled={loading} onClick={handlegetAiActivity}>
          Run the agent
        </Button>
      </div>

      {loading && <LoadingScreen />}
    </div>
  );
}
