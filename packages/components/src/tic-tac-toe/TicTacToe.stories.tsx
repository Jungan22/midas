import type { Meta, StoryObj } from '@storybook/react'
import { TicTacToe } from './TicTacToe'

const meta: Meta<typeof TicTacToe> = {
  component: TicTacToe,
  title: 'Components/TicTacToe',
  tags: ['autodocs'],
  args: {},
  argTypes: {
    difficulty: {
      control: {
        type: 'select',
        options: ['easy', 'medium', 'hard'],
      },
      description: 'Difficulty level for the computer opponent',
    },
    playerSymbol: {
      control: {
        type: 'select',
        options: ['X', 'O'],
      },
      description: 'Symbol for the human player',
    },
    resetButtonLabel: { 
      control: 'text',
      description: 'Label for the reset button',
    },
    newGameButtonLabel: { 
      control: 'text',
      description: 'Label for the new game button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether to disable the game',
    },
    onGameStateChange: {
      action: 'gameStateChanged',
      description: 'Callback when game state changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A tic-tac-toe game component where users can compete against a computer opponent. 
The component follows Midas design guidelines with full accessibility support and keyboard navigation.

## Features
- Three difficulty levels (easy, medium, hard)
- Computer AI opponent with minimax algorithm for hard difficulty
- Full accessibility support with ARIA labels and screen reader announcements
- Keyboard navigation support
- Responsive design
- Customizable labels and player symbols
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TicTacToe>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default tic-tac-toe game with medium difficulty and player as X.',
      },
    },
  },
}

export const EasyDifficulty: Story = {
  args: {
    difficulty: 'easy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Easy difficulty - computer makes random moves.',
      },
    },
  },
}

export const HardDifficulty: Story = {
  args: {
    difficulty: 'hard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hard difficulty - computer uses minimax algorithm for optimal play.',
      },
    },
  },
}

export const PlayerAsO: Story = {
  args: {
    playerSymbol: 'O',
  },
  parameters: {
    docs: {
      description: {
        story: 'Player plays as O symbol instead of default X.',
      },
    },
  },
}

export const CustomLabels: Story = {
  args: {
    resetButtonLabel: 'Restart Game',
    newGameButtonLabel: 'Start Fresh',
    difficulty: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom button labels for internationalization.',
      },
    },
  },
}

export const SwedishLabels: Story = {
  args: {
    resetButtonLabel: 'Återställ spel',
    newGameButtonLabel: 'Nytt spel',
    difficulty: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Swedish labels example for localization.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state of the tic-tac-toe game.',
      },
    },
  },
}

export const WithGameStateCallback: Story = {
  args: {
    onGameStateChange: (gameState) => {
      console.log('Game state changed:', gameState)
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with game state change callback (check console for output).',
      },
    },
  },
}