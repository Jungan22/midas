import type { Meta, StoryObj } from '@storybook/react'
import { RoundButton } from './RoundButton'
import { Plus, X, Heart, Star, Settings } from 'lucide-react'
import { expect, userEvent } from '@storybook/test'

const meta: Meta<typeof RoundButton> = {
  component: RoundButton,
  title: 'Components/RoundButton',
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'large',
  },
  argTypes: {
    children: { type: 'string' },
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof RoundButton>

export const Primary: Story = {
  args: {
    icon: Plus,
    'aria-label': 'Add item',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: Settings,
    'aria-label': 'Settings',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    icon: Heart,
    'aria-label': 'Like',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    icon: X,
    'aria-label': 'Close',
  },
}

export const WithText: Story = {
  args: {
    children: 'Add',
    variant: 'primary',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
    icon: Star,
    'aria-label': 'Favorite',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    icon: Plus,
    'aria-label': 'Add item',
  },
}

export const Disabled: Story = {
  args: {
    icon: Plus,
    'aria-label': 'Add item',
    isDisabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    await expect(button).toBeDisabled()
  },
}

export const PressedStateDemo: Story = {
  args: {
    icon: Plus,
    'aria-label': 'Add item',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    
    // Simulate press and hold to show yellow halo
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
}

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    icon: Plus,
    'aria-label': 'Add item',
    className: 'test-class',
  },
  play: async ({ canvas, step }) => {
    await step('it should have focus when clicked', async () => {
      const button = canvas.getByRole('button')
      await userEvent.click(button)
      await expect(button).toBeEnabled()
      button.focus()
      await userEvent.keyboard('{Enter}')
      await expect(button).toHaveFocus()
    })
  },
}