"use client";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = function () {
    if (!file) return;
    const fileRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setDownloadURL(downloadURL)
        );
      }
    );
  };
  const handleDownload = function () {
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = file?.name || "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Uploaf file to firebase</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white px-4 pt-2 mt-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      {uploadProgress > 0 && <progress value={uploadProgress} max={"100"} />}
      {downloadURL && (
        <div className="mt-4">
          <p>File Uploaded Successfully</p>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            Donwload URL
          </a>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
