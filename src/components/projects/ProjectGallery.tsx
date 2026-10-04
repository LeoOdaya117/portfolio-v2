"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ProjectArtwork from "@/components/projects/ProjectArtwork";
import type { Project } from "@/types/project";
import styles from "./ProjectGallery.module.css";

type ProjectGalleryProps = Readonly<{
  project: Project;
  sizes?: string;
}>;

export default function ProjectGallery({
  project,
  sizes,
}: ProjectGalleryProps) {
  const images = project.galleryImages?.length
    ? project.galleryImages
    : project.coverImage
      ? [project.coverImage]
      : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isPreviewOpen = previewIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isPreviewOpen && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      closeButtonRef.current?.focus();
    } else if (!isPreviewOpen && dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [isPreviewOpen]);

  if (!images.length) {
    return (
      <div
        className={styles.artworkFallback}
        role="group"
        aria-label={project.title + " artwork"}
      >
        <ProjectArtwork project={project} sizes={sizes} />
      </div>
    );
  }

  const activeImage = images[activeIndex];

  function stepImage(direction: -1 | 1) {
    const currentIndex = previewIndex ?? activeIndex;
    const nextIndex = (currentIndex + direction + images.length) % images.length;

    setActiveIndex(nextIndex);
    if (previewIndex !== null) setPreviewIndex(nextIndex);
  }

  function openPreview(index: number) {
    setActiveIndex(index);
    setPreviewIndex(index);
  }

  function closePreview() {
    setPreviewIndex(null);
  }

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft" && images.length > 1) {
      event.preventDefault();
      stepImage(-1);
    } else if (event.key === "ArrowRight" && images.length > 1) {
      event.preventDefault();
      stepImage(1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closePreview();
    }
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closePreview();
  }

  return (
    <div
      className={styles.gallery}
      role="group"
      aria-label={project.title + " image gallery"}
    >
      <div className={styles.stage}>
        <button
          ref={previewButtonRef}
          className={styles.previewButton}
          type="button"
          aria-label={`Open image ${activeIndex + 1} of ${images.length}: ${activeImage.alt}`}
          onClick={() => openPreview(activeIndex)}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes={sizes ?? "(max-width: 850px) 100vw, 50vw"}
            className={styles.stageImage}
            preload
          />
          <span className={styles.previewPrompt}>
            <Expand aria-hidden="true" size={15} strokeWidth={1.9} />
            View full size
          </span>
        </button>

        {images.length > 1 ? (
          <>
            <button
              className={[styles.stageControl, styles.previousControl].join(" ")}
              type="button"
              aria-label="Previous image"
              onClick={() => stepImage(-1)}
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <button
              className={[styles.stageControl, styles.nextControl].join(" ")}
              type="button"
              aria-label="Next image"
              onClick={() => stepImage(1)}
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </>
        ) : null}

        <span className={styles.counter} aria-live="polite">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 ? (
        <div className={styles.thumbnails} role="group" aria-label="Choose an image">
          {images.map((image, index) => (
            <button
              key={image.src}
              className={styles.thumbnail}
              type="button"
              aria-label={`Show image ${index + 1}: ${image.caption ?? image.alt}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <span className={styles.thumbnailFrame}>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="96px"
                  className={styles.thumbnailImage}
                />
              </span>
              <span className={styles.thumbnailNumber}>{index + 1}</span>
            </button>
          ))}
        </div>
      ) : null}

      {activeImage.caption ? (
        <p className={styles.caption}>{activeImage.caption}</p>
      ) : null}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-labelledby="project-gallery-preview-title"
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClose={closePreview}
        onClick={handleDialogClick}
        onKeyDown={handleDialogKeyDown}
      >
        {previewIndex !== null ? (
          <div className={styles.lightboxContent}>
            <div className={styles.lightboxHeader}>
              <div>
                <p className={styles.lightboxEyebrow}>Project gallery</p>
                <h2 id="project-gallery-preview-title">
                  {project.title} image preview
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                className={styles.closeButton}
                type="button"
                aria-label="Close image preview"
                onClick={closePreview}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <div className={styles.previewStage}>
              <Image
                src={images[previewIndex].src}
                alt={images[previewIndex].alt}
                fill
                sizes="94vw"
                className={styles.previewImage}
              />
              {images.length > 1 ? (
                <>
                  <button
                    className={[styles.previewControl, styles.previewPrevious].join(" ")}
                    type="button"
                    aria-label="Previous image"
                    onClick={() => stepImage(-1)}
                  >
                    <ArrowLeft aria-hidden="true" size={20} />
                  </button>
                  <button
                    className={[styles.previewControl, styles.previewNext].join(" ")}
                    type="button"
                    aria-label="Next image"
                    onClick={() => stepImage(1)}
                  >
                    <ArrowRight aria-hidden="true" size={20} />
                  </button>
                </>
              ) : null}
            </div>

            <div className={styles.lightboxFooter}>
              <p>{images[previewIndex].caption ?? images[previewIndex].alt}</p>
              <span aria-live="polite">
                {previewIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
