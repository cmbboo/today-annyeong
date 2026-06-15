'use client'
import { useState, useEffect } from 'react'
import { ScreenProps, ChildReaction } from '../types'
import { mockEntries, weeklyMockData, generateSummary } from '../data'

// 초대코드 (Mock)
const INVITE_CODE = '3487'

function getTodayString() {
  const d = new Date()
  const days = ['일','월','화','수','목','금','토']
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`
}

const REACTIONS: { emoji: ChildReaction; label: string }[] = [
  { emoji: '❤️', label: '마음이 놓여요' },
  { emoji: '😊', label: '반가워요'       },
  { emoji: '👍', label: '잘 지내셨군요' },
]

export default function ChildReport({
  navigation, entries, childReaction,
  callRequested, noEntryMode,
  setChildReaction, setViewedByChild, setNoEntryMode,
}: ScreenProps) {
  const [reacted, setReacted] = useState<ChildReaction | null>(childReaction)

  // 미입력 모드일 때는 빈 배열, 아니면 실제 or mock
  const displayEntries = noEntryMode
    ? []
    : entries.length > 0 ? entries : mockEntries
  const isUsingMock = !noEntryMode && entries.length === 0
  const hasAlert    = !noEntryMode && displayEntries.some(e => e.isAlert)
  const summary     = generateSummary(displayEntries)

  useEffect(() => { setViewedByChild() }, [])

  const handleReaction = (emoji: ChildReaction) => {
    setReacted(emoji)
    setChildReaction(emoji)
  }

  return (
    <div className="flex flex-col h-full safe-top bg-cream">

      {/* ─── 상단 바 ─── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-3
                      border-b border-border">
        <button onClick={() => navigation.goBack()}
          className="text-brand text-base font-medium w-14 py-1">
          ← 뒤로
        </button>
        <span className="text-sm font-semibold text-ink">어머니의 오늘 하루</span>
        {/* 연결 코드 */}
        <div className="flex items-center gap-1 bg-cream-card border border-border
                        rounded-full px-2.5 py-1">
          <span className="text-[10px] text-ink-hint">코드</span>
          <span className="text-xs font-bold text-brand tracking-wide">{INVITE_CODE}</span>
        </div>
      </div>

      {/* ─── 스크롤 영역 ─── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-16">

        <p className="text-center text-xs text-ink-hint mb-4">{getTodayString()}</p>

        {/* ── 테스트 토글 (미입력 시뮬레이션) ── */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setNoEntryMode(false)}
            className={`flex-1 py-2 text-sm rounded-xl font-medium transition-colors
              ${!noEntryMode
                ? 'bg-brand text-white'
                : 'bg-cream-card border border-border text-ink-hint'}`}
          >
            입력 있음
          </button>
          <button
            onClick={() => setNoEntryMode(true)}
            className={`flex-1 py-2 text-sm rounded-xl font-medium transition-colors
              ${noEntryMode
                ? 'bg-neg-bg border border-neg-border text-neg-text'
                : 'bg-cream-card border border-border text-ink-hint'}`}
          >
            미입력 상태
          </button>
        </div>

        {/* ── 미입력 상태 카드 ── */}
        {noEntryMode && (
          <div className="bg-neg-bg border border-neg-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-neg-text text-base">
              오늘 아직 안녕이 전달되지 않았어요
            </p>
            <p className="text-sm text-neg-text opacity-80 mt-1 leading-relaxed">
              평소 입력 시간이 지났다면 한 번 연락해보세요.
            </p>
          </div>
        )}

        {/* ── 통화 요청 카드 ── */}
        {callRequested && (
          <div className="bg-alrt-bg border border-alrt-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-alrt-text text-base">📞 어머니가 연락을 원하세요</p>
            <p className="text-sm text-alrt-text opacity-80 mt-1">
              오늘은 먼저 연락드리면 좋겠습니다.
            </p>
          </div>
        )}

        {/* ── 긴급 확인 카드 ── */}
        {hasAlert && (
          <div className="bg-alrt-bg border border-alrt-border rounded-2xl p-4 mb-4">
            <p className="font-semibold text-alrt-text text-base">🚨 확인이 필요한 내용이 있어요</p>
            <p className="text-sm text-alrt-text opacity-80 mt-1">
              어머니의 오늘 안녕에 주의해서 볼 내용이 있습니다.
            </p>
          </div>
        )}

        {/* ── Mock 안내 ── */}
        {isUsingMock && (
          <div className="bg-neg-bg border border-neg-border rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-neg-text leading-5">
              예시 데이터입니다 — 부모님 화면에서 입력 후 확인해보세요
            </p>
          </div>
        )}

        {/* ── AI 요약 (미입력이 아닐 때만) ── */}
        {!noEntryMode && (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-brand-text">오늘의 요약</span>
              <span className="bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">AI</span>
            </div>
            <p className="text-sm text-brand-text leading-relaxed">{summary}</p>
          </div>
        )}

        {/* ── 입력 항목 (미입력이 아닐 때만) ── */}
        {!noEntryMode && displayEntries.length > 0 && (
          <div className="bg-cream-card border border-border rounded-2xl p-4 mb-5">
            <p className="text-xs text-ink-hint mb-3">전달한 내용</p>
            {displayEntries.map((e, i) => (
              <div
                key={i}
                className={`py-3 ${i < displayEntries.length - 1 ? 'border-b border-border/60' : ''}
                  ${e.isAlert ? 'bg-alrt-bg rounded-xl px-3 mb-1' : ''}`}
              >
                <p className="text-xs text-ink-hint mb-0.5">{e.categoryQuestion}</p>
                <p className={`text-base font-medium
                  ${e.isAlert ? 'text-alrt-text' : 'text-ink'}`}>
                  {e.path.join(' → ')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── 이모지 반응 (미입력이 아닐 때만) ── */}
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

        {/* ── 최근 7일 요약 ── */}
        <div className="bg-cream-card border border-border rounded-2xl p-4 mb-4">
          <p className="text-xs text-ink-hint mb-3">최근 7일</p>
          <div className="grid grid-cols-7 gap-1">
            {weeklyMockData.map((d, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl
                  ${d.isToday ? 'bg-brand-light' : ''}
                  ${!d.hasEntry ? 'opacity-40' : ''}`}
              >
                <span className="text-[11px] text-ink-hint font-medium">{d.day}</span>
                <span className={`${d.hasEntry ? 'text-xl' : 'text-base text-ink-hint'}`}>
                  {d.emoji}
                </span>
                <span className="text-[9px] text-ink-hint text-center leading-3 break-keep">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-ink-hint text-center leading-5">
          자유로운 채팅 대신, 어머니의 하루를 기록하는 서비스예요.
        </p>
      </div>
    </div>
  )
}
