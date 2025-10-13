import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader = () => {
    const onDrop = useCallback(acceptedFiles => {

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="w-full gradient-border">
        
    <div {...getRootProps()}>
        <input {...getInputProps()}/>
        {/* {
            isDragActive ?
            <p>파일을 여기로 옮겨주세요 🙂</p> : 
            <p>👉 파일을 이곳에 드래그하거나, 클릭하여 업로드할 파일을 선택하세요.</p>
        } */}
        <div>
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img src = "/icons/info.svg" alt = "upload" className="size-20" />
            </div>
        </div>


    </div>
        
        </div>
  )
}

export default FileUploader