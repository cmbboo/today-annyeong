'use client'
import { ScreenProps } from '../types'

export default function ModeSelect({ navigation }: ScreenProps) {
  return (
    <div className="flex flex-col h-full safe-top safe-bottom px-6 pt-16 items-center bg-cream">
      {/* 앱 이름 */}
      <h1 className="text-4xl font-semibold text-ink mb-2">오늘도 안녕</h1>
      <span className="text-sm font-medium text-neg-text bg-neg-bg border border-neg-border px-3 py-1 rounded-full">
        테스트 모드
      </span>

      <p className="text-xl text-ink-sub mt-12 mb-8">누구의 화면을 볼까요?</p>

      <div className="w-full flex flex-col gap-4">
        {/* 부모님 */}
        <button
          onClick={() => navigation.navigate('ParentHome')}
          className="w-full bg-brand-light border border-pos-border rounded-2xl p-6 flex flex-col items-center gap-1 active:opacity-70 transition-opacity"
        >
          <span className="text-5xl mb-2">👴</span>
          <span className="text-xl font-semibold text-brand-text">부모님 화면</span>
          <span className="text-sm text-brand-text opacity-70">하루를 전달하는 분</span>
        </button>

        {/* 자녀 */}
        <button
          onClick={() => navigation.navigate('ChildReport')}
          className="w-full bg-cream-card border border-border rounded-2xl p-6 flex flex-col items-center gap-1 active:opacity-70 transition-opacity"
        >
          <span className="text-5xl mb-2">👩</span>
          <span className="text-xl font-semibold text-ink">자녀 화면</span>
          <span className="text-sm text-ink-hint">하루를 확인하는 분</span>
        </button>
      </div>

      <p className="text-xs text-ink-hint text-center mt-auto mb-4 leading-5">
        실제 서비스에서는 이 화면이 없습니다.<br />테스트를 위한 화면 전환 도구예요.
      </p>
    </div>
  )
}
