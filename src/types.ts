// ─── 화면 ─────────────────────────────────────────────────────────
export type ScreenName =
  | 'RoleSelect'      // 역할 선택 (신규)
  | 'ChildInvite'     // 자녀 초대코드 화면 (신규)
  | 'ParentJoin'      // 부모 코드 입력 화면 (신규)
  | 'ParentHome'
  | 'CategorySelect'
  | 'DetailSelect'
  | 'Complete'
  | 'ChildReport'

export type CategoryKey = 'meal' | 'health' | 'activity' | 'mood' | 'memory'

export type UserRole = 'parent' | 'child' | null

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

export interface DayMood {
  day:      string
  emoji:    string
  label:    string
  hasEntry: boolean
  isToday:  boolean
}

export interface AppState {
  // 기존
  entries:          Entry[]
  childReaction:    ChildReaction | null
  viewedByChild:    boolean
  callRequested:    boolean
  streakDays:       number
  noEntryMode:      boolean
  // MVP3 신규
  connected:        boolean
  role:             UserRole
  viewedTime:       string | null
  // 액션
  addEntry:         (entry: Entry) => void
  clearEntries:     () => void
  setChildReaction: (r: ChildReaction) => void
  setViewedByChild: () => void
  setCallRequested: (v: boolean) => void
  setNoEntryMode:   (v: boolean) => void
  setConnected:     (role: UserRole) => void
}

export type ScreenProps = { navigation: NavigationProp } & AppState
