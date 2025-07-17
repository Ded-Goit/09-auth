//app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const id = useParams<{ id: string }>().id;

  const closeModal = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Modal onClose={closeModal}>
      {isLoading && <p className={css.loadMessage}>Loading, please wait...</p>}
      {!error && !note && !isLoading && (
        <p className={css.errorMessage}>Not found</p>
      )}
      {isError && <p className={css.errorMessage}>Not found</p>}
      {note && isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button className={css.backBtn} onClick={closeModal}>
                Back
              </button>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${formatDate(note.updatedAt)}`
                : `Created at: ${formatDate(note.createdAt)}`}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
