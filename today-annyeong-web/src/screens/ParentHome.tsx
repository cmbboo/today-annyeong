'use client'
import { ScreenProps } from '../types'

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

export default function ParentHome({ navigation, entries, childReaction, viewedByChild }: ScreenProps) {
  const hasTodayEntry = entries.length > 0

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-32">
        <p className="text-center text-sm text-ink-hint mb-1">{getTodayString()}</p>
        <h2 className="text-3xl font-semibold text-ink text-center mb-8 leading-snug">
          {getGreeting()}
        </h2>

        {/* 자녀 확인 카드 */}
        {viewedByChild && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-4 mb-4 text-center">
            <p className="text-lg font-semibold text-brand-text">
              가족이 오늘 안녕을 확인했어요{childReaction ? ` ${childReaction}` : ''}
            </p>
            <p className="text-sm text-brand-text opacity-70 mt-1">오늘 하루가 잘 전달됐어요</p>
          </div>
        )}

        {/* 오늘 입력 요약 */}
        {hasTodayEntry && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-2">오늘 전달한 내용</p>
            {entries.map((e, i) => (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span className="text-ink-hint text-lg leading-6">·</span>
                <p className="text-sm text-ink-sub leading-6">
                  {e.categoryQuestion.replace('오늘 ','').replace('?','')}:{' '}
                  <span className="text-ink font-medium">{e.path.join(' → ')}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="flex-shrink-0 px-6 pb-8 safe-bottom bg-cream border-t border-transparent pt-4">
        <button
          onClick={() => navigation.navigate('CategorySelect')}
          className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl font-semibold active:bg-brand-dark transition-colors"
        >
          {hasTodayEntry ? '더 전하고 싶은 게 있어요' : '오늘 하루 전하기'}
        </button>
        <p className="text-center text-sm text-ink-hint mt-4 leading-5">
          전해주신 하루는 가족이 편한 시간에 확인할 수 있어요.
        </p>
      </div>
    </div>
  )
}
