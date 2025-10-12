import React, { useState } from 'react'
import Navbar from '~/components/Navbar'

const upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('')

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
        <section className="main-section">
        <div className='page-heading'>
            <h1> 당신의 커리어 목표를 위한 <br/>스마트 피드백 </h1>
            {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" className='w-full'/>
                    </>
            ):(
                <h2> 이력서를 업로드하고, 당신의 채용 가능성을 높여보세요!<br/> (ATS 분석 + 개선 팁 제공) </h2>
            )}
        </div>

        </section>
    </main>
  )
}

export default upload