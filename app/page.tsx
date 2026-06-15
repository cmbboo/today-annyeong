'use client'
import { useState } from 'react'
import { ScreenName, RouteParams, Entry, ChildReaction, ScreenProps } from '@/src/types'

import ModeSelect     from '@/src/screens/ModeSelect'
import ParentHome     from '@/src/screens/ParentHome'
import CategorySelect from '@/src/screens/CategorySelect'
import DetailSelect   from '@/src/screens/DetailSelect'
import Complete       from '@/src/screens/Complete'
import ChildReport    from '@/src/screens/ChildReport'

type Route = { name: ScreenName; params?: RouteParams }
const RESET_SCREENS: ScreenName[] = ['ModeSelect', 'ParentHome', 'ChildReport']

export default function Page() {
  // ── 네비게이션 ──
  const [stack, setStack] = useState<Route[]>([{ name: 'ModeSelect' }])
  const current = stack[stack.length - 1]

  const navigate = (screen: ScreenName, params?: RouteParams) =>
    setStack(RESET_SCREENS.includes(screen)
      ? [{ name: screen, params }]
      : prev => [...prev, { name: screen, params }])
  const goBack = () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev)

  // ── 기본 상태 ──
  const [entries,        setEntries]       = useState<Entry[]>([])
  const [childReaction,  setChildReactionS] = useState<ChildReaction | null>(null)
  const [viewedByChild,  setViewedByChildS] = useState(false)

  // ── MVP2 상태 ──
  const [callRequested, setCallRequestedS] = useState(false)
  const [streakDays]                       = useState(3)   // Mock: 3일 고정
  const [noEntryMode,   setNoEntryModeS]   = useState(false)

  const addEntry = (entry: Entry) =>
    setEntries(prev => [...prev.filter(e => e.categoryKey !== entry.categoryKey), entry])

  const clearEntries = () => {
    setEntries([]); setChildReactionS(null); setViewedByChildS(false); setCallRequestedS(false)
  }

  const screenProps: ScreenProps = {
    navigation:       { navigate, goBack, params: current.params },
    entries,
    childReaction,
    viewedByChild,
    callRequested,
    streakDays,
    noEntryMode,
    addEntry,
    clearEntries,
    setChildReaction: (r) => { setChildReactionS(r); setViewedByChildS(true) },
    setViewedByChild: ()  => setViewedByChildS(true),
    setCallRequested: (v) => setCallRequestedS(v),
    setNoEntryMode:   (v) => setNoEntryModeS(v),
  }

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
    <div className="h-full max-w-sm mx-auto bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      {renderScreen()}
    </div>
  )
}
