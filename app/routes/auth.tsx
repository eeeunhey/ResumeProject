import { useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ dom
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
  { title: "Ascend | Auth" },
  { name: "description", content: "로그인 하세요 " },
]);

const AuthPage = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  // next 파라미터 안전 파싱 (기본값 "/"; 외부 URL 차단)
  const nextPath = useMemo(() => {
    const p = new URLSearchParams(location.search);
    const n = p.get("next") || "/";
    return n.startsWith("/") ? n : "/";
  }, [location.search]);

  // 로그인 시작
  const startLogin = useCallback(async () => {
    // 1) 스토어에 signIn 액션이 있다면 그걸 사용
    if (auth?.signIn) {
      await auth.signIn(); // 내부에서 SDK/토큰 처리하도록
      return;
    }

    // 2) 없으면 OAuth URL로 전체 리다이렉트 (Implicit 예시)
    const clientId = import.meta.env.VITE_PUTER_CLIENT_ID!;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const url = new URL("https://api.puter.com/oauth/authorize");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "token"); // code flow 쓰면 "code"
    url.searchParams.set("state", nextPath);        // 로그인 후 돌아갈 경로
    window.location.href = url.toString();
  }, [auth, nextPath]);

  // 로그인 완료되면 next로 이동
  useEffect(() => {
    if (auth?.isAuthenticated) {
      if (location.pathname !== nextPath) {
        navigate(nextPath, { replace: true });
      }
    }
  }, [auth?.isAuthenticated, navigate, nextPath, location.pathname]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col gap-2 text-center">
            <h1>환영합니다!</h1>
            <h2>로그인하고 당신의 커리어를 한 단계 더 발전시켜보세요</h2>
          </div>

          <div className="w-full flex justify-center">
            {isLoading ? (
              <button type="button" className="auth-button animate-pulse">
                <p>로그인 중입니다..</p>
              </button>
            ) : auth?.isAuthenticated ? (
              <button type="button" className="auth-button" onClick={auth.signOut}>
                로그아웃
              </button>
            ) : (
              <button type="button" className="auth-button" onClick={startLogin}>
                <p>로그인</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
