window.onload = () => {

    const cells = document.querySelectorAll('.cell')
    const playerId = document.getElementById('current-player-id')
    const replay = document.getElementById('replay')

    const onWin = (winner) => {
        playerId.textContent = (winner === 0 ? 'GREEN': 'BLUE') + " WINS!"
        replay.style.display = 'block'
    }

    let game = new TicTacToe(onWin)

    replay.addEventListener('click', () => {
        replay.style.display = 'none'
        for(let cell of cells)
            cell.classList.remove('green', 'blue')
        game = new TicTacToe(onWin)
        playerId.textContent = game.currentPlayer
    })

    playerId.textContent = game.currentPlayer

    for(let cell of cells) {
        cell.addEventListener('click', (event) => {
            if(!game.gameEnd) {
                cell.classList.add(game.currentPlayer === 0 ? 'green' : 'blue')
                game.moveNode(event.target.id)
                if (!game.gameEnd)
                    playerId.textContent = game.currentPlayer
            }
        })
    }
}
