export const meta = () => ([
    { title: 'Ascend | Auth'},
    { name : 'description', content: '로그인 하세요 '},

])


const auth = () => {
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center ">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1> 환영합니다! </h1>
              <h2>로그인하고 당신의 커리어 여정을 이어가세요</h2>
            </div>
                
            </section>

        </div>
    </main>
  )
}

export default auth