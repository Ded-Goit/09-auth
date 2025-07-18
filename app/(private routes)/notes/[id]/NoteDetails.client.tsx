//app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { PropagateLoader } from "react-spinners";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const parseId = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <div>
        <PropagateLoader color="#0d6efd" size={11} speedMultiplier={2} />
      </div>
    );

  if (error) return <p>Something went wrong.</p>;
  if (!note) return <p>Sorry, note not found.</p>;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note.updatedAt
            ? `Updated at: ${formatDate(note.updatedAt)}`
            : `Created at: ${formatDate(note.createdAt)}`}
        </p>
      </div>
    </div>
  );
}
