'use client'
import { useState } from 'react'
import { ScreenName, RouteParams, Entry, ChildReaction, ScreenProps } from '@/src/types'

import ModeSelect      from '@/src/screens/ModeSelect'
import ParentHome      from '@/src/screens/ParentHome'
import CategorySelect  from '@/src/screens/CategorySelect'
import DetailSelect    from '@/src/screens/DetailSelect'
import Complete        from '@/src/screens/Complete'
import ChildReport     from '@/src/screens/ChildReport'

// ─── 라우터 ───────────────────────────────────────────────────────
type Route = { name: ScreenName; params?: RouteParams }

// 이 화면으로 navigate 시 스택 초기화 (뒤로가기 스택 제거)
const RESET_SCREENS: ScreenName[] = ['ModeSelect', 'ParentHome', 'ChildReport']

export default function Page() {
  // ── 네비게이션 상태 ──
  const [stack, setStack] = useState<Route[]>([{ name: 'ModeSelect' }])
  const current = stack[stack.length - 1]

  const navigate = (screen: ScreenName, params?: RouteParams) => {
    setStack(RESET_SCREENS.includes(screen)
      ? [{ name: screen, params }]
      : prev => [...prev, { name: screen, params }]
    )
  }
  const goBack = () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev)

  // ── 앱 상태 ──
  const [entries,       setEntries]       = useState<Entry[]>([])
  const [childReaction, setChildReactionS] = useState<ChildReaction | null>(null)
  const [viewedByChild, setViewedByChildS] = useState(false)

  const addEntry = (entry: Entry) =>
    setEntries(prev => [...prev.filter(e => e.categoryKey !== entry.categoryKey), entry])

  const clearEntries = () => {
    setEntries([]); setChildReactionS(null); setViewedByChildS(false)
  }
  const handleSetChildReaction = (r: ChildReaction) => {
    setChildReactionS(r); setViewedByChildS(true)
  }

  // ── 공통 props ──
  const screenProps: ScreenProps = {
    navigation: { navigate, goBack, params: current.params },
    entries,
    childReaction,
    viewedByChild,
    addEntry,
    clearEntries,
    setChildReaction: handleSetChildReaction,
    setViewedByChild: () => setViewedByChildS(true),
  }

  // ── 화면 렌더링 ──
  const renderScreen = () => {
    switch (current.name) {
      case 'ModeSelect':     return <ModeSelect     {...screenProps} />
      case 'ParentHome':     return <ParentHome     {...screenProps} />
      case 'CategorySelect': return <CategorySelect {...screenProps} />
      case 'DetailSelect':   return <DetailSelect   {...screenProps} />
      case 'Complete':       return <Complete       {...screenProps} />
      case 'ChildReport':    return <ChildReport    {...screenProps} />
      default:               return <ModeSelect     {...screenProps} />
    }
  }

  return (
    // 모바일 기준 최대 너비, 데스크탑에서는 중앙 정렬
    <div className="h-full max-w-sm mx-auto bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      {renderScreen()}
    </div>
  )
}
