import { NextResponse } from "next/server";

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
        // cache for 5 minutes to avoid hitting rate-limits
        next: { revalidate: 300 },
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

    const items = (await res.json()) as any[];

    const normalized: Activity[] = items
      .map((e) => {
        const type = e.type as string;
        const repo = e.repo?.name as string | undefined;
        const createdAt = e.created_at as string;
        if (!repo) return null;

        // Defaults
        let action = "activity";
        let message = type;
        let url = repoUrl(repo);

        // Handle common event types
        switch (type) {
          case "PushEvent": {
            action = "pushed";
            const commits: any[] = e.payload?.commits || [];
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
            const prAction = e.payload?.action;
            action = prAction || "pull_request";
            message = pr?.title || "Pull request";
            url = pr?.html_url || repoUrl(repo);
            break;
          }
          case "IssuesEvent": {
            const issue = e.payload?.issue;
            const issAction = e.payload?.action;
            action = issAction || "issue";
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
            // Keep it generic for other events
            action = type.replace(/Event$/, "").toLowerCase();
            message = action;
            url = repoUrl(repo);
          }
        }

        return {
          id: e.id as string,
          type,
          repo,
          action,
          message,
          url,
          createdAt,
        } satisfies Activity;
      })
      .filter((activity): activity is Activity => activity !== null)
      .slice(0, 8); // show latest 8 items

    return NextResponse.json({ ok: true, data: normalized });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
