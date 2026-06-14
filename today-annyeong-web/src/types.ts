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
  key:     CategoryKey
  question: string
  emoji:   string
  bgColor: string
  options: Option[]
}

// ─── 앱 상태 ──────────────────────────────────────────────────────
export interface Entry {
  categoryKey:      CategoryKey
  categoryQuestion: string
  path:             string[]
  isAlert:          boolean
}

export type ChildReaction = '❤️' | '😊' | '👍'

export interface AppState {
  entries:          Entry[]
  childReaction:    ChildReaction | null
  viewedByChild:    boolean
  addEntry:         (entry: Entry) => void
  clearEntries:     () => void
  setChildReaction: (r: ChildReaction) => void
  setViewedByChild: () => void
}

// 각 화면 컴포넌트가 받는 props
export type ScreenProps = { navigation: NavigationProp } & AppState
