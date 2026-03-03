"use client";

import { ToolPageLayout, FileUploadZone } from "@toolbox/ui";

interface ToolPageClientProps {
  title: string;
  description: string;
  acceptedTypes: string;
  backHref: string;
  backLabel: string;
  dropLabel: string;
  formatsLabel: string;
}

export function ToolPageClient({
  title,
  description,
  acceptedTypes,
  backHref,
  backLabel,
  dropLabel,
  formatsLabel,
}: ToolPageClientProps) {
  const handleFiles = (files: File[]) => {
    console.log(`[${title}] Files received:`, files.map((f) => f.name));
  };

  return (
    <ToolPageLayout title={title} description={description} backHref={backHref} backLabel={backLabel}>
      <FileUploadZone
        accept={acceptedTypes}
        onFiles={handleFiles}
        title={dropLabel}
        description={`${formatsLabel}: ${acceptedTypes}`}
      />
    </ToolPageLayout>
  );
}
