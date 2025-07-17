//app/notes/[id]/page.tsx
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Note not found | NoteHub",
      description: "The requested note does not exist.",
      openGraph: {
        title: "Note not found | NoteHub",
        description: "The requested note does not exist.",
        url: `https://08-zustand-puce.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Note Details",
          },
        ],
      },
    };
  }

  return {
    title: note.title,
    description:
      note.content?.slice(0, 100) || "Details about this note on NoteHub.",
    openGraph: {
      title: note.title,
      description:
        note.content?.slice(0, 100) || "Details about this note on NoteHub.",
      url: `https://08-zustand-puce.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note Details",
        },
      ],
    },
  };
}
async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const parseId = Number(id);
  queryClient.prefetchQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </>
  );
}

export default NoteDetails;
