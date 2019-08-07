const DIRECTIONS = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[-1,0],[-1,-1]]
const EMPTY = -1

class TicTacToe {
    constructor(onWin = (p) => {console.log(p, "wins")}) {
        this.winHandler = onWin
        this.grid = []
        this.currentPlayer = 0
        this.gridLen = 3
        this.gameEnd = false
        for(let i = 0; i < this.gridLen; i++) {
            this.grid[i] = []
            for(let j = 0; j < this.gridLen; j++) {
                this.grid[i][j] = EMPTY
            }
        }
    }

    moveNode(z) {
        z--
        let i = Math.floor(z / this.gridLen)
        let j = z % this.gridLen
        this.move(i, j)
    }

    move(i, j) {
        if(this.grid[i][j] !== EMPTY) throw Error("Cell is already taken")
        this.grid[i][j] = this.currentPlayer
        if(this.checkWinningCondition()){
            this.winHandler(this.currentPlayer)
            this.gameEnd = true
        } else {
            this.currentPlayer = 1 - this.currentPlayer
        }
    }

    withinBounds() {
        const positions = arguments
        for(let pos of positions) {
            if(pos < 0 || pos >= this.gridLen) return false
        }
        return true
    }

    checkWinningCondition() {
        for(let i = 0; i < this.gridLen; i++) {
            for(let j = 0; j < this.gridLen; j++) {
                if(this.grid[i][j] === EMPTY) continue
                let originalPlayer = this.grid[i][j]
                directionLoop : for(let d = 0; d < DIRECTIONS.length; d++){
                    let directionSum = 1
                    let nextI = i; let nextJ = j;
                    for(let k = 0; k < this.gridLen-1; k++) {
                        nextI += DIRECTIONS[d][0]
                        nextJ += DIRECTIONS[d][1]
                        if (this.withinBounds(nextI, nextJ) && originalPlayer === this.grid[nextI][nextJ]) {
                            directionSum++
                            if(directionSum === 3) return true
                        } else {
                            continue directionLoop
                        }
                    }
                }
            }
        }
        return false
    }
}

