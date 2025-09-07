import { NextResponse } from "next/server";

type Commit = {
  message: string;
  sha: string;
};

type PullRequest = {
  title?: string;
  html_url?: string;
};

type Issue = {
  title?: string;
  html_url?: string;
};

type EventPayload = {
  commits?: Commit[];
  pull_request?: PullRequest;
  issue?: Issue;
  action?: string;
  ref_type?: string;
  ref?: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  repo?: { name?: string };
  created_at: string;
  payload?: EventPayload;
};

type Activity = {
  id: string;
  type: string;
  repo: string;
  action: string;
  message: string;
  url: string;
  createdAt: string;
};

const USER = process.env.GITHUB_USERNAME || "aditya024RS";
const TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

const repoUrl = (fullName: string) => `https://github.com/${fullName}`;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/events/public`,
      {
        next: { revalidate: 300 }, // cache for 5 mins
        headers,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { ok: false, error: `GitHub API error ${res.status}: ${text}` },
        { status: 500 }
      );
    }

    const items: GitHubEvent[] = await res.json();

    const normalized: Activity[] = items
      .map((e) => {
        const type = e.type;
        const repo = e.repo?.name;
        const createdAt = e.created_at;
        if (!repo) return null;

        let action = "activity";
        let message = type;
        let url = repoUrl(repo);

        switch (type) {
          case "PushEvent": {
            action = "pushed";
            const commits = e.payload?.commits || [];
            const first = commits[0];
            message =
              commits.length > 0
                ? commits.map((c) => c.message).join(" • ")
                : "Pushed commits";
            const sha = first?.sha;
            if (sha) url = `${repoUrl(repo)}/commit/${sha}`;
            break;
          }
          case "PullRequestEvent": {
            const pr = e.payload?.pull_request;
            action = e.payload?.action || "pull_request";
            message = pr?.title || "Pull request";
            url = pr?.html_url || repoUrl(repo);
            break;
          }
          case "IssuesEvent": {
            const issue = e.payload?.issue;
            action = e.payload?.action || "issue";
            message = issue?.title || "Issue";
            url = issue?.html_url || repoUrl(repo);
            break;
          }
          case "CreateEvent": {
            const refType = e.payload?.ref_type;
            const ref = e.payload?.ref;
            if (refType === "repository") {
              action = "created";
              message = `Created repository ${repo}`;
              url = repoUrl(repo);
            } else if (refType === "branch") {
              action = "created";
              message = `Created branch ${ref}`;
              url = `${repoUrl(repo)}/tree/${ref}`;
            }
            break;
          }
          default: {
            action = type.replace(/Event$/, "").toLowerCase();
            message = action;
            url = repoUrl(repo);
          }
        }

        return {
          id: e.id,
          type,
          repo,
          action,
          message,
          url,
          createdAt,
        } satisfies Activity;
      })
      .filter((activity): activity is Activity => activity !== null)
      .slice(0, 8);

    return NextResponse.json({ ok: true, data: normalized });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
