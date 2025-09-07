import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Section from "@/components/ui/Section";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir);

  const posts: PostMeta[] = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    return {
      slug: file.replace(".mdx", ""),
      ...(data as Omit<PostMeta, "slug">),
    };
  });

  return (
    <>
    <Section className="dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <h1 className="text-3xl font-serif mb-8 text-center">--- Blog ---</h1>
      <div className="grid gap-6 md:grid-cols-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-xl2 border border-base-100 shadow-soft hover:shadow-lg transition"
          >
            <h2 className="text-xl font-serif">{post.title}</h2>
            <p className="text-sm opacity-70">{post.date}</p>
            <p className="mt-2 text-black dark:text-accent-500">&quot;{post.excerpt}&quot;</p>
          </Link>
        ))}
      </div>
    </Section>

    {/* Footer */}
      <footer className="py-8 text-sm text-center border-t border-base-100 dark:border-base-800 bg-white dark:bg-black transition-colors z-[1000]">
        <div className="text-base-700 dark:text-gray-400">
          © 2025 Aditya Raj Singh. All Rights Reserved.
        </div>
        <div className="mt-1 text-accent-500 dark:text-accent-400">
          Pushing boundaries, one project at a time.
        </div>
      </footer>
      </>
  );
}
