import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-extra',
  imports: [],
  templateUrl: './extra.html',
  styleUrl: './extra.scss'
})
export class Extra {
// Represents the 3x3 game board. Each element is 'X', 'O', or null (empty).
  board: WritableSignal<(string | null)[]> = signal(Array(9).fill(null));

  // The current player ('X' or 'O'). 'X' starts.
  currentPlayer: WritableSignal<'X' | 'O'> = signal('X');

  // Stores the winner ('X', 'O', 'Draw', or null if game is ongoing).
  winner: WritableSignal<string | null> = signal(null);

  constructor() {
    this.newGame(); // Initialize the game when the component starts
  }

  /**
   * Starts a new game by resetting the board and current player.
   */
  newGame(): void {
    this.board.set(Array(9).fill(null)); // Reset all cells to null
    this.currentPlayer.set('X');        // 'X' always starts
    this.winner.set(null);              // Clear any previous winner
  }

  /**
   * Handles a player's move.
   * @param index The index of the cell clicked (0-8).
   */
  makeMove(index: number): void {
    // If there's already a winner or the cell is not empty, do nothing
    if (this.winner() || this.board()[index]) {
      return;
    }

    // Update the board with the current player's mark
    this.board.update(currentBoard => {
      const newBoard = [...currentBoard]; // Create a copy to ensure immutability for signal update
      newBoard[index] = this.currentPlayer();
      return newBoard;
    });

    // Check for a winner after the move
    const currentWinner = this.checkWinner(this.board());
    if (currentWinner) {
      this.winner.set(currentWinner);
    } else if (this.board().every(cell => cell !== null)) {
      // If no winner and all cells are filled, it's a draw
      this.winner.set('Draw');
    } else {
      // Switch to the next player
      this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X');
    }
  }

  /**
   * Checks the current board for a winning combination.
   * @param board The current state of the game board.
   * @returns 'X' or 'O' if there's a winner, otherwise null.
   */
  private checkWinner(board: (string | null)[]): string | null {
    // Define all possible winning lines (rows, columns, diagonals)
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      // Check if all three cells in a line are the same and not empty
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning mark ('X' or 'O')
      }
    }
    return null; // No winner yet
  }
}
