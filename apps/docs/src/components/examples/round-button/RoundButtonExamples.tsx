import React from 'react'
import { RoundButton } from '@midas-ds/components'
import { Plus, X, Heart, Star, Settings } from 'lucide-react'

export const BasicExample = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <RoundButton
        icon={Plus}
        aria-label="Add item"
      />
      <RoundButton
        variant="secondary"
        icon={Settings}
        aria-label="Settings"
      />
      <RoundButton
        variant="tertiary"
        icon={Heart}
        aria-label="Like"
      />
      <RoundButton
        variant="danger"
        icon={X}
        aria-label="Close"
      />
    </div>
  )
}

export const SizeExample = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <RoundButton
        size="large"
        icon={Plus}
        aria-label="Add item (large)"
      />
      <RoundButton
        size="medium"
        icon={Plus}
        aria-label="Add item (medium)"
      />
    </div>
  )
}

export const WithTextExample = () => {
  return (
    <RoundButton aria-label="Add new item">
      Add
    </RoundButton>
  )
}

export const DisabledExample = () => {
  return (
    <RoundButton
      icon={Plus}
      aria-label="Add item"
      isDisabled
    />
  )
}