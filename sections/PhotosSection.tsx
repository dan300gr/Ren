"use client";

import { PolaroidCard } from "@/components/nosotras/PolaroidCard";
import { photos } from "@/data/photos";

/** @deprecated Usar NosotrasExperience */
export function PhotosContent() {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-4">
      {photos.map((photo) => (
        <PolaroidCard key={photo.id} photo={photo} size="md" />
      ))}
    </div>
  );
}

export function PhotosSection() {
  return <PhotosContent />;
}
