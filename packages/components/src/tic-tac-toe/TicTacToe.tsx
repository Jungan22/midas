'use client'

import * as React from 'react'
import { Button } from '../button'
import { Text } from '../text'
import clsx from 'clsx'
import styles from './TicTacToe.module.css'
import type { TicTacToeProps, Player, Board, GameState, Difficulty } from './types'

// Helper functions for game logic
const createEmptyBoard = (): Board => Array(9).fill(null)

const checkWinner = (board: Board): Player => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null)
}

const getAvailableMoves = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : null)
    .filter((index): index is number => index !== null)
}

// Computer AI logic
const getComputerMove = (board: Board, difficulty: Difficulty, playerSymbol: Player): number => {
  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X'
  const availableMoves = getAvailableMoves(board)
  
  if (availableMoves.length === 0) return -1

  // Easy: Random move
  if (difficulty === 'easy') {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  // Medium: Block player wins and take winning moves, otherwise random
  if (difficulty === 'medium') {
    // Check for winning move
    for (const move of availableMoves) {
      const testBoard = [...board]
      testBoard[move] = computerSymbol
      if (checkWinner(testBoard) === computerSymbol) {
        return move
      }
    }

    // Check for blocking move
    for (const move of availableMoves) {
      const testBoard = [...board]
      testBoard[move] = playerSymbol
      if (checkWinner(testBoard) === playerSymbol) {
        return move
      }
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  // Hard: Use minimax algorithm
  const minimax = (currentBoard: Board, depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(currentBoard)
    
    if (winner === computerSymbol) return 10 - depth
    if (winner === playerSymbol) return depth - 10
    if (isBoardFull(currentBoard)) return 0

    const moves = getAvailableMoves(currentBoard)
    
    if (isMaximizing) {
      let bestScore = -Infinity
      for (const move of moves) {
        const testBoard = [...currentBoard]
        testBoard[move] = computerSymbol
        const score = minimax(testBoard, depth + 1, false)
        bestScore = Math.max(score, bestScore)
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (const move of moves) {
        const testBoard = [...currentBoard]
        testBoard[move] = playerSymbol
        const score = minimax(testBoard, depth + 1, true)
        bestScore = Math.min(score, bestScore)
      }
      return bestScore
    }
  }

  let bestMove = availableMoves[0]
  let bestScore = -Infinity
  
  for (const move of availableMoves) {
    const testBoard = [...board]
    testBoard[move] = computerSymbol
    const score = minimax(testBoard, 0, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

export const TicTacToe = ({
  className,
  difficulty = 'medium',
  resetButtonLabel = 'Reset Game',
  newGameButtonLabel = 'New Game',
  playerSymbol = 'X',
  onGameStateChange,
  isDisabled = false,
}: TicTacToeProps) => {
  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X'
  
  const [board, setBoard] = React.useState<Board>(createEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>(playerSymbol)
  const [winner, setWinner] = React.useState<Player>(null)
  const [isComputerThinking, setIsComputerThinking] = React.useState(false)
  
  const gameState: GameState = {
    board,
    currentPlayer,
    status: winner ? 'won' : isBoardFull(board) ? 'draw' : 'playing',
    winner
  }

  // Notify parent of game state changes
  React.useEffect(() => {
    onGameStateChange?.(gameState)
  }, [board, currentPlayer, winner, onGameStateChange])

  // Computer move effect
  React.useEffect(() => {
    if (currentPlayer === computerSymbol && !winner && !isBoardFull(board) && !isDisabled) {
      setIsComputerThinking(true)
      
      // Add a small delay to make computer moves feel more natural
      const timeout = setTimeout(() => {
        const move = getComputerMove(board, difficulty, playerSymbol)
        if (move !== -1) {
          handleCellClick(move)
        }
        setIsComputerThinking(false)
      }, 500)
      
      return () => clearTimeout(timeout)
    }
  }, [currentPlayer, board, winner, difficulty, playerSymbol, computerSymbol, isDisabled])

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDisabled || isComputerThinking) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer(currentPlayer === playerSymbol ? computerSymbol : playerSymbol)
    }
  }

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPlayer(playerSymbol)
    setWinner(null)
    setIsComputerThinking(false)
  }

  const getGameStatusText = () => {
    if (winner) {
      return winner === playerSymbol ? 'You win!' : 'Computer wins!'
    }
    if (isBoardFull(board)) {
      return "It's a draw!"
    }
    if (isComputerThinking) {
      return 'Computer is thinking...'
    }
    return currentPlayer === playerSymbol ? 'Your turn' : "Computer's turn"
  }

  const getCellAriaLabel = (index: number) => {
    const row = Math.floor(index / 3) + 1
    const col = (index % 3) + 1
    const cellValue = board[index]
    
    if (cellValue) {
      return `Row ${row}, Column ${col}, ${cellValue}`
    }
    return `Row ${row}, Column ${col}, empty`
  }

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <Text className={styles.status} aria-live="polite" aria-atomic="true">
          {getGameStatusText()}
        </Text>
        <Text className={styles.difficulty}>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Text>
      </div>
      
      <div 
        className={styles.board}
        role="grid"
        aria-label="Tic tac toe game board"
      >
        {board.map((cell, index) => (
          <Button
            key={index}
            className={clsx(styles.cell, {
              [styles.cellDisabled]: isDisabled || winner || isComputerThinking
            })}
            onPress={() => handleCellClick(index)}
            isDisabled={isDisabled || !!cell || !!winner || isComputerThinking}
            aria-label={getCellAriaLabel(index)}
          >
            <span className={styles.cellContent} aria-hidden="true">
              {cell}
            </span>
          </Button>
        ))}
      </div>
      
      <div className={styles.controls}>
        <Button
          variant="secondary"
          onPress={resetGame}
          isDisabled={isDisabled}
        >
          {resetButtonLabel}
        </Button>
        <Button
          onPress={resetGame}
          isDisabled={isDisabled}
        >
          {newGameButtonLabel}
        </Button>
      </div>
      
      <div className={styles.legend}>
        <Text>You are playing as: <strong>{playerSymbol}</strong></Text>
        <Text>Computer is playing as: <strong>{computerSymbol}</strong></Text>
      </div>
    </div>
  )
}