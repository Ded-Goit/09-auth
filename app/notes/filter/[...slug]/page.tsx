//app/notes/filter/[...slug]\page.tsx
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Note } from "@/types/note";
import { Metadata } from "next";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const tagName = slug[0] === "all" ? "All notes" : capitalize(slug[0]);

  return {
    title: tagName,
    description: `This page contains notes from the category ${tagName}.`,
    openGraph: {
      title: tagName,
      description: `This page contains notes from the category ${tagName}.`,
      url: `https://08-zustand-puce.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notes",
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const resolvedParams = await params;

  // Перевірка slug
  const slug = resolvedParams?.slug;
  const tag =
    Array.isArray(slug) && slug.length > 0 && slug[0] !== "all" ? slug[0] : "";

  const queryClient = new QueryClient();

  const initialQuery: string = "";
  const initialPage: number = 1;

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", initialQuery, initialPage, tag],
      queryFn: () => fetchNotes(initialQuery, initialPage, tag),
    });
  } catch (error) {
    console.error("Error prefetching notes:", error);
  }

  const initialData = queryClient.getQueryData([
    "notes",
    initialQuery,
    initialPage,
    tag,
  ]) as
    | {
        notes: Note[];
        totalPages: number;
      }
    | undefined;

  // Перевірка initialData
  if (!initialData || !Array.isArray(initialData.notes)) {
    console.warn("No valid initial data for notes.");
    return <p>Failed to load notes.</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        query={initialQuery}
        page={initialPage}
        initialData={initialData}
        tag={tag}
      />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
