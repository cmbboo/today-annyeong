import { CategoryData, Entry, DayMood } from './types'

export const INVITE_CODE = '3487'

// ─── 선택 트리 ────────────────────────────────────────────────────
export const categories: CategoryData[] = [
  {
    key: 'meal', question: '오늘 뭐 드셨어요?', emoji: '🍚', bgColor: '#E1F5EE',
    options: [
      { id: 'meal_good',   label: '잘 먹었어요',   tone: 'positive' },
      { id: 'meal_little', label: '조금 먹었어요', tone: 'neutral', subOptions: [
        { id: 'ml_1', label: '입맛이 없었어요',      tone: 'negative' },
        { id: 'ml_2', label: '속이 불편했어요',      tone: 'alert'    },
        { id: 'ml_3', label: '바빠서 못 먹었어요',   tone: 'neutral'  },
        { id: 'ml_4', label: '그냥 생각이 없었어요', tone: 'neutral'  },
      ]},
      { id: 'meal_bad', label: '못 먹었어요', tone: 'negative', subOptions: [
        { id: 'mb_1', label: '입맛이 없었어요',      tone: 'negative' },
        { id: 'mb_2', label: '속이 불편했어요',      tone: 'alert'    },
        { id: 'mb_3', label: '바빠서 못 먹었어요',   tone: 'neutral'  },
        { id: 'mb_4', label: '그냥 생각이 없었어요', tone: 'neutral'  },
      ]},
    ],
  },
  {
    key: 'health', question: '오늘 몸은 어떠셨어요?', emoji: '💊', bgColor: '#E6F1FB',
    options: [
      { id: 'h_good',   label: '괜찮았어요',      tone: 'positive' },
      { id: 'h_little', label: '조금 불편했어요', tone: 'neutral', subOptions: [
        { id: 'hl_1', label: '머리가 아팠어요',    tone: 'negative' },
        { id: 'hl_2', label: '배가 불편했어요',    tone: 'negative' },
        { id: 'hl_3', label: '허리가 불편했어요',  tone: 'negative' },
        { id: 'hl_4', label: '다리가 불편했어요',  tone: 'negative' },
        { id: 'hl_5', label: '기타',               tone: 'negative' },
      ]},
      { id: 'h_bad', label: '많이 불편했어요', tone: 'alert', subOptions: [
        { id: 'hb_1', label: '머리가 많이 아팠어요',  tone: 'alert'   },
        { id: 'hb_2', label: '배가 많이 아팠어요',    tone: 'alert'   },
        { id: 'hb_3', label: '허리가 많이 아팠어요',  tone: 'alert'   },
        { id: 'hb_4', label: '다리가 많이 아팠어요',  tone: 'alert'   },
        { id: 'hb_5', label: '병원에 다녀왔어요',     tone: 'neutral' },
      ]},
    ],
  },
  {
    key: 'activity', question: '오늘 어디 다녀오셨어요?', emoji: '🚶', bgColor: '#FAEEDA',
    options: [
      { id: 'a_home', label: '집에 있었어요', tone: 'neutral'  },
      { id: 'a_walk', label: '산책했어요',    tone: 'positive' },
      { id: 'a_out',  label: '외출했어요',    tone: 'positive', subOptions: [
        { id: 'ao_1', label: '병원 다녀왔어요', tone: 'neutral'  },
        { id: 'ao_2', label: '장 보러 갔어요',  tone: 'positive' },
        { id: 'ao_3', label: '지인을 만났어요', tone: 'positive' },
        { id: 'ao_4', label: '가족을 만났어요', tone: 'positive' },
        { id: 'ao_5', label: '기타',            tone: 'neutral'  },
      ]},
    ],
  },
  {
    key: 'mood', question: '오늘 기분은 어떠셨어요?', emoji: '😊', bgColor: '#FBEAF0',
    options: [
      { id: 'm_good',   label: '좋았어요',          tone: 'positive' },
      { id: 'm_normal', label: '평범했어요',         tone: 'neutral'  },
      { id: 'm_down',   label: '조금 가라앉았어요', tone: 'negative', subOptions: [
        { id: 'md_1', label: '피곤했어요',      tone: 'negative' },
        { id: 'md_2', label: '외로웠어요',      tone: 'negative' },
        { id: 'md_3', label: '걱정이 있었어요', tone: 'negative' },
        { id: 'md_4', label: '그냥 그랬어요',   tone: 'neutral'  },
      ]},
    ],
  },
  {
    key: 'memory', question: '오늘 기억에 남는 일이 있었나요?', emoji: '✨', bgColor: '#F1EFE8',
    options: [
      { id: 'me_1', label: '맛있는 걸 먹었어요',    tone: 'positive' },
      { id: 'me_2', label: '좋은 걸 봤어요',         tone: 'positive' },
      { id: 'me_3', label: '누군가 생각났어요',      tone: 'neutral'  },
      { id: 'me_4', label: '그냥 평범한 하루였어요', tone: 'neutral'  },
    ],
  },
]

// ─── Mock 데이터 ──────────────────────────────────────────────────
export const mockEntries: Entry[] = [
  { categoryKey: 'meal',     categoryQuestion: '오늘 뭐 드셨어요?',         path: ['잘 먹었어요'],  isAlert: false },
  { categoryKey: 'health',   categoryQuestion: '오늘 몸은 어떠셨어요?',      path: ['괜찮았어요'],   isAlert: false },
  { categoryKey: 'activity', categoryQuestion: '오늘 어디 다녀오셨어요?',    path: ['산책했어요'],   isAlert: false },
  { categoryKey: 'mood',     categoryQuestion: '오늘 기분은 어떠셨어요?',    path: ['좋았어요'],     isAlert: false },
]

export const weeklyMockData: DayMood[] = [
  { day: '월', emoji: '😀', label: '좋았어요',       hasEntry: true,  isToday: false },
  { day: '화', emoji: '🙂', label: '괜찮았어요',     hasEntry: true,  isToday: false },
  { day: '수', emoji: '😐', label: '그저 그랬어요',  hasEntry: true,  isToday: false },
  { day: '목', emoji: '🥵', label: '더웠어요',        hasEntry: true,  isToday: false },
  { day: '금', emoji: '😔', label: '우울했어요',      hasEntry: true,  isToday: false },
  { day: '토', emoji: '😀', label: '좋았어요',        hasEntry: true,  isToday: false },
  { day: '일', emoji: '○',  label: '아직 전달 전',   hasEntry: false, isToday: true  },
]

// ─── 안녕나무 스트릭 ──────────────────────────────────────────────
export function getStreakMessage(days: number): { emoji: string; text: string } {
  if (days >= 30) return { emoji: '🌳', text: `${days}일째 안녕나무가 든든해졌어요` }
  if (days >= 7)  return { emoji: '🌿', text: `${days}일째 하루가 쌓이고 있어요` }
  return            { emoji: '🌱', text: `${days}일째 안녕나무가 자라고 있어요` }
}

// ─── 시간 문자열 ──────────────────────────────────────────────────
export function getTimeString(): string {
  const d = new Date()
  const h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const period = h < 12 ? '오전' : '오후'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${period} ${h12}:${m}`
}

// ─── 경고 요약 (MVP4 강화 — 더 넓은 조건 감지) ────────────────────
export function getAlertSummaries(entries: Entry[]): string[] {
  const msgs: string[] = []
  const seen = new Set<string>()          // 중복 방지

  const add = (msg: string) => {
    if (!seen.has(msg)) { seen.add(msg); msgs.push(msg) }
  }

  for (const e of entries) {
    const [m, s] = e.path

    switch (e.categoryKey) {
      case 'meal':
        if (m === '못 먹었어요')
          add('오늘 식사를 충분히 하지 못했다고 기록하셨어요.')
        else if (m === '조금 먹었어요')
          add('오늘 식사를 조금 드셨다고 기록하셨어요.')
        break

      case 'health':
        if (m === '많이 불편했어요') {
          if (s === '병원에 다녀왔어요')
            add('몸이 많이 불편하셔서 병원에 다녀오셨다고 기록하셨어요.')
          else
            add(`몸이 많이 불편하다고 기록하셨어요.${s ? ` (${s})` : ''}`)
        } else if (m === '조금 불편했어요') {
          add(`몸이 조금 불편하다고 기록하셨어요.${s ? ` (${s})` : ''}`)
        }
        break

      case 'activity':
        if (e.path.includes('병원 다녀왔어요'))
          add('병원에 다녀오셨다고 기록하셨어요.')
        break

      case 'mood':
        if (m === '조금 가라앉았어요')
          add(`기분이 조금 가라앉으셨다고 기록하셨어요.${s ? ` (${s})` : ''}`)
        break
    }
  }
  return msgs
}

// ─── 안녕 점수 (entries 기반 계산) ───────────────────────────────
export function calculateScore(entries: Entry[]): number {
  if (!entries.length) return 88    // 기본 Mock 점수

  const alertCount = getAlertSummaries(entries).length
  const severeCount = entries.filter(e => e.isAlert).length

  let score = 100 - alertCount * 12 - severeCount * 8
  return Math.max(45, Math.min(95, score))
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return '식사, 건강, 기분이 모두 안정적이에요.'
  if (score >= 75) return '전반적으로 안정적이나 일부 확인이 필요해요.'
  if (score >= 60) return '일부 불편하신 부분이 있어요. 한 번 연락해보세요.'
  return '오늘은 특별히 확인이 필요한 상태예요.'
}

// ─── 최근 7일 요약 텍스트 ────────────────────────────────────────
export function getWeeklySummaryText(data: DayMood[]): string {
  const entryCount = data.filter(d => d.hasEntry).length
  const hasBadDay  = data.some(d => d.emoji === '😔' && d.hasEntry)

  if (hasBadDay)       return '기분이 낮았던 날이 있어 한 번 살펴보면 좋아요.'
  if (entryCount >= 6) return '최근 일주일은 전반적으로 안정적이었어요.'
  if (entryCount >= 4) return '꾸준히 안녕을 전하고 계세요.'
  return '안녕을 전하면 가족이 더 안심할 수 있어요.'
}

// ─── AI 하루 요약 ────────────────────────────────────────────────
export function generateSummary(entries: Entry[]): string {
  if (!entries.length)
    return '오늘 어머니는 식사도 잘 하시고 건강도 괜찮으셨어요. 산책도 다녀오셨고 기분도 좋으셨습니다. 평소처럼 무사한 하루를 보내신 것 같아요.'

  const positive: string[] = []
  const concerns: string[] = []
  let hasAlert = false
  let alertDetail = ''

  for (const e of entries) {
    const m = e.path[0], s = e.path[1]
    if (e.isAlert) { hasAlert = true; if (s) alertDetail = s }
    switch (e.categoryKey) {
      case 'meal':
        if (m === '잘 먹었어요')       positive.push('식사를 잘 하셨고')
        else if (m === '조금 먹었어요') concerns.push(`식사를 조금 하셨어요${s ? ` (${s})` : ''}`)
        else                            concerns.push(`식사를 잘 못 하셨어요${s ? ` — ${s}` : ''}`)
        break
      case 'health':
        if (m === '괜찮았어요')          positive.push('몸 상태도 괜찮으셨고')
        else if (m === '조금 불편했어요') concerns.push(`몸이 조금 불편하셨어요${s ? ` (${s})` : ''}`)
        else                              concerns.push(`몸이 많이 불편하셨어요${s ? ` — 특히 ${s}` : ''}`)
        break
      case 'activity':
        if (m === '집에 있었어요')   positive.push('집에서 편히 쉬셨고')
        else if (m === '산책했어요') positive.push('산책도 다녀오셨고')
        else                          positive.push(`외출도 하셨어요${s ? ` (${s})` : ''}`)
        break
      case 'mood':
        if (m === '좋았어요')        positive.push('기분도 좋으셨어요')
        else if (m === '평범했어요') positive.push('기분은 평범하게 지내셨어요')
        else                         concerns.push(`기분이 조금 가라앉으셨어요${s ? ` (${s})` : ''}`)
        break
      case 'memory':
        if (m !== '그냥 평범한 하루였어요') positive.push(m)
        break
    }
  }

  if (!concerns.length)
    return `오늘 어머니는 ${positive.join(', ')}. 전반적으로 평온하고 무사한 하루를 보내신 것 같아요.`
  if (!positive.length) {
    const tail = hasAlert
      ? ` 특히 ${alertDetail || '불편한 부분'}이 있으시니 한 번 직접 확인해보시는 게 좋겠어요.`
      : ` 가볍게 안부를 여쭤보는 것도 좋을 것 같아요.`
    return `오늘 어머니는 ${concerns.join(', ')}.${tail}`
  }
  const tail = hasAlert
    ? ` 특히 ${alertDetail || '불편하신 부분'}이 있으시니 한 번 확인해보세요.`
    : ` 몸 상태는 한 번 확인해보면 좋겠어요.`
  return `오늘 어머니는 ${positive.join(', ')}. 다만, ${concerns.join(', ')}.${tail}`
}
