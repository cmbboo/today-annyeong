'use client'
import { ScreenProps } from '../types'

export default function RoleSelect({ navigation }: ScreenProps) {
  return (
    <div className="flex flex-col h-full safe-top safe-bottom bg-cream px-6">
      {/* 앱 헤더 */}
      <div className="flex flex-col items-center pt-16 pb-12">
        <div className="w-16 h-16 rounded-full bg-brand-light border border-pos-border
                        flex items-center justify-center text-3xl mb-4">
          🌱
        </div>
        <h1 className="text-3xl font-semibold text-ink mb-2">오늘도 안녕</h1>
        <p className="text-base text-ink-hint text-center leading-relaxed">
          부모님의 하루를 가족에게 전하는 서비스
        </p>
      </div>

      {/* 역할 선택 버튼 */}
      <div className="flex flex-col gap-4">
        {/* 자녀 */}
        <button
          onClick={() => navigation.navigate('ChildInvite')}
          className="w-full bg-brand text-white rounded-2xl p-6 flex items-center gap-4
                     active:bg-brand-dark transition-colors"
        >
          <span className="text-4xl">👩</span>
          <div className="text-left">
            <p className="text-xl font-semibold">자녀로 시작하기</p>
            <p className="text-sm opacity-80 mt-0.5">부모님을 초대하고 안녕을 확인해요</p>
          </div>
        </button>

        {/* 부모 */}
        <button
          onClick={() => navigation.navigate('ParentJoin')}
          className="w-full bg-cream-card border border-border rounded-2xl p-6
                     flex items-center gap-4 active:bg-cream-pressed transition-colors"
        >
          <span className="text-4xl">👴</span>
          <div className="text-left">
            <p className="text-xl font-semibold text-ink">부모님으로 참가하기</p>
            <p className="text-sm text-ink-hint mt-0.5">자녀가 보내준 코드로 참가해요</p>
          </div>
        </button>
      </div>

      <p className="text-xs text-ink-hint text-center mt-auto pb-4">
        로그인 없이 바로 사용할 수 있어요
      </p>
    </div>
  )
}
