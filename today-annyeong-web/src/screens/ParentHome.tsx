'use client'
import { ScreenProps } from '../types'
import { getStreakMessage } from '../data'

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
  navigation, entries, childReaction, viewedByChild, viewedTime,
  callRequested, streakDays, setCallRequested,
}: ScreenProps) {
  const hasTodayEntry = entries.length > 0
  const streak = getStreakMessage(streakDays)

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* ── 상단 연결 상태 바 ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-2
                      border-b border-border/40">
        <div>
          <p className="text-sm font-semibold text-brand">봉균님과 연결됨</p>
          <p className="text-xs text-ink-hint">내 안녕은 봉균님에게 전달돼요.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-hint">{getTodayString()}</p>
        </div>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-40">

        {/* 인사 */}
        <h2 className="text-2xl font-semibold text-ink text-center mt-5 mb-5 leading-snug">
          {getGreeting()}
        </h2>

        {/* ① 자녀 확인 카드 — 가장 중요한 감정 보상 */}
        {viewedByChild && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-5 mb-4">
            <p className="text-lg font-semibold text-brand-text mb-1">
              ❤️ 봉균이가 오늘 안녕을 확인했어요
            </p>
            <p className="text-sm text-brand-text opacity-80">
              {childReaction ? `"${childReaction}" 반응을 보냈어요` : ''}
              {viewedTime ? (viewedTime && childReaction ? '  ·  ' : '') + `확인 시간: ${viewedTime}` : ''}
            </p>
          </div>
        )}

        {/* 통화 요청 상태 */}
        {callRequested && (
          <div className="flex items-center justify-between bg-neg-bg border border-neg-border
                          rounded-2xl px-4 py-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-neg-text">📞 통화 요청이 전달되었어요</p>
              <p className="text-xs text-neg-text opacity-70 mt-0.5">
                가족이 확인하면 연락드릴 수 있어요.
              </p>
            </div>
            <button onClick={() => setCallRequested(false)}
              className="text-xs text-neg-text underline opacity-60 ml-3 flex-shrink-0">
              취소
            </button>
          </div>
        )}

        {/* ② 안녕나무 */}
        <div className="flex items-center justify-center gap-2 bg-cream-card border border-border
                        rounded-full py-2.5 px-5 mb-5 mx-auto w-fit">
          <span className="text-lg">{streak.emoji}</span>
          <span className="text-sm text-ink-sub">{streak.text}</span>
        </div>

        {/* ③ 최근 전달 내용 */}
        {hasTodayEntry && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-2">오늘 전달한 내용</p>
            {entries.map((e, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <span className="text-ink-hint mt-0.5 text-base">·</span>
                <p className="text-sm text-ink-sub">
                  {e.categoryQuestion.replace('오늘 ','').replace('?','')}:{' '}
                  <span className={`font-medium ${e.isAlert ? 'text-alrt-text' : 'text-ink'}`}>
                    {e.path.join(' → ')}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── 하단 버튼 고정 ── */}
      <div className="flex-shrink-0 px-5 pb-8 safe-bottom bg-cream pt-4
                      border-t border-border/40 flex flex-col gap-3">
        {/* ④ 메인 CTA */}
        <button
          onClick={() => navigation.navigate('CategorySelect')}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl
                     font-semibold active:bg-brand-dark transition-colors"
        >
          {hasTodayEntry ? '더 전하고 싶은 게 있어요' : '오늘 하루 전하기'}
        </button>

        {/* ⑤ 통화 요청 */}
        {!callRequested && (
          <button
            onClick={() => setCallRequested(true)}
            className="w-full py-4 border border-border rounded-2xl text-base
                       text-ink-sub active:bg-cream-card transition-colors"
          >
            📞 통화하고 싶어요
          </button>
        )}
      </div>
    </div>
  )
}
