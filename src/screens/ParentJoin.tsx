'use client'
import { useState } from 'react'
import { ScreenProps } from '../types'
import { INVITE_CODE } from '../data'

export default function ParentJoin({ navigation, setConnected }: ScreenProps) {
  const [code,    setCode]    = useState('')
  const [error,   setError]   = useState(false)
  const [success, setSuccess] = useState(false)

  const handleJoin = () => {
    if (code === INVITE_CODE) {
      setConnected('parent')
      setSuccess(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  // ── 연결 성공 화면 ──
  if (success) {
    return (
      <div className="flex flex-col h-full safe-top bg-cream px-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-brand-light border border-pos-border
                          flex items-center justify-center text-4xl">
            ❤️
          </div>
          <h2 className="text-2xl font-semibold text-ink">봉균님과 연결되었어요</h2>
          <p className="text-base text-ink-sub leading-relaxed">
            이제 오늘 하루를 편하게 전할 수 있어요.
          </p>
          <div className="bg-brand-light border border-pos-border rounded-2xl px-5 py-3 mt-2">
            <p className="text-sm text-brand-text opacity-80">
              전해주신 하루는 봉균님이<br />편한 시간에 확인해요
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 pb-8 safe-bottom">
          <button
            onClick={() => navigation.navigate('ParentHome')}
            className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl
                       font-semibold active:bg-brand-dark transition-colors"
          >
            오늘 하루 전하기
          </button>
        </div>
      </div>
    )
  }

  // ── 코드 입력 화면 ──
  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 상단 */}
      <div className="flex-shrink-0 px-5 pt-4">
        <button onClick={() => navigation.goBack()}
          className="text-brand text-base font-medium py-2">← 뒤로</button>
      </div>

      <div className="flex-1 px-6 pt-6">
        <h2 className="text-2xl font-semibold text-ink mb-2 leading-snug">
          자녀가 보내준<br />안녕코드를 입력해주세요.
        </h2>
        <p className="text-base text-ink-sub mb-8 leading-relaxed">
          코드를 입력하면 가족에게<br />오늘 안녕을 전할 수 있어요.
        </p>

        {/* 코드 입력 */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={code}
          onChange={e => {
            setCode(e.target.value.replace(/\D/g, ''))
            setError(false)
          }}
          placeholder="0000"
          className={`w-full text-center text-5xl font-bold tracking-[0.3em]
                      border-2 rounded-2xl py-6 bg-cream-card text-ink
                      focus:outline-none transition-colors
                      ${error
                        ? 'border-alrt-border focus:border-alrt-border'
                        : 'border-border focus:border-brand'}`}
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="text-center text-sm text-alrt-text mt-3">
            코드를 다시 확인해주세요.
          </p>
        )}

        {/* 안내 */}
        <p className="text-center text-xs text-ink-hint mt-4">
          자녀가 공유한 4자리 숫자를 입력해주세요
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="flex-shrink-0 px-6 pb-8 safe-bottom">
        <button
          onClick={handleJoin}
          disabled={code.length !== 4}
          className={`w-full min-h-btn rounded-2xl text-xl font-semibold transition-colors
                      ${code.length === 4
                        ? 'bg-brand text-white active:bg-brand-dark'
                        : 'bg-cream-card border border-border text-ink-hint cursor-not-allowed'}`}
        >
          참가하기
        </button>
      </div>
    </div>
  )
}
