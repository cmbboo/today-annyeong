'use client'
import { useState, useEffect } from 'react'
import { ScreenProps, ChildReaction } from '../types'
import { mockEntries, generateSummary } from '../data'

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
  navigation, entries, childReaction, setChildReaction, setViewedByChild,
}: ScreenProps) {
  const [reacted, setReacted] = useState<ChildReaction | null>(childReaction)

  const displayEntries = entries.length > 0 ? entries : mockEntries
  const isUsingMock    = entries.length === 0
  const summary        = generateSummary(displayEntries)

  useEffect(() => { setViewedByChild() }, [])

  const handleReaction = (emoji: ChildReaction) => {
    setReacted(emoji)
    setChildReaction(emoji)
  }

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 상단바 */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-4 pb-3 border-b border-border">
        <button onClick={() => navigation.goBack()} className="text-brand text-lg font-medium w-16">
          ← 뒤로
        </button>
        <span className="text-base font-semibold text-ink">어머니의 오늘 하루</span>
        <div className="w-16" />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-4 pb-16">
        <p className="text-center text-sm text-ink-hint mb-4">{getTodayString()}</p>

        {/* Mock 안내 */}
        {isUsingMock && (
          <div className="bg-neg-bg border border-neg-border rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-neg-text leading-5">
              예시 데이터입니다 — 부모님 화면에서 입력 후 확인해보세요
            </p>
          </div>
        )}

        {/* AI 요약 카드 */}
        <div className="bg-brand-light border border-pos-border rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-brand-text">오늘의 요약</span>
            <span className="bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full">AI</span>
          </div>
          <p className="text-base text-brand-text leading-relaxed">{summary}</p>
        </div>

        {/* 입력 항목 */}
        <div className="bg-cream-card border border-border rounded-2xl p-4 mb-5">
          <p className="text-xs text-ink-hint mb-3">전달한 내용</p>
          {displayEntries.map((e, i) => (
            <div
              key={i}
              className={`py-3 ${i < displayEntries.length - 1 ? 'border-b border-border/60' : ''}
                ${e.isAlert ? 'bg-alrt-bg rounded-xl px-3 mb-1' : ''}`}
            >
              <p className="text-xs text-ink-hint mb-0.5">{e.categoryQuestion}</p>
              <p className={`text-base font-medium ${e.isAlert ? 'text-alrt-text' : 'text-ink'}`}>
                {e.path.join(' → ')}
              </p>
            </div>
          ))}
        </div>

        {/* 이모지 반응 */}
        {!reacted ? (
          <div className="text-center mb-4">
            <p className="text-xl font-semibold text-ink mb-1">반응을 보내볼까요?</p>
            <p className="text-sm text-ink-hint mb-4">어머니가 확인할 수 있어요</p>
            <div className="grid grid-cols-3 gap-3">
              {REACTIONS.map(r => (
                <button
                  key={r.emoji}
                  onClick={() => handleReaction(r.emoji)}
                  className="flex flex-col items-center justify-center gap-2 bg-cream-card border border-border rounded-2xl py-5 min-h-btn active:bg-cream-pressed transition-colors"
                >
                  <span className="text-3xl">{r.emoji}</span>
                  <span className="text-xs text-ink-sub text-center leading-4">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-brand-light border border-pos-border rounded-2xl p-6 text-center mb-4">
            <p className="text-5xl mb-3">{reacted}</p>
            <p className="text-xl font-semibold text-brand-text mb-1">반응을 보냈어요</p>
            <p className="text-sm text-brand-text opacity-70">어머니가 확인하실 수 있어요</p>
          </div>
        )}

        <p className="text-xs text-ink-hint text-center leading-5">
          자유로운 채팅 대신, 어머니의 하루를 기록하는 서비스예요.
        </p>
      </div>
    </div>
  )
}
