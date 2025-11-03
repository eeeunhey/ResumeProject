

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "카카오",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "쿠팡",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "네이버",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },






  {
    id: "1",
    companyName: "카카오",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "쿠팡",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "네이버",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },  

  
];

export const AIResponseFormat = `
interface Feedback {
  overallScore: number; // 0~100, 최종 종합 점수
  resumeCompleteness: { // 이력서 완성도
    score: number; // 0~100
    basis: string[]; // 근거(형식/가독성/내용/ATS호환/전문성 등) - 한글
  };
  ATS: {
    score: number; // 0~100, ATS 적합도
    tips: {
      type: "good" | "improve";
      tip: string; // 한글 요약 제목 (짧게)
      explanation?: string; // 한글 상세 설명 (ATS만 단문도 허용)
    }[]; // 3~4개
  };
  toneAndStyle: {
    score: number; // 0~100
    tips: {
      type: "good" | "improve";
      tip: string; // 한글 요약 제목
      explanation: string; // 한글 상세 설명
    }[]; // 3~4개
  };
  content: {
    score: number; // 0~100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string; // 한글
    }[]; // 3~4개
  };
  structure: {
    score: number; // 0~100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string; // 한글
    }[]; // 3~4개
  };
  skills: {
    score: number; // 0~100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string; // 한글
    }[]; // 3~4개
  };
  missingKeywords?: string[]; // JD 대비 부족한 키워드 목록(한글/영문 혼용 가능)
  priorityFixes: string[]; // 가장 중요한 개선 2~3개(한글, 실행지시 형태)
}
`;


export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  // AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  // AIResponseFormat: string;
}) => `
당신은 ATS(Applicant Tracking System) 및 이력서 분석 전문가입니다.
이 이력서를 철저하고 상세하게 분석하고, 개선 방법을 제안해 주세요.
이력서의 완성도가 낮다면 점수도 과감히 낮게 매겨도 됩니다.
실수나 개선이 필요한 부분이 있다면 주저하지 말고 지적하세요.
가능하다면, 지원 직무의 채용 공고(직무 설명)를 활용해 보다 구체적인 피드백을 제공하세요.
채용 공고가 제공된 경우 반드시 이를 고려하세요.

직무명: ${jobTitle}
채용 공고(직무 설명): ${jobDescription}

반드시 아래 형식(Typescript 인터페이스)을 따르는 JSON으로만 결과를 반환하세요:
${AIResponseFormat}

추가 지시사항:
- JSON 내부의 모든 텍스트(요약, 설명, 팁, 키워드 등)는 반드시 한글로 작성하세요.
- "resumeCompleteness.score"(0~100)를 부여하고, "resumeCompleteness.basis"에는 다음 근거 중 적용한 항목을 구체적으로 기술하세요:
  1) 형식적 요소(필수 정보/섹션/문서 길이)
  2) 가독성(서식 일관성/문법·오탈자/ATS 인식 가능성)
  3) 내용 충실도(구체적 성과/수치화/JD 키워드 반영)
  4) ATS 호환성(파일 형식/표·이미지 최소화/키워드 최적화)
  5) 전문성·차별화(핵심 요약/불필요 정보 제거/차별화된 성과)
- "priorityFixes"에는 전체 제안 중 가장 영향도가 큰 2~3개를 한글 명령형으로 작성하세요.
  (예: "상단에 핵심 요약 섹션 추가", "성과를 %·숫자로 수치화", "JD 핵심 키워드 보강")
- 채용 공고와의 키워드 갭이 있으면 "missingKeywords" 배열에 제시하세요.
- 각 섹션(toneAndStyle/content/structure/skills/ATS)의 tips는 3~4개를 제공하세요.
- 점수는 0~100 범위를 유지하세요.
- 결과는 백틱이나 추가 텍스트 없이, 오직 JSON 객체 하나로만 반환하세요.
`;