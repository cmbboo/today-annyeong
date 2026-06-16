'use client'
import { ScreenProps } from '../types'
import { getStreakMessage, calculateScore, getScoreLabel } from '../data'

function getTodayString() {
  const d = new Date()
  const days = ['일','월','화','수','목','금','토']
  return `${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}

function scoreColor(score: number) {
  return score >= 75 ? 'text-brand' : 'text-alrt-text'
}

export default function Complete({ navigation, entries, streakDays, sentTime }: ScreenProps) {
  const hasAlert = entries.some(e => e.isAlert)
  const streak   = getStreakMessage(streakDays)
  const score    = calculateScore(entries)

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-12 pb-36
                      flex flex-col items-center">

        {/* 완료 아이콘 */}
        <div className="w-20 h-20 rounded-full bg-brand-light border border-pos-border
                        flex items-center justify-center mb-5 text-4xl">
          🌷
        </div>

        {/* 메인 카피 */}
        <h2 className="text-2xl font-semibold text-ink text-center mb-2">
          오늘 하루가 전달되었어요
        </h2>
        <p className="text-base text-ink-sub text-center leading-relaxed mb-1">
          가족이 확인하면 알려드릴게요.
        </p>
        <p className="text-base text-ink-sub text-center mb-3">
          오늘도 수고 많으셨어요.
        </p>

        {/* 전달 시간 */}
        <div className="flex items-center gap-2 mb-6 text-sm text-ink-hint">
          {sentTime && <span>전달 시간: {sentTime}</span>}
          {sentTime && <span>·</span>}
          <span>{getTodayString()}</span>
        </div>

        {/* 안녕 점수 */}
        <div className="w-full flex items-center gap-4 bg-cream-card border border-border
                        rounded-2xl px-5 py-4 mb-4">
          <p className={`text-4xl font-bold leading-none ${scoreColor(score)}`}>
            {score}<span className="text-xl font-semibold">점</span>
          </p>
          <div className="flex-1">
            <p className="text-xs text-ink-hint mb-0.5">오늘 안녕 점수</p>
            <p className="text-sm text-ink-sub leading-snug">{getScoreLabel(score)}</p>
          </div>
        </div>

        {/* 안녕나무 스트릭 */}
        <div className="flex items-center gap-2 bg-brand-light border border-pos-border
                        rounded-full px-5 py-2.5 mb-6">
          <span className="text-lg">{streak.emoji}</span>
          <span className="text-sm font-medium text-brand-text">{streak.text}</span>
        </div>

        {/* 전달 내용 요약 */}
        {entries.length > 0 && (
          <div className="w-full bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-3">전달한 내용</p>
            {entries.map((e, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0
                  ${e.isAlert ? 'bg-alrt-text' : 'bg-brand'}`} />
                <div>
                  <p className="text-xs text-ink-hint">{e.categoryQuestion}</p>
                  <p className={`text-base font-medium
                    ${e.isAlert ? 'text-alrt-text' : 'text-ink'}`}>
                    {e.path.join(' → ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 경고 카드 */}
        {hasAlert && (
          <div className="w-full bg-alrt-bg border border-alrt-border rounded-2xl p-4 mb-4">
            <p className="text-sm text-alrt-text text-center leading-relaxed">
              몸이 많이 불편하신 것 같아요.<br />
              가족이 확인 후 연락드릴 거예요.
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex-shrink-0 px-6 pb-8 safe-bottom bg-cream pt-4
                      border-t border-border/40 flex flex-col gap-3">
        <button
          onClick={() => navigation.navigate('ParentHome')}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl
                     font-semibold active:bg-brand-dark transition-colors"
        >
          홈으로 돌아가기
        </button>
        <button
          onClick={() => navigation.navigate('CategorySelect')}
          className="w-full min-h-btn-sm border border-border text-ink-sub
                     rounded-2xl text-base active:bg-cream-card transition-colors"
        >
          더 전하고 싶어요
        </button>
      </div>
    </div>
  )
}
