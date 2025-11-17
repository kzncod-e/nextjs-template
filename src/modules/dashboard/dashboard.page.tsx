"use client";

import { useEffect, useState } from "react";

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
import AgentListPage from "./components/agent-activity";
import { selectData } from "./data";
export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [instance, setInstance] = useState("");
  const [agent, setAgent] = useState("google");
  const [error, setError] = useState<string | null>(null);
  const { setAgentData, agentData } = useAgentStore.getState();
  const [selectedStep, setselectedStep] = useState<{
    [key: number]: string;
  }>({});
  const handleSelect = (index, value) => {
    setselectedStep((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  function fixPythonList(str: string) {
    return str
      .replace(/None/g, "null") // ubah None → null
      .replace(/'/g, '"'); // ubah ' → "
  }
  const agentsData = ["ollama", "moonshot", "google"];
  const getAi = () => {
    setLoading(true);
    setError(null);

    axios
      .post("/api/agent/activity", { selectedStep, instance, platform })
      .then((res) => {
        const stream = res.data?.data?.data;

        if (!stream) {
          setError("Invalid agent response");
          return;
        }

        console.log("📌 Stream Data", stream);
        let parsedData;
        let mainData = stream[1];
        let subData = fixPythonList(stream[2]);
        console.log(subData);

        parsedData = JSON.parse(subData);

        if (stream[1] !== null) {
          setData(parsedData);
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log("❌ Error:", err);
      })
      .finally(() => setLoading(false));
  };

  const handlegetAiActivity = async () => {
    getAi();
  };
  useEffect(() => {
    console.log(loading, "loadingg.....");
  }, [loading]);
  // console.log(data.data[1]);
  // useEffect(() => {
  //   console.log(selectedStep);
  // }, [selectedStep]);
  useEffect(() => {
    console.log(data, "ini data");
  }, [data]);
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Debug Info - Remove in production */}

        {/* Header */}
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl  my-6 font-bold">Ai Prompt</h1>
          <div className="w-full bg-slate-100 flex flex-col items-center justify-center p-10 rounded-2xl">
            <form action="" className="w-fit p-6 flex flex-col bg-white">
              <Select onValueChange={(value) => setPlatform(value)}>
                <Label className="mt-2  mb-2 font-sans text-black/40">
                  Select your Platform
                </Label>
                <SelectTrigger className="w-[40rem]">
                  <SelectValue placeholder={platform} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Platform</SelectLabel>

                    <SelectItem value="youtube.com">Youtube</SelectItem>
                    <SelectItem value="instagram.com">Instagram</SelectItem>
                    <SelectItem value="x.com">Twitter</SelectItem>
                    <SelectItem value="tiktok.com">Tiktok</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setInstance(value)}>
                <Label className="mt-2  mb-2 font-sans text-black/40">
                  Select The instance
                </Label>
                <SelectTrigger className="w-[40rem]">
                  <SelectValue placeholder={instance} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>instances</SelectLabel>

                    <SelectItem value="http://103.215.228.166:7809">
                      Instance 1
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7810">
                      Instance 2
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7811">
                      Instance 3
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7812">
                      Instance 4
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7813">
                      Instance 5
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setAgent(value)}>
                <Label className="mt-2  mb-2 font-sans text-black/40">
                  Select The agent provider
                </Label>
                <SelectTrigger className="w-[40rem]">
                  <SelectValue placeholder={agent} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>agents</SelectLabel>
                    {agentsData.map((el, index) => (
                      <SelectItem key={index} value={el}>
                        {el}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectData.map((el, index) => (
                <Select
                  key={index}
                  onValueChange={(value) => handleSelect(index, value)}
                >
                  <div className="flex  flex-col gap-4">
                    <Label className="mt-2 font-sans text-black/40">
                      {el.label}
                    </Label>

                    <div className="flex justify-center items-center">
                      <SelectTrigger className="w-[40rem]">
                        <SelectValue
                          placeholder={selectedStep[index] || el.title}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Prompt</SelectLabel>

                          {el.data.map((ele, idx) => {
                            const isUsed =
                              Object.values(selectedStep).includes(ele) &&
                              selectedStep[index] !== ele;

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
            <div className="flex w-full mt-7 justify-end">
              <button
                disabled={loading ? true : false}
                onClick={handlegetAiActivity}
                className="rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-sm font-medium"
              >
                Run the agent
              </button>
            </div>
          </div>
          {/* <h1 className="text-2xl font-semibold tracking-tight">
            AI Agent Overview
          </h1> */}
        </div>

        {loading ? <DashboardLoader /> : <AgentListPage />}
      </div>
    </div>
  );
}
