import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  //const [file, setFile] = useState();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file); //onFileSelect가 정의되어 있다면, 그 함수를 file을 전달하면서 실행해라
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {/* {
            isDragActive ?
            <p>파일을 여기로 옮겨주세요 🙂</p> : 
            <p>👉 파일을 이곳에 드래그하거나, 클릭하여 업로드할 파일을 선택하세요.</p>
        } */}
        <div></div>

        {file ? (
          <div
            className="uploader-select-file"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div>
                <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button>
                <img src="/icons/cross.svg" alt="remove" className="w-4 h4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <img src="/icons/info.svg" alt="upload" className="size-20" />
            </div>
            <p>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-lg text-gray-500">
              PDF (max{formatSize(maxFileSize)} 20 MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
