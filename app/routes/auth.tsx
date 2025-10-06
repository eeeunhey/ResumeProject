import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
  { title: 'Ascend | Auth' },
  { name: 'description', content: '로그인 하세요 ' },
])

const AuthPage = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navigate(next);
  },[auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        {/* 섹션 자체를 세로 플렉스 + 가로 가운데 정렬 */}
        <section className="flex flex-col items-center gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>환영합니다!</h1>
            <h2>로그인하고 당신의 커리어를 한 단계 더 발전시켜보세요</h2>
          </div>

          {/* 버튼 컨테이너를 가운데 정렬 */}
          <div className="w-full flex justify-center">
            {isLoading ? (
              <button type="button" className="auth-button animate-pulse">
                <p>로그인 중입니다..</p>
              </button>
            ) : (
              <>
                {auth?.isAuthenticated ? (
                  <button
                    type="button"
                    className="auth-button"
                    onClick={auth.signOut}
                  >
                    로그아웃
                  </button>
                ) : (
                  <button type="button" className="auth-button">
                    <p>로그인</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;
