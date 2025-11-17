export const agentFullDummy = [
  {
    agent: {
      id: 1,
      name: "Instagram Bot V2",
      platform: "Instagram",
      status: "running",
      createdAt: "2025-11-17T05:00:00.000Z",
      updatedAt: "2025-11-17T05:00:00.000Z",
    },
    activity: {
      id: 11,
      title: "Posting 10 reels",
      description: "Bot posted 10 reels automatically",
      agentId: 1,
      createdAt: "2025-11-17T05:00:30.000Z",
      updatedAt: "2025-11-17T05:00:30.000Z",
    },
    summary: {
      id: 21,
      successRate: "92%",
      notes: "Stable for 3 hours",
      agentId: 1,
    },
  },
  {
    agent: {
      id: 2,
      name: "TikTok Automator X",
      platform: "TikTok",
      status: "running",
      createdAt: "2025-11-17T05:10:00.000Z",
      updatedAt: "2025-11-17T05:10:00.000Z",
    },
    activity: {
      id: 12,
      title: "Uploading 5 videos",
      description: "Auto-uploading content from queue",
      agentId: 2,
      createdAt: "2025-11-17T05:10:20.000Z",
      updatedAt: "2025-11-17T05:10:20.000Z",
    },
    summary: {
      id: 22,
      successRate: "89%",
      notes: "Occasional delays",
      agentId: 2,
    },
  },
  {
    agent: {
      id: 3,
      name: "Facebook Booster",
      platform: "Facebook",
      status: "stopped",
      createdAt: "2025-11-17T05:20:00.000Z",
      updatedAt: "2025-11-17T05:25:00.000Z",
    },
    activity: {
      id: 13,
      title: "Posting status",
      description: "Auto status posting stopped",
      agentId: 3,
      createdAt: "2025-11-17T05:20:30.000Z",
      updatedAt: "2025-11-17T05:25:00.000Z",
    },
    summary: {
      id: 23,
      successRate: "64%",
      notes: "Stopped due to errors",
      agentId: 3,
    },
  },
];

const prompData = [
  "Create 1 post related to AI, tech, or lifestyle. Include a short caption. After posting, extract and save the post ID or direct URL.",
  
  "Scroll through the feed for several seconds. Collect and record multiple viewed posts, including post ID, author, and snippet of the content if available.",
  
  "Watch 2–3 videos until completion. For each video, record the title, duration, and video URL if accessible.",
  
  "Like at least 3 posts in the same niche. For every liked post, record post ID, title, and author username.",
  
  "Bookmark or save 2–3 interesting posts. For each saved post, record post ID, title, and author.",
  
  "Comment naturally on 2–3 posts. For each comment, store post ID, post title, author username, and the comment text written.",
  
  "Follow 2–5 niche-related accounts. For each followed profile, record the username and account display name."
];

export  const selectData = [
    {
      label: "Select the First Step",
      title: "First Step",
      data: prompData,
    },
    {
      label: "Select the Second Step",

      title: "Second Step",
      data: prompData,
    },
    {
      label: "Select the Third Step",
      title: "Third Step",
      data: prompData,
    },
    {
      label: "Select the Fourth Step",

      title: "Fourt Step",
      data: prompData,
    },
    {
      label: "Select the Fifth Step",

      title: "Fifth Step",
      data: prompData,
    },
    {
      label: "Select the Sixth Step",

      title: "Sixth Step",
      data: prompData,
    },
    {
      label: "Select the Seventh Step",

      title: "Seventh Step",
      data: prompData,
    },
    
  ];
 