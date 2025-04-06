"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  type: "image" | "video" | "file";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(value ?? null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = type === "image" ? 20 : 50;
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File size too large",
        description: `Max ${maxSize}MB allowed`,
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(10);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setProgress(100);
      setFileUrl(data.filePath);
      onFileChange(data.filePath);

      toast({
        title: "Uploaded successfully",
        description: data.filePath,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      setProgress(0);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
        id="fileInput"
      />

      <label htmlFor="fileInput" className={cn("upload-btn", styles.button)}>
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {fileUrl && (
          <p className={cn("upload-filename", styles.text)}>{fileUrl}</p>
        )}
      </label>

      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {fileUrl && type === "image" && (
        <img
          src={fileUrl}
          alt="Uploaded preview"
          className="w-full rounded-md"
        />
      )}

      {fileUrl && type === "video" && (
        <video controls className="w-full rounded-md">
          <source src={fileUrl} />
        </video>
      )}
    </div>
  );
};

export default FileUpload;
