export type Player = 'X' | 'O' | null

export type Board = Player[]

export type GameStatus = 'playing' | 'won' | 'draw'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameState {
  board: Board
  currentPlayer: Player
  status: GameStatus
  winner: Player
}

export interface TicTacToeProps {
  /**
   * Additional CSS class name to apply to the tic-tac-toe container
   */
  className?: string
  
  /**
   * Difficulty level for the computer opponent
   * @default 'medium'
   */
  difficulty?: Difficulty
  
  /**
   * Label for the reset button
   * @default 'Reset Game'
   */
  resetButtonLabel?: string
  
  /**
   * Label for the new game button
   * @default 'New Game'
   */
  newGameButtonLabel?: string
  
  /**
   * Player symbol for the human player
   * @default 'X'
   */
  playerSymbol?: 'X' | 'O'
  
  /**
   * Callback when game state changes
   */
  onGameStateChange?: (gameState: GameState) => void
  
  /**
   * Whether to disable the game
   * @default false
   */
  isDisabled?: boolean
}