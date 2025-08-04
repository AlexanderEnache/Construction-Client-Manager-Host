import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FilePreview from "@/components/filePreview";

interface PageProps {
  params: {
    proposalId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const supabase = await createClient();

  const { data: proposal, error } = await supabase
    .from("proposals")
    .select(`
      id,
      file_url,
      title,
      clients (
        name,
        email
      )
    `)
    .eq("id", params.proposalId)
    .single();

  if (error || !proposal) {
    console.error("Supabase error:", error);
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">{proposal.title}</h1>
      <FilePreview
        proposalId={params.proposalId}
        fileUrl={proposal.file_url}
        // signerName={proposal.clients?.name ?? "Unknown"}
        // signerEmail={proposal.clients?.email ?? "Unknown"}
        signerName={"Name"}
        signerEmail={"alex.d.enache@gmail.com"}
        proposalTitle={proposal.title}
      />
    </div>
  );
}
