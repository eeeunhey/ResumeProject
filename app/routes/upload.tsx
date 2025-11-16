import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

// 마크다운 코드블럭(````json`)이 섞여 들어와도 JSON 부분만 뽑아주는 유틸 함수
function extractJsonString(text: string): string | null {
  if (!text) return null;
  const trimmed = text.trim();

  // ```json ... ``` 형태 제거
  if (trimmed.startsWith("```")) {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    return trimmed.slice(start, end + 1);
  }

  // 이미 순수 JSON일 수도 있으니 그대로 반환
  return trimmed;
}

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
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
    setIsProcessing(true);

    try {
      // 1) PDF 업로드
      setStatusText("파일 업로드 중입니다....");
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) {
        setStatusText("에러: 파일 업로드에 실패했습니다");
        return;
      }

      // 2) PDF → 이미지 변환
      setStatusText("이미지 변환 중...");
      const conversionResult = await convertPdfToImage(file);
      console.log("🧾 pdf 변환 결과 >>>", conversionResult);

      if (!conversionResult || conversionResult.error || !conversionResult.file) {
        console.error("PDF 변환 에러:", conversionResult?.error);
        setStatusText("에러: PDF 이미지 변환에 실패했습니다");
        return;
      }

      const imageFile = conversionResult.file;

      // 3) 변환된 이미지 업로드
      setStatusText("이미지 업로드 중입니다...");
      const uploadedImage = await fs.upload([imageFile]);
      if (!uploadedImage) {
        setStatusText("에러: 이미지 업로드에 실패했습니다...");
        return;
      }

      // 4) KV에 기본 데이터 저장
      setStatusText("잠시만 기다려주세요, 데이터를 정리 중입니다");
      const uuid = generateUUID();

      const data: {
        id: string;
        resumePath: string;
        imagePath: string;
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        feedback: any;
      } = {
        id: uuid,
        resumePath: uploadedFile.path,   // PDF 경로
        imagePath: uploadedImage.path,   // 썸네일 이미지 경로
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      // 5) AI 분석 호출
      setStatusText("분석하는 중...");

      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      if (!feedback) {
        setStatusText("에러: 이력서 분석에 실패하였습니다");
        return;
      }

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      const jsonString = extractJsonString(feedbackText);

      if (!jsonString) {
        console.error("JSON 문자열 추출 실패:", feedbackText);
        setStatusText("에러: 이력서 분석 결과를 해석하는 데 실패했습니다");
        return;
      }

      try {
        data.feedback = JSON.parse(jsonString);
      } catch (e) {
        console.error("JSON 파싱 에러:", e, jsonString);
        setStatusText("에러: 분석 결과 JSON 파싱에 실패했습니다");
        return;
      }

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("분석이 완료되었습니다. 결과 페이지로 이동합니다");
      console.log("최종 데이터:", data);

      // 결과 페이지가 있다면 여기에서 이동
      // navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error(error);
      setStatusText("알 수 없는 에러가 발생했습니다");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) {
      setStatusText("이력서를 업로드해주세요");
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>
            당신의 커리어 목표를 위한 <br />
            스마트 피드백
          </h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>
              이력서를 업로드하고, 당신의 채용 가능성을 높여보세요!
              <br /> (ATS 분석 + 개선 팁 제공)
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
                <label htmlFor="job-description">직무 설명</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="직무 관련 설명을 입력하세요"
                  id="job-description"
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

export default Upload;
