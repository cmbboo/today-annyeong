'use client'
import { useState, useEffect } from 'react'
import { ScreenProps, ChildReaction } from '../types'
import {
  mockEntries, weeklyMockData,
  generateSummary, getAlertSummaries,
  calculateScore, getScoreLabel, getWeeklySummaryText,
} from '../data'

function getHeaderDate() {
  const d = new Date()
  const days = ['일','월','화','수','목','금','토']
  return `${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}

const REACTIONS: { emoji: ChildReaction; label: string }[] = [
  { emoji: '❤️', label: '마음이 놓여요' },
  { emoji: '😊', label: '반가워요'       },
  { emoji: '👍', label: '잘 지내셨군요' },
]

// 점수 색상 (완전한 클래스명으로 JIT 대응)
function scoreColor(score: number) {
  return score >= 75 ? 'text-brand' : 'text-alrt-text'
}

export default function ChildReport({
  navigation, entries, childReaction,
  callRequested, noEntryMode,
  setChildReaction, setViewedByChild, setNoEntryMode,
}: ScreenProps) {
  const [reacted,      setReacted]      = useState<ChildReaction | null>(childReaction)
  const [showCallMock, setShowCallMock] = useState(false)

  const displayEntries  = noEntryMode ? [] : (entries.length > 0 ? entries : mockEntries)
  const isUsingMock     = !noEntryMode && entries.length === 0
  const alertSummaries  = getAlertSummaries(displayEntries)
  const hasAlerts       = !noEntryMode && alertSummaries.length > 0
  const score           = calculateScore(displayEntries)
  const summary         = generateSummary(displayEntries)
  const weeklySummary   = getWeeklySummaryText(weeklyMockData)

  useEffect(() => { setViewedByChild() }, [])

  const handleReaction = (emoji: ChildReaction) => {
    setReacted(emoji)
    setChildReaction(emoji)
  }

  return (
    <div className="flex flex-col h-full safe-top bg-cream">

      {/* ① 연결 상태 바 */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-3
                      border-b border-border">
        <button onClick={() => navigation.goBack()}
          className="text-brand text-base font-medium w-14 py-1">
          ← 뒤로
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-ink">어머니의 오늘 하루</p>
          <p className="text-xs text-ink-hint">어머니와 연결됨 · {getHeaderDate()}</p>
        </div>
        <div className="w-14" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-16">

        {/* 테스트 토글 */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setNoEntryMode(false)}
            className={`flex-1 py-2 text-sm rounded-xl font-medium transition-colors
              ${!noEntryMode ? 'bg-brand text-white' : 'bg-cream-card border border-border text-ink-hint'}`}>
            오늘 입력 있음
          </button>
          <button onClick={() => setNoEntryMode(true)}
            className={`flex-1 py-2 text-sm rounded-xl font-medium transition-colors
              ${noEntryMode ? 'bg-neg-bg border border-neg-border text-neg-text' : 'bg-cream-card border border-border text-ink-hint'}`}>
            미입력 상태
          </button>
        </div>

        {/* ② 미입력 카드 */}
        {noEntryMode && (
          <div className="bg-neg-bg border border-neg-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-neg-text text-base mb-1">
              ⚠️ 오늘 아직 안녕이 전달되지 않았어요
            </p>
            <p className="text-sm text-neg-text opacity-80 mb-2 leading-relaxed">
              평소 전달 시간이 지났다면 한 번 연락해보세요.
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-neg-border/40">
              <div>
                <p className="text-xs text-neg-text opacity-60">평소 전달 시간</p>
                <p className="text-sm font-semibold text-neg-text">오후 8:00</p>
              </div>
              <div className="w-px h-6 bg-neg-border/60" />
              <div>
                <p className="text-xs text-neg-text opacity-60">현재 상태</p>
                <p className="text-sm font-semibold text-neg-text">미입력</p>
              </div>
            </div>
          </div>
        )}

        {/* ② 통화 요청 카드 */}
        {callRequested && (
          <div className="bg-alrt-bg border border-alrt-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-alrt-text text-base mb-1">
              📞 어머니가 연락을 원하세요
            </p>
            <p className="text-sm text-alrt-text opacity-80">
              오늘은 먼저 전화해보면 좋겠습니다.
            </p>
          </div>
        )}

        {/* ② 확인 필요 카드 (AI 요약 위, 상세 경고 내용 포함) */}
        {hasAlerts && (
          <div className="bg-alrt-bg border border-alrt-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-alrt-text text-base mb-1">
              🚨 오늘 확인이 필요해요
            </p>
            <p className="text-sm text-alrt-text opacity-75 mb-3">
              어머니의 오늘 안녕에 주의해서 볼 내용이 있어요.
            </p>
            <ul className="space-y-1.5 mb-4">
              {alertSummaries.slice(0, 3).map((msg, i) => (
                <li key={i} className="text-sm text-alrt-text flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">•</span>
                  <span>{msg}</span>
                </li>
              ))}
            </ul>
            {!showCallMock ? (
              <button
                onClick={() => setShowCallMock(true)}
                className="w-full py-3 bg-alrt-text text-white rounded-xl text-base
                           font-semibold active:opacity-80 transition-opacity"
              >
                전화해보기
              </button>
            ) : (
              <div className="w-full py-3 bg-cream border border-alrt-border/60 rounded-xl
                              text-center text-sm text-alrt-text leading-snug">
                전화 연결은 실제 구현 전입니다.
              </div>
            )}
          </div>
        )}

        {/* Mock 안내 */}
        {isUsingMock && (
          <div className="bg-neg-bg border border-neg-border rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-neg-text leading-5">
              예시 데이터입니다 — 부모님 화면에서 입력 후 확인해보세요
            </p>
          </div>
        )}

        {/* ③ 안녕 점수 */}
        {!noEntryMode && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-2">오늘 안녕 점수</p>
            <div className="flex items-center gap-4">
              <p className={`text-4xl font-bold leading-none ${scoreColor(score)}`}>
                {score}<span className="text-xl font-semibold">점</span>
              </p>
              <p className="text-sm text-ink-sub leading-relaxed flex-1">
                {getScoreLabel(score)}
              </p>
            </div>
          </div>
        )}

        {/* ④ AI 하루 요약 */}
        {!noEntryMode && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-brand-text">오늘의 요약</span>
              <span className="bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">AI</span>
            </div>
            <p className="text-sm text-brand-text leading-relaxed">{summary}</p>
          </div>
        )}

        {/* ⑤ 이모지 반응 */}
        {!noEntryMode && (
          !reacted ? (
            <div className="text-center mb-5">
              <p className="text-lg font-semibold text-ink mb-1">반응을 보내볼까요?</p>
              <p className="text-sm text-ink-hint mb-4">어머니가 확인할 수 있어요</p>
              <div className="grid grid-cols-3 gap-3">
                {REACTIONS.map(r => (
                  <button
                    key={r.emoji}
                    onClick={() => handleReaction(r.emoji)}
                    className="flex flex-col items-center justify-center gap-2
                               bg-cream-card border border-border rounded-2xl py-5
                               min-h-btn active:bg-cream-pressed transition-colors"
                  >
                    <span className="text-3xl">{r.emoji}</span>
                    <span className="text-xs text-ink-sub text-center leading-4">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-brand-light border border-pos-border rounded-2xl p-5
                            text-center mb-5">
              <p className="text-4xl mb-2">{reacted}</p>
              <p className="text-lg font-semibold text-brand-text mb-1">반응을 보냈어요</p>
              <p className="text-sm text-brand-text opacity-70">어머니가 확인하실 수 있어요</p>
            </div>
          )
        )}

        {/* ⑥ 최근 7일 안녕 흐름 (리디자인) */}
        <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
          <p className="text-xs font-medium text-ink-hint mb-3">최근 7일 안녕 흐름</p>
          <div className="grid grid-cols-7 gap-1 mb-3">
            {weeklyMockData.map((d, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl
                  ${d.isToday ? 'bg-brand-light ring-1 ring-pos-border' : ''}
                  ${!d.hasEntry ? 'opacity-35' : ''}`}
              >
                <span className="text-[11px] text-ink-hint font-semibold">{d.day}</span>
                <span className={d.hasEntry ? 'text-xl' : 'text-sm text-ink-hint'}>
                  {d.emoji}
                </span>
                <span className="text-[8px] text-ink-hint text-center leading-[1.2] break-keep">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-sub text-center border-t border-border/60 pt-3">
            {weeklySummary}
          </p>
        </div>

        {/* ⑦ 상세 내용 */}
        {!noEntryMode && displayEntries.length > 0 && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-ink-hint mb-3">상세 내용</p>
            {displayEntries.map((e, i) => (
              <div
                key={i}
                className={`py-3 ${i < displayEntries.length - 1 ? 'border-b border-border/60' : ''}
                  ${e.isAlert ? 'bg-alrt-bg rounded-xl px-3 -mx-1 mb-1' : ''}`}
              >
                <p className="text-xs text-ink-hint mb-0.5">{e.categoryQuestion}</p>
                <p className={`text-base font-medium ${e.isAlert ? 'text-alrt-text' : 'text-ink'}`}>
                  {e.path.join(' → ')}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-ink-hint text-center leading-5">
          자유로운 채팅 대신, 어머니의 하루를 기록하는 서비스예요.
        </p>
      </div>
    </div>
  )
}
