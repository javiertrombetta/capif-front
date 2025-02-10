import { useState } from "react";

const useFileHandler = (initialFiles?: Record<string, File[]>) => {
  const [files, setFiles] = useState<Record<string, File[]>>(
    initialFiles || {}
  );

  const handleFileChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFiles((prevFiles) => {
          const fileList = prevFiles[key] || [];
          const isDuplicate = fileList.some(
            (file) =>
              file.name === selectedFile.name && file.size === selectedFile.size
          );
          if (!isDuplicate) {
            return { ...prevFiles, [key]: [...fileList, selectedFile] };
          } else {
            console.log("El archivo ya fue agregado.");
            return prevFiles;
          }
        });
      }
      e.target.value = "";
    };

  const handleRemoveFile = (key: string) => (index: number) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [key]: prevFiles[key]?.filter((_, i) => i !== index) || [],
    }));
  };

  return { files, setFiles, handleFileChange, handleRemoveFile };
};

export default useFileHandler;
