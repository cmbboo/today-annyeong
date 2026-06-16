'use client'
import { ScreenProps } from '../types'
import { getStreakMessage, getAlertSummaries } from '../data'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 11) return '좋은 아침이에요 ☀️'
  if (h < 14) return '좋은 점심 시간이에요 😊'
  if (h < 18) return '오늘 하루는 어떠세요?'
  return '오늘 하루 수고하셨어요 🌙'
}

export default function ParentHome({
  navigation, entries, childReaction, viewedByChild, viewedTime,
  sentTime, callRequested, streakDays, setCallRequested,
}: ScreenProps) {
  const hasTodayEntry  = entries.length > 0
  const streak         = getStreakMessage(streakDays)
  const alertSummaries = getAlertSummaries(entries)
  const hasEntryAlerts = alertSummaries.length > 0

  return (
    <div className="flex flex-col h-full safe-top bg-cream">

      {/* ① 연결 상태 바 */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-3
                      border-b border-border/40">
        <div>
          <p className="text-sm font-semibold text-brand">봉균님과 연결됨</p>
          <p className="text-xs text-ink-hint">내 안녕은 봉균님에게 전달돼요.</p>
        </div>
        <p className="text-xs text-ink-hint">{getGreeting()}</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-44">

        {/* ② 오늘 안심 상태 카드 */}
        <div className="mt-4 mb-4">
          {!hasTodayEntry ? (
            <div className="bg-cream-card border border-border rounded-2xl p-4">
              <p className="text-xs text-ink-hint mb-1">오늘 안심 상태</p>
              <p className="text-base font-semibold text-ink mb-1">
                아직 오늘 안녕을 전하지 않았어요.
              </p>
              <p className="text-sm text-ink-hint leading-relaxed">
                오늘 하루를 전하면 가족이 안심할 수 있어요.
              </p>
            </div>
          ) : (
            <div className={`rounded-2xl p-4 border
              ${hasEntryAlerts
                ? 'bg-neg-bg border-neg-border'
                : 'bg-brand-light border-pos-border'}`}>
              <p className={`text-xs mb-1
                ${hasEntryAlerts ? 'text-neg-text opacity-70' : 'text-brand-text opacity-70'}`}>
                오늘 안심 상태
              </p>
              <p className={`text-base font-semibold mb-1
                ${hasEntryAlerts ? 'text-neg-text' : 'text-brand-text'}`}>
                ✓ 오늘 안녕 전달 완료
              </p>
              {sentTime && (
                <p className={`text-sm mb-1
                  ${hasEntryAlerts ? 'text-neg-text opacity-70' : 'text-brand-text opacity-70'}`}>
                  전달 시간: {sentTime}
                </p>
              )}
              <p className={`text-sm
                ${hasEntryAlerts ? 'text-neg-text opacity-80' : 'text-brand-text opacity-70'}`}>
                {hasEntryAlerts
                  ? '일부 불편한 내용이 전달됐어요.'
                  : '특별히 확인 필요한 내용은 없어요.'}
              </p>
            </div>
          )}
        </div>

        {/* ③ 자녀 확인 카드 */}
        {viewedByChild && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-5 mb-4">
            <p className="text-base font-semibold text-brand-text mb-1">
              ❤️ 봉균이가 오늘 안녕을 확인했어요
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {viewedTime && (
                <p className="text-sm text-brand-text opacity-75">확인 시간: {viewedTime}</p>
              )}
              {childReaction && viewedTime && (
                <span className="text-brand-text opacity-40 text-sm">·</span>
              )}
              {childReaction && (
                <p className="text-sm text-brand-text opacity-75">{childReaction} 반응을 보냈어요</p>
              )}
            </div>
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

        {/* ④ 안녕나무 */}
        <div className="flex items-center justify-center gap-2 bg-cream-card border border-border
                        rounded-full py-2.5 px-5 mb-5 w-fit mx-auto">
          <span className="text-lg">{streak.emoji}</span>
          <span className="text-sm text-ink-sub">{streak.text}</span>
        </div>

        {/* ⑤ 마지막 전달 기록 */}
        {hasTodayEntry && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-2">오늘 전달한 내용</p>
            {entries.map((e, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
                <span className="text-ink-hint mt-0.5 text-sm">·</span>
                <p className="text-sm text-ink-sub leading-relaxed">
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

      {/* ⑥⑦ 하단 버튼 고정 */}
      <div className="flex-shrink-0 px-5 pb-8 safe-bottom bg-cream pt-4
                      border-t border-border/40 flex flex-col gap-3">
        <button
          onClick={() => navigation.navigate('CategorySelect')}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl
                     font-semibold active:bg-brand-dark transition-colors"
        >
          {hasTodayEntry ? '더 전하고 싶은 게 있어요' : '오늘 하루 전하기'}
        </button>
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
