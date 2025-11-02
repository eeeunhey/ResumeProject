import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const upload = () => {
  const { auth, isLoading, fs, ai, kv} = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    //함수 호출하는 순간 true 파일 업로드 안내
    setIsProcessing(true);
    setStatusText("파일 업로드 중입니다....");
    
    const uploadedFile = await fs.upload([file]);
    if(!uploadedFile) return setStatusText('에러: 파일 업로드에 실패했습니다');
    setStatusText('이미지 변환 중...');
     const imageFile = await convertPdfToImage(file);
    if(!imageFile.file) return setStatusText('에러: PDF 이미지 변환에 실패했습니다')
      setStatusText('이미지 업로드 중입니다...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if(!uploadedImage) return setStatusText('에러: 이미지 업로드에 실패했습니다...');
    setStatusText('잠시만 기다려주세요, 데이터를 정리 중입니다');
    const uuid = generateUUID();
    const data = {
      id:uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedFile.path,
      companyName, jobTitle, jobDescription,
      feedback:'',
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText(`분석하는 중...`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    console.log({
      //값이 잘 들어오는 확인용 : 잘들어옴`
      companyName,
      jobTitle,
      jobDescription,
      file,
    });

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>
            {" "}
            당신의 커리어 목표를 위한 <br />
            스마트 피드백{" "}
          </h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>
              {" "}
              이력서를 업로드하고, 당신의 채용 가능성을 높여보세요!
              <br /> (ATS 분석 + 개선 팁 제공){" "}
            </h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">회사명</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="지원하는 회사를 입력하세요"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">지원 직무</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="지원 직무를 입력하세요"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-desctiption">직무 설명</label>
                <textarea
                  rows={5}
                  name="job-desctiption"
                  placeholder="직무 관련 설명을 입력하세요"
                  id="job-desctiption"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">이력서 업로드</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                이력서 분석하기
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
