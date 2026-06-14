'use client'
import { useState } from 'react'
import { ScreenProps, Option, OptionTone } from '../types'
import { categories } from '../data'

// 톤별 버튼 스타일
const toneClass: Record<OptionTone, string> = {
  positive: 'bg-pos-bg   border-pos-border   text-pos-text',
  neutral:  'bg-neu-bg   border-neu-border   text-neu-text',
  negative: 'bg-neg-bg   border-neg-border   text-neg-text',
  alert:    'bg-alrt-bg  border-alrt-border  text-alrt-text',
}

export default function DetailSelect({ navigation, addEntry }: ScreenProps) {
  const categoryKey = navigation.params?.categoryKey
  const category = categories.find(c => c.key === categoryKey)

  const [currentOptions, setCurrentOptions] = useState<Option[]>(category?.options ?? [])
  const [selectedPath,   setSelectedPath]   = useState<string[]>([])
  const [selectedTones,  setSelectedTones]  = useState<OptionTone[]>([])

  if (!category) {
    return (
      <div className="flex flex-col h-full items-center justify-center safe-top bg-cream gap-4">
        <p className="text-ink-hint text-lg">카테고리를 찾을 수 없어요</p>
        <button onClick={() => navigation.goBack()} className="text-brand text-lg">← 뒤로</button>
      </div>
    )
  }

  const handleSelect = (opt: Option) => {
    const newPath  = [...selectedPath,  opt.label]
    const newTones = [...selectedTones, opt.tone]

    if (opt.subOptions?.length) {
      // 다음 레벨로
      setCurrentOptions(opt.subOptions)
      setSelectedPath(newPath)
      setSelectedTones(newTones)
    } else {
      // 완료 → 저장 후 뒤로
      addEntry({
        categoryKey:      category.key,
        categoryQuestion: category.question,
        path:             newPath,
        isAlert:          newTones.includes('alert'),
      })
      navigation.goBack()
    }
  }

  const handleBack = () => {
    if (selectedPath.length === 0) {
      navigation.goBack()
    } else {
      // L2 → L1으로 초기화
      setCurrentOptions(category.options)
      setSelectedPath([])
      setSelectedTones([])
    }
  }

  return (
    <div className="flex flex-col h-full safe-top bg-cream">
      {/* 상단바 */}
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <button onClick={handleBack} className="text-brand text-lg font-medium py-2">
          ← 뒤로
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-16">
        <h2 className="text-2xl font-semibold text-ink mb-4 leading-snug">
          {category.question}
        </h2>

        {/* 선택 경로 표시 (2차 선택 중일 때) */}
        {selectedPath.length > 0 && (
          <div className="bg-cream-card border-l-4 border-brand rounded-xl p-4 mb-5">
            <p className="text-sm font-medium text-brand">{selectedPath.join(' → ')} →</p>
            <p className="text-xs text-ink-hint mt-0.5">이유를 선택해 주세요</p>
          </div>
        )}

        {/* 선택지 버튼 */}
        <div className="flex flex-col gap-3">
          {currentOptions.map(opt => {
            const hasChildren = (opt.subOptions?.length ?? 0) > 0
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className={`w-full flex items-center justify-between rounded-2xl border px-6 py-5 min-h-btn text-left active:opacity-70 transition-opacity ${toneClass[opt.tone]}`}
              >
                <span className="text-xl font-medium leading-tight flex-1">{opt.label}</span>
                {hasChildren && <span className="text-2xl ml-3 font-light">›</span>}
              </button>
            )
          })}
        </div>

        {/* 힌트 */}
        {selectedPath.length === 0 && (
          <p className="text-center text-sm text-ink-hint mt-6">좋은 상태는 바로 전달돼요</p>
        )}
      </div>
    </div>
  )
}
