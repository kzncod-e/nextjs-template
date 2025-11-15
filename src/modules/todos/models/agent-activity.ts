export interface AgentActivitySession {
  sessionId: string;
  agent: string;
  platform: string;
  startTime: string;
  endTime: string;
  status: "completed" | "failed" | "running";
  activities: Activity[];
  summary: SessionSummary;
}

/* -------------------- ACTIVITY UNION TYPE -------------------- */
export type Activity =
  | LoginActivity
  | PostActivity
  | ScrollFeedActivity
  | WatchVideoActivity
  | LikeActivity
  | BookmarkActivity
  | CommentActivity
  | FollowActivity;

/* -------------------- ACTIVITY TYPES -------------------- */

export interface BaseActivity {
  type: string;
  status: "done" | "failed";
  timestamp: string;
}

/* LOGIN */
export interface LoginActivity extends BaseActivity {
  type: "login";
  details: string;
}

/* POST */
export interface PostActivity extends BaseActivity {
  type: "post";
  details: string;
  post: {
    id: string;
    title: string;
    caption: string;
    link: string;
  };
}

/* SCROLL FEED */
export interface ScrollFeedActivity extends BaseActivity {
  type: "scroll_feed";
  viewedPosts: {
    id: string;
    author: string;
    title: string;
  }[];
}

/* WATCH VIDEO */
export interface WatchVideoActivity extends BaseActivity {
  type: "watch_video";
  videos: {
    id: string;
    title: string;
    duration: string; // 00:45
  }[];
}

/* LIKE */
export interface LikeActivity extends BaseActivity {
  type: "like";
  likedPosts: {
    id: string;
    title: string;
    author: string;
  }[];
}

/* BOOKMARK */
export interface BookmarkActivity extends BaseActivity {
  type: "bookmark";
  savedPosts: {
    id: string;
    title: string;
  }[];
}

/* COMMENT */
export interface CommentActivity extends BaseActivity {
  type: "comment";
  commentedPosts: {
    id: string;
    title: string;
    author: string;
    comment: string;
  }[];
}

/* FOLLOW */
export interface FollowActivity extends BaseActivity {
  type: "follow";
  followedAccounts: {
    username: string;
    name: string;
  }[];
}

/* SUMMARY */
export interface SessionSummary {
  totalActions: number;
  successRate: string; // "100%"
  notes: string;
}
