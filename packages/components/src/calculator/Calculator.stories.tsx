import type { Meta, StoryObj } from '@storybook/react'
import { Calculator } from './Calculator'

const meta: Meta<typeof Calculator> = {
  component: Calculator,
  title: 'Components/Calculator',
  tags: ['autodocs'],
  args: {},
  argTypes: {
    numberOfInputs: {
      type: 'number',
      control: {
        type: 'range',
        min: 2,
        max: 10,
        step: 1,
      },
      description: 'Number of input fields to display (2-10)',
    },
    calculateButtonLabel: { type: 'string' },
    resetButtonLabel: { type: 'string' },
    resultLabel: { type: 'string' },
    addNumberLabel: { type: 'string' },
    removeNumberLabel: { type: 'string' },
  },
}

export default meta
type Story = StoryObj<typeof Calculator>

export const Default: Story = {
  args: {},
}

export const WithSwedishLabels: Story = {
  args: {
    calculateButtonLabel: 'Beräkna',
    resetButtonLabel: 'Rensa',
    resultLabel: 'Resultat:',
    addNumberLabel: 'Lägg till nummer',
    removeNumberLabel: 'Ta bort nummer',
  },
}

export const WithFiveNumbers: Story = {
  args: {
    numberOfInputs: 5,
  },
}

export const WithMaxNumbers: Story = {
  args: {
    numberOfInputs: 10,
  },
}

export const WithCustomLabels: Story = {
  args: {
    numberOfInputs: 3,
    calculateButtonLabel: 'Sum All',
    resetButtonLabel: 'Clear All',
    resultLabel: 'Total:',
    addNumberLabel: '+ Add Number',
    removeNumberLabel: '- Remove Number',
  },
}
