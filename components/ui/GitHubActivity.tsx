"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Activity = {
  id: string;
  type: string;
  repo: string;
  action: string;
  message: string;
  url: string;
  createdAt: string;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

export default function GitHubActivity() {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/github", { cache: "no-store" });
        const json = await res.json();
        if (mounted) {
          if (json.ok) {
            setData(json.data);
          } else {
            setFailed(true);
          }
        }
      } catch {
        if (mounted) setFailed(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-6 grid gap-3">
        <div className="h-12 rounded-xl2 bg-base-100 dark:bg-base-800 animate-pulse" />
        <div className="h-12 rounded-xl2 bg-base-100 dark:bg-base-800 animate-pulse" />
        <div className="h-12 rounded-xl2 bg-base-100 dark:bg-base-800 animate-pulse" />
      </div>
    );
  }

  if (failed) {
    // Graceful fallback: simple contribution graph snapshot (remote image)
    const user = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "aditya024RS";
    return (
      <div className="mt-6">
        <p className="text-sm text-base-700 dark:text-base-300 max-w-3xl">
          Couldn’t load live activity right now! Here’s a recent contribution graph :
        </p>
        <div className="mt-3 overflow-hidden rounded-xl2 border border-base-100 dark:border-base-800">
          <img
            src={`https://ghchart.rshah.org/${user}`}
            alt="GitHub contribution graph"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {data.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl2 border border-base-100 dark:border-base-800 bg-white dark:bg-base-900 p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-base-600 dark:text-base-300">
                <span className="font-medium text-base-900 dark:text-white">{item.action}</span>{" "}
                in <span className="font-mono">{item.repo}</span>
              </div>
              <div className="mt-1 text-sm text-base-700 dark:text-base-200 line-clamp-2">
                {item.message}
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-accent-600 hover:text-accent-700 dark:text-accent-400"
              >
                View on GitHub →
              </a>
            </div>
            <span className="shrink-0 text-xs text-base-500 dark:text-base-400">{timeAgo(item.createdAt)}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
