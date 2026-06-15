'use client'
import { ScreenProps } from '../types'
import { getStreakMessage } from '../data'

// 초대코드 (Mock 고정)
const INVITE_CODE = '3487'

function getTodayString() {
  const d = new Date()
  const days = ['일','월','화','수','목','금','토']
  return `${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}
function getGreeting() {
  const h = new Date().getHours()
  if (h < 11) return '좋은 아침이에요 ☀️'
  if (h < 14) return '좋은 점심 시간이에요 😊'
  if (h < 18) return '오늘 하루는 어떠세요?'
  return '오늘 하루 수고하셨어요 🌙'
}

export default function ParentHome({
  navigation, entries, childReaction, viewedByChild,
  callRequested, streakDays, setCallRequested,
}: ScreenProps) {
  const hasTodayEntry = entries.length > 0
  const streak = getStreakMessage(streakDays)

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* ─── 상단 코드 바 ─── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-1.5 bg-cream-card border border-border rounded-full px-3 py-1.5">
          <span className="text-xs text-ink-hint">내 안녕 코드</span>
          <span className="text-sm font-bold text-brand tracking-widest">{INVITE_CODE}</span>
        </div>
        <span className="text-sm text-ink-hint">{getTodayString()}</span>
      </div>

      {/* ─── 스크롤 영역 ─── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-36">

        {/* 인사 */}
        <h2 className="text-3xl font-semibold text-ink text-center mt-4 mb-6 leading-snug">
          {getGreeting()}
        </h2>

        {/* 안녕나무 스트릭 */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <span className="text-xl">{streak.emoji}</span>
          <span className="text-sm text-ink-sub">{streak.text}</span>
        </div>

        {/* 자녀 확인 카드 */}
        {viewedByChild && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-4 mb-4 text-center">
            <p className="text-base font-semibold text-brand-text">
              봉균이가 오늘 안녕을 확인했어요{childReaction ? ` ${childReaction}` : ''}
            </p>
            <p className="text-sm text-brand-text opacity-70 mt-1">오늘 하루가 잘 전달됐어요</p>
          </div>
        )}

        {/* 통화 요청 상태 표시 */}
        {callRequested && (
          <div className="flex items-center justify-between bg-neg-bg border border-neg-border rounded-2xl px-4 py-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-neg-text">📞 통화 요청이 전달됐어요</p>
              <p className="text-xs text-neg-text opacity-70 mt-0.5">봉균이가 곧 연락할 거예요</p>
            </div>
            <button
              onClick={() => setCallRequested(false)}
              className="text-xs text-neg-text underline opacity-60 ml-3 flex-shrink-0"
            >
              취소
            </button>
          </div>
        )}

        {/* 오늘 입력 요약 */}
        {hasTodayEntry && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-2">오늘 전달한 내용</p>
            {entries.map((e, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <span className="text-ink-hint mt-0.5">·</span>
                <p className="text-sm text-ink-sub">
                  {e.categoryQuestion.replace('오늘 ','').replace('?','')}:{' '}
                  <span className="text-ink font-medium">{e.path.join(' → ')}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── 하단 버튼 영역 ─── */}
      <div className="flex-shrink-0 px-5 pb-8 safe-bottom bg-cream pt-4 border-t border-border/40 flex flex-col gap-3">
        <button
          onClick={() => navigation.navigate('CategorySelect')}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl font-semibold active:bg-brand-dark transition-colors"
        >
          {hasTodayEntry ? '더 전하고 싶은 게 있어요' : '오늘 하루 전하기'}
        </button>

        {/* 통화 요청 버튼 */}
        {!callRequested && (
          <button
            onClick={() => setCallRequested(true)}
            className="w-full py-3 border border-border rounded-2xl text-base text-ink-sub active:bg-cream-card transition-colors"
          >
            📞 통화하고 싶어요
          </button>
        )}

        <p className="text-center text-xs text-ink-hint leading-5">
          전해주신 하루는 가족이 편한 시간에 확인할 수 있어요.
        </p>
      </div>
    </div>
  )
}
