import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Section from "@/components/ui/Section";

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const postPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  const source = fs.readFileSync(postPath, "utf-8");
  const { content, data } = matter(source);

  const readingTime = calculateReadingTime(content);

  return (
    <Section className="dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <article className="prose prose-md dark:prose-invert mx-auto">
        <p className="text-sm opacity-70">
          {readingTime} min read :
        </p>
        <h1 className="font-serif">{data.title}</h1>
        <p className="text-sm opacity-70">{data.date}</p>
        <p className="font-serif dark:border-base-800 border-b border-base-100 pb-6 mb-12">"{data.excerpt}"</p>
        <MDXRemote source={content} />
      </article>
    </Section>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const postPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  const source = fs.readFileSync(postPath, "utf-8");
  const { data } = matter(source);

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      type: "article",
      url: `https://yourdomain.com/blog/${params.slug}`,
      images: ["/og-image.png"], // 👈 reuse your OG image
    },
  };
}