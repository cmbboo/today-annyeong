'use client'
import { ScreenProps, CategoryKey } from '../types'
import { categories } from '../data'

export default function CategorySelect({ navigation, entries }: ScreenProps) {
  const doneKeys = new Set(entries.map(e => e.categoryKey))

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 상단바 */}
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <button onClick={() => navigation.goBack()} className="text-brand text-lg font-medium py-2">
          ← 뒤로
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-36">
        <h2 className="text-2xl font-semibold text-ink mb-1 leading-snug">
          어떤 이야기를 전할까요?
        </h2>
        <p className="text-sm text-ink-hint mb-6">하나 이상 선택해 주세요</p>

        <div className="flex flex-col gap-3">
          {categories.map(cat => {
            const isDone = doneKeys.has(cat.key)
            return (
              <button
                key={cat.key}
                onClick={() => navigation.navigate('DetailSelect', { categoryKey: cat.key })}
                className={`w-full flex items-center gap-4 rounded-2xl p-4 min-h-btn border transition-colors active:opacity-70
                  ${isDone
                    ? 'bg-brand-light border-pos-border'
                    : 'bg-cream-card border-border'
                  }`}
              >
                {/* 이모지 원 */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {cat.emoji}
                </div>
                {/* 질문 */}
                <span className={`flex-1 text-lg font-medium text-left
                  ${isDone ? 'text-brand-text' : 'text-ink'}`}>
                  {cat.question}
                </span>
                {/* 완료 뱃지 */}
                {isDone ? (
                  <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                ) : (
                  <span className="text-ink-hint text-xl">›</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 하단 전달 버튼 */}
      {entries.length > 0 && (
        <div className="flex-shrink-0 px-6 pb-8 safe-bottom bg-cream border-t border-border pt-4">
          <button
            onClick={() => navigation.navigate('Complete')}
            className="w-full min-h-btn bg-brand text-white rounded-2xl text-xl font-semibold active:bg-brand-dark transition-colors"
          >
            하루 전달하기 ({entries.length}개 선택됨)
          </button>
        </div>
      )}
    </div>
  )
}
