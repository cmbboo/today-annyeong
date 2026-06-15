// ─── 화면 ─────────────────────────────────────────────────────────
export type ScreenName =
  | 'ModeSelect' | 'ParentHome' | 'CategorySelect'
  | 'DetailSelect' | 'Complete' | 'ChildReport'

export type CategoryKey = 'meal' | 'health' | 'activity' | 'mood' | 'memory'

// ─── 네비게이션 ───────────────────────────────────────────────────
export type RouteParams = { categoryKey?: CategoryKey }

export type NavigationProp = {
  navigate: (screen: ScreenName, params?: RouteParams) => void
  goBack:   () => void
  params?:  RouteParams
}

// ─── 선택 트리 ────────────────────────────────────────────────────
export type OptionTone = 'positive' | 'neutral' | 'negative' | 'alert'

export interface Option {
  id:          string
  label:       string
  tone:        OptionTone
  subOptions?: Option[]
}

export interface CategoryData {
  key:      CategoryKey
  question: string
  emoji:    string
  bgColor:  string
  options:  Option[]
}

// ─── 앱 상태 ──────────────────────────────────────────────────────
export interface Entry {
  categoryKey:      CategoryKey
  categoryQuestion: string
  path:             string[]
  isAlert:          boolean
}

export type ChildReaction = '❤️' | '😊' | '👍'

// MVP2 추가
export interface DayMood {
  day:      string   // 월 화 수 …
  emoji:    string
  label:    string
  hasEntry: boolean
  isToday:  boolean
}

export interface AppState {
  entries:          Entry[]
  childReaction:    ChildReaction | null
  viewedByChild:    boolean
  // MVP2
  callRequested:    boolean
  streakDays:       number
  noEntryMode:      boolean
  // actions
  addEntry:         (entry: Entry) => void
  clearEntries:     () => void
  setChildReaction: (r: ChildReaction) => void
  setViewedByChild: () => void
  setCallRequested: (v: boolean) => void
  setNoEntryMode:   (v: boolean) => void
}

export interface ScreenProps {
  navigation: NavigationProp

  entries: Entry[]
  childReaction: ChildReaction | null
  viewedByChild: boolean

  callRequested: boolean
  streakDays: number
  noEntryMode: boolean

  addEntry: (entry: Entry) => void
  clearEntries: () => void
  setChildReaction: (r: ChildReaction) => void
  setViewedByChild: () => void
  setCallRequested: (v: boolean) => void
  setNoEntryMode: (v: boolean) => void
}