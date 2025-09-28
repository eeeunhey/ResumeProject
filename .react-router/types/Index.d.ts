    // 인터페이스를 왜 썻을까
    // 객체의 구조를 이런식으로 정할거다 라는 약속의 의미
    // 타입 스트립트의 경우 타입에 대한 정보를 정하지 않으면 오류가 난다

    /*  객체구조를 여러 곳에서 사용해야 할 떄 번거로움 방지
            Resume 이라는 데이터 구조를 여러 컴포넌트에서 사용할거다 
            각각 사용하는 컴포넌트에 구현하면 인터페이스 없이 구현한다 아래처럼 구현하면 된다
            예 : {id: string; companyName: String;} 얼마나 귀찮.. 
            정말 생각만해도 싫다
    */

    /*  코드 자동완성 / 타입 체크가 가능해진다
        resumes[0].feedback.ATS. 입력하면 -> ATS: { score: number; tips: string[] } 인식해서 score, tip 자동완성 가능
        속성명 헷갈림 방지 : feedback.atsscore 쓰면 에러 잡아줌
    */

    /* 협업 시 규칙 통일
        나중에 팀원들에게 구조를 알려줄 수 있다 너무 좋다... 이런방법이!!!  
    */

    /* index.d.ts 라는 파일을 사용할까
        .d.ts 실행되는 js코드가 안들어감 타입 이거다 타입 기록 느낌
        index.d.ts안에 interface Resume 을 작성해놓으면 언제 어디서든 Resume 타입을 import 없이 바로 쓸 수 있다 
        유레카!!!!! 이럴수가 상당히 편리하군!!!

    */

    /* Resume를 interface와 type */



interface Job {
    title: string;
    description: string;
    loaction: string;
    requiredSkills: string[];
}

interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "좋음" | "개선필요";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "좋음" | "개선필요";
            tip: string;
            explantion: string; 
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "좋음" | "개선필요";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "좋음" | "개선필요";
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "좋음" | "개선필요";
            tip: string;
            explanation: string;
        }[];
    };
}