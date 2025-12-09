import { useEffect, useRef, useState } from "react";

import Input from "./Input";

type ImageUploadProps = {
  onChangeFile?: (file: File | null) => void;
};

const ImageUpload = ({ onChangeFile }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastPreviewRef = useRef<string | null>(null);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      onChangeFile?.(file);
    }
  };

  useEffect(() => {
    if (lastPreviewRef.current && lastPreviewRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(lastPreviewRef.current);
    }

    lastPreviewRef.current = preview;

    return () => {
      if (
        lastPreviewRef.current &&
        lastPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(lastPreviewRef.current);
      }
    };
  }, [preview]);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer h-[220px]"
    >
      <div className="w-full h-[220px] bg-[#3A3A3A] rounded-lg overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            <div className="w-20 h-20 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
              📷
            </div>
          </div>
        )}
      </div>
      <Input type="file" hidden ref={inputRef} onChange={handlePreview} />
    </div>
  );
};

export default ImageUpload;
