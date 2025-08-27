import type { Meta, StoryObj } from '@storybook/react'
import { Calculator } from './Calculator'

const meta: Meta<typeof Calculator> = {
  component: Calculator,
  title: 'Components/Calculator',
  tags: ['autodocs'],
  args: {},
  argTypes: {
    firstNumberLabel: { type: 'string' },
    secondNumberLabel: { type: 'string' },
    calculateButtonLabel: { type: 'string' },
    resetButtonLabel: { type: 'string' },
    resultLabel: { type: 'string' },
    firstNumberPlaceholder: { type: 'string' },
    secondNumberPlaceholder: { type: 'string' },
  },
}

export default meta
type Story = StoryObj<typeof Calculator>

export const Default: Story = {
  args: {},
}

export const WithSwedishLabels: Story = {
  args: {
    firstNumberLabel: 'Första talet',
    secondNumberLabel: 'Andra talet',
    calculateButtonLabel: 'Beräkna',
    resetButtonLabel: 'Rensa',
    resultLabel: 'Resultat:',
    firstNumberPlaceholder: 'Ange första talet',
    secondNumberPlaceholder: 'Ange andra talet',
  },
}

export const WithCustomLabels: Story = {
  args: {
    firstNumberLabel: 'Value A',
    secondNumberLabel: 'Value B',
    calculateButtonLabel: 'Add Numbers',
    resetButtonLabel: 'Clear All',
    resultLabel: 'Sum:',
    firstNumberPlaceholder: 'Enter value A',
    secondNumberPlaceholder: 'Enter value B',
  },
}