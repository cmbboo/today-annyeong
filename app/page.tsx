'use client'
import { useState } from 'react'
import { ScreenName, RouteParams, Entry, ChildReaction, UserRole, ScreenProps } from '@/src/types'
import { getTimeString } from '@/src/data'

import RoleSelect     from '@/src/screens/RoleSelect'
import ChildInvite    from '@/src/screens/ChildInvite'
import ParentJoin     from '@/src/screens/ParentJoin'
import ParentHome     from '@/src/screens/ParentHome'
import CategorySelect from '@/src/screens/CategorySelect'
import DetailSelect   from '@/src/screens/DetailSelect'
import Complete       from '@/src/screens/Complete'
import ChildReport    from '@/src/screens/ChildReport'

type Route = { name: ScreenName; params?: RouteParams }
const RESET_SCREENS: ScreenName[] = ['RoleSelect', 'ParentHome', 'ChildReport']

export default function Page() {
  // ── 네비게이션 ──
  const [stack, setStack] = useState<Route[]>([{ name: 'RoleSelect' }])
  const current = stack[stack.length - 1]

  const navigate = (screen: ScreenName, params?: RouteParams) => {
    // Complete 첫 도달 시 sentTime 기록
    if (screen === 'Complete' && entries.length > 0 && !sentTime) {
      setSentTimeS(getTimeString())
    }
    setStack(RESET_SCREENS.includes(screen)
      ? [{ name: screen, params }]
      : prev => [...prev, { name: screen, params }])
  }
  const goBack = () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev)

  // ── 기본 상태 ──
  const [entries,       setEntries]        = useState<Entry[]>([])
  const [childReaction, setChildReactionS] = useState<ChildReaction | null>(null)
  const [viewedByChild, setViewedByChildS] = useState(false)

  // ── MVP2 상태 ──
  const [callRequested, setCallRequestedS] = useState(false)
  const [streakDays]                       = useState(3)
  const [noEntryMode,   setNoEntryModeS]   = useState(false)

  // ── MVP3 상태 ──
  const [connected,   setConnectedS]  = useState(false)
  const [role,        setRoleS]       = useState<UserRole>(null)
  const [viewedTime,  setViewedTimeS] = useState<string | null>(null)

  // ── MVP4 상태 ──
  const [sentTime, setSentTimeS] = useState<string | null>(null)

  // ── 액션 ──
  const addEntry = (entry: Entry) =>
    setEntries(prev => [...prev.filter(e => e.categoryKey !== entry.categoryKey), entry])

  const clearEntries = () => {
    setEntries([])
    setChildReactionS(null)
    setViewedByChildS(false)
    setCallRequestedS(false)
    setViewedTimeS(null)
    setSentTimeS(null)
  }

  const handleSetConnected = (r: UserRole) => {
    setConnectedS(r !== null)
    setRoleS(r)
  }

  const handleSetViewedByChild = () => {
    if (!viewedByChild) {
      setViewedByChildS(true)
      setViewedTimeS(getTimeString())
    }
  }

  const screenProps: ScreenProps = {
    navigation:       { navigate, goBack, params: current.params },
    entries,
    childReaction,
    viewedByChild,
    viewedTime,
    sentTime,
    callRequested,
    streakDays,
    noEntryMode,
    connected,
    role,
    addEntry,
    clearEntries,
    setChildReaction: (r) => { setChildReactionS(r); if (!viewedByChild) handleSetViewedByChild() },
    setViewedByChild: handleSetViewedByChild,
    setCallRequested: (v) => setCallRequestedS(v),
    setNoEntryMode:   (v) => setNoEntryModeS(v),
    setConnected:     handleSetConnected,
  }

  const renderScreen = () => {
    switch (current.name) {
      case 'RoleSelect':     return <RoleSelect     {...screenProps} />
      case 'ChildInvite':    return <ChildInvite    {...screenProps} />
      case 'ParentJoin':     return <ParentJoin     {...screenProps} />
      case 'ParentHome':     return <ParentHome     {...screenProps} />
      case 'CategorySelect': return <CategorySelect {...screenProps} />
      case 'DetailSelect':   return <DetailSelect   {...screenProps} />
      case 'Complete':       return <Complete       {...screenProps} />
      case 'ChildReport':    return <ChildReport    {...screenProps} />
      default:               return <RoleSelect     {...screenProps} />
    }
  }

  return (
    <div className="h-full max-w-sm mx-auto bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      {renderScreen()}
    </div>
  )
}
