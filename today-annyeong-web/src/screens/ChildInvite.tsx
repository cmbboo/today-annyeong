'use client'
import { useState } from 'react'
import { ScreenProps } from '../types'
import { INVITE_CODE } from '../data'

export default function ChildInvite({ navigation, setConnected }: ScreenProps) {
  const [joined,  setJoined]  = useState(false)
  const [copied,  setCopied]  = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_CODE)
    } catch {
      // 클립보드 미지원 환경 무시
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoined = () => {
    setConnected('child')
    setJoined(true)
  }

  // ── 연결 완료 화면 ──
  if (joined) {
    return (
      <div className="flex flex-col h-full safe-top bg-cream px-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-brand-light border border-pos-border
                          flex items-center justify-center text-4xl">
            ❤️
          </div>
          <h2 className="text-2xl font-semibold text-ink">어머니와 연결되었어요</h2>
          <p className="text-base text-ink-sub leading-relaxed">
            이제 어머니의 오늘 안녕을<br />확인할 수 있어요.
          </p>
          <div className="bg-cream-card border border-border rounded-2xl px-5 py-3 mt-2">
            <p className="text-sm text-ink-hint">연결된 안녕코드</p>
            <p className="text-2xl font-bold text-brand tracking-widest mt-0.5">{INVITE_CODE}</p>
          </div>
        </div>
        <div className="flex-shrink-0 pb-8 safe-bottom">
          <button
            onClick={() => navigation.navigate('ChildReport')}
            className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl
                       font-semibold active:bg-brand-dark transition-colors"
          >
            오늘 안녕 확인하러 가기
          </button>
        </div>
      </div>
    )
  }

  // ── 초대 화면 ──
  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 상단 */}
      <div className="flex-shrink-0 px-5 pt-4">
        <button onClick={() => navigation.goBack()}
          className="text-brand text-base font-medium py-2">← 뒤로</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-10">
        <h2 className="text-2xl font-semibold text-ink mb-2">부모님을 초대해보세요</h2>
        <p className="text-base text-ink-sub mb-8 leading-relaxed">
          아래 안녕코드를 부모님께 보내주세요.<br />
          부모님이 코드를 입력하면 연결돼요.
        </p>

        {/* 초대코드 카드 */}
        <div className="bg-brand-light border border-pos-border rounded-2xl p-6
                        flex flex-col items-center mb-6">
          <p className="text-sm text-brand-text mb-2">안녕코드</p>
          <p className="text-5xl font-bold text-brand tracking-[0.2em] mb-1">{INVITE_CODE}</p>
          <p className="text-xs text-brand-text opacity-70">부모님께 이 숫자를 알려주세요</p>
        </div>

        {/* 안내 */}
        <div className="bg-cream-card border border-border rounded-xl p-4 mb-6">
          <p className="text-sm text-ink-sub leading-relaxed">
            💬 사용법: 부모님 폰에서 앱을 열고<br />
            "부모님으로 참가하기"를 선택한 뒤<br />
            위 코드 <span className="font-bold text-brand">{INVITE_CODE}</span>를 입력하세요.
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex-shrink-0 px-6 pb-8 safe-bottom flex flex-col gap-3">
        <button
          onClick={handleCopy}
          className={`w-full min-h-btn rounded-2xl text-lg font-semibold
                      border transition-colors
                      ${copied
                        ? 'bg-brand-light border-pos-border text-brand-text'
                        : 'bg-cream-card border-border text-ink active:bg-cream-pressed'}`}
        >
          {copied ? '✓ 복사됐어요!' : '초대코드 복사하기'}
        </button>
        <button
          onClick={handleJoined}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-lg
                     font-semibold active:bg-brand-dark transition-colors"
        >
          부모님 참가 완료로 보기
        </button>
        <p className="text-xs text-ink-hint text-center">
          테스트용 버튼이에요 — 실제로는 부모님이 코드를 입력해야 연결돼요
        </p>
      </div>
    </div>
  )
}
