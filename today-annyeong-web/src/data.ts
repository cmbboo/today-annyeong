import { CategoryData, Entry } from './types'

export const categories: CategoryData[] = [
  {
    key: 'meal', question: '오늘 뭐 드셨어요?', emoji: '🍚', bgColor: '#E1F5EE',
    options: [
      { id: 'meal_good',   label: '잘 먹었어요',   tone: 'positive' },
      { id: 'meal_little', label: '조금 먹었어요', tone: 'neutral', subOptions: [
        { id: 'ml_1', label: '입맛이 없었어요',    tone: 'negative' },
        { id: 'ml_2', label: '속이 불편했어요',    tone: 'alert'    },
        { id: 'ml_3', label: '바빠서 못 먹었어요', tone: 'neutral'  },
        { id: 'ml_4', label: '그냥 생각이 없었어요', tone: 'neutral' },
      ]},
      { id: 'meal_bad',    label: '못 먹었어요',   tone: 'negative', subOptions: [
        { id: 'mb_1', label: '입맛이 없었어요',    tone: 'negative' },
        { id: 'mb_2', label: '속이 불편했어요',    tone: 'alert'    },
        { id: 'mb_3', label: '바빠서 못 먹었어요', tone: 'neutral'  },
        { id: 'mb_4', label: '그냥 생각이 없었어요', tone: 'neutral' },
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
      { id: 'a_home', label: '집에 있었어요', tone: 'neutral' },
      { id: 'a_walk', label: '산책했어요',    tone: 'positive' },
      { id: 'a_out',  label: '외출했어요',    tone: 'positive', subOptions: [
        { id: 'ao_1', label: '병원 다녀왔어요',  tone: 'neutral'  },
        { id: 'ao_2', label: '장 보러 갔어요',   tone: 'positive' },
        { id: 'ao_3', label: '지인을 만났어요',  tone: 'positive' },
        { id: 'ao_4', label: '가족을 만났어요',  tone: 'positive' },
        { id: 'ao_5', label: '기타',             tone: 'neutral'  },
      ]},
    ],
  },
  {
    key: 'mood', question: '오늘 기분은 어떠셨어요?', emoji: '😊', bgColor: '#FBEAF0',
    options: [
      { id: 'm_good',   label: '좋았어요',            tone: 'positive' },
      { id: 'm_normal', label: '평범했어요',           tone: 'neutral'  },
      { id: 'm_down',   label: '조금 가라앉았어요',   tone: 'negative', subOptions: [
        { id: 'md_1', label: '피곤했어요',       tone: 'negative' },
        { id: 'md_2', label: '외로웠어요',       tone: 'negative' },
        { id: 'md_3', label: '걱정이 있었어요',  tone: 'negative' },
        { id: 'md_4', label: '그냥 그랬어요',    tone: 'neutral'  },
      ]},
    ],
  },
  {
    key: 'memory', question: '오늘 기억에 남는 일이 있었나요?', emoji: '✨', bgColor: '#F1EFE8',
    options: [
      { id: 'me_1', label: '맛있는 걸 먹었어요',      tone: 'positive' },
      { id: 'me_2', label: '좋은 걸 봤어요',           tone: 'positive' },
      { id: 'me_3', label: '누군가 생각났어요',        tone: 'neutral'  },
      { id: 'me_4', label: '그냥 평범한 하루였어요',  tone: 'neutral'  },
    ],
  },
]

export const mockEntries: Entry[] = [
  { categoryKey: 'meal',     categoryQuestion: '오늘 뭐 드셨어요?',         path: ['잘 먹었어요'],   isAlert: false },
  { categoryKey: 'health',   categoryQuestion: '오늘 몸은 어떠셨어요?',      path: ['괜찮았어요'],    isAlert: false },
  { categoryKey: 'activity', categoryQuestion: '오늘 어디 다녀오셨어요?',    path: ['산책했어요'],    isAlert: false },
  { categoryKey: 'mood',     categoryQuestion: '오늘 기분은 어떠셨어요?',    path: ['좋았어요'],      isAlert: false },
]

export function generateSummary(entries: Entry[]): string {
  if (!entries.length)
    return '오늘 어머니는 식사도 잘 하시고 건강도 괜찮으셨어요. 산책도 다녀오셨고 기분도 좋으셨습니다. 평소처럼 무사한 하루를 보내신 것 같아요.'

  const parts: string[] = []
  let hasAlert = false

  for (const e of entries) {
    const m = e.path[0], s = e.path[1]
    if (e.isAlert) hasAlert = true
    switch (e.categoryKey) {
      case 'meal':
        parts.push(m === '잘 먹었어요' ? '식사를 잘 하셨고'
          : m === '조금 먹었어요' ? `식사를 조금 하셨는데${s ? ` ${s}` : ''}`
          : `식사를 잘 못 하셨어요${s ? ` (${s})` : ''}`)
        break
      case 'health':
        parts.push(m === '괜찮았어요' ? '건강도 괜찮으셨고'
          : m === '조금 불편했어요' ? `몸이 조금 불편하셨는데${s ? ` ${s}` : ''}`
          : `몸이 많이 불편하셨어요${s ? ` (${s})` : ''}`)
        break
      case 'activity':
        parts.push(m === '집에 있었어요' ? '하루를 집에서 보내셨고'
          : m === '산책했어요' ? '산책도 다녀오셨고'
          : `외출도 하셨어요${s ? ` (${s})` : ''}`)
        break
      case 'mood':
        parts.push(m === '좋았어요' ? '기분도 좋으셨어요'
          : m === '평범했어요' ? '기분은 평범하게 지내셨어요'
          : `기분이 조금 가라앉으셨어요${s ? ` (${s})` : ''}`)
        break
      case 'memory':
        if (m !== '그냥 평범한 하루였어요') parts.push(m)
        break
    }
  }

  if (!parts.length) return '오늘 하루를 전해주셨어요. 무사히 지내고 계신 것 같아요.'
  const tail = hasAlert
    ? ' 불편한 부분이 있으신 것 같으니 한번 연락해 보시는 건 어떨까요.'
    : ' 평소처럼 무사한 하루를 보내신 것 같아요.'
  return `오늘 어머니는 ${parts.join(', ')}.${tail}`
}
