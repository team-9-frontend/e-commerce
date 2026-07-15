import { describe, expect, it } from 'vitest'
import { cn } from '@/utils/cn'

describe('cn()', () => {
  it('يدمج كام class simple مع بعض', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('يتجاهل قيم falsy (false, null, undefined)', () => {
    const isHidden = false
    expect(cn('flex', isHidden && 'hidden', null, undefined, 'gap-2')).toBe('flex gap-2')
  })

  it('يحل تعارض classes Tailwind ويسيب آخر واحد (merge behavior)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('بيشتغل مع conditional classes زي ما بيتستخدم في Sidebar/Tooltip', () => {
    const isActive = true
    expect(cn('base-class', isActive && 'active-class')).toBe('base-class active-class')
  })
})
