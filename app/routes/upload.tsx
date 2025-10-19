import { type FormEvent, useState } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect=(file:File | null) => {
    setFile(file)
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closet('from');
    if(!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name');
    const jobTitle = formData.get('job-title');
    const jobDescription = formData.get('job-description');

    console.log({
      companyName, jobTitle, jobDescription, file
    })

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
                <FileUploader onFileSelect={handleFileSelect}/>
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
