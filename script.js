window.addEventListener("DOMContentLoaded",()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'))
    const resetButton = document.querySelector('#reset')
    const playerDisplay = document.querySelector('.display-player')
    const announcer = document.querySelector('.announcer')

    let board = ["","","","","","","","",""]
    let currentPlayer = 'X'
    let isGameActive = true

    // indexes in the tiles array

    /*

            [0],[1],[2],
            [3],[4],[5],
            [6],[7],[8],

    */

    //End game state

    const playerX = 'PLAYERX_WON'
    const playerO = 'PLAYERO_WON'
    const tie = 'TIE'

    // Winning conditions state

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const handleResultValidation = ()=>{
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i] 

            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]

            if(a === '' || b === '' || c === ''){
                continue;
            }

            if(a === b && b === c){
                roundWon = true
                break;
            }
        }

        if(roundWon){
            announce(currentPlayer === 'X' ? playerX:playerO)
            isGameActive = false
            return
        }

        if(!board.includes('')){
            announce(tie)
        }
    }

    const updateBoard = (index)=>{
        board[index] = currentPlayer
    }

    const announce = (type)=>{
        switch(type){
            case playerX:
                announcer.innerHTML = `Player <span class="playerX"> X </span> Won`
                break;
            case playerO:
                announcer.innerHTML = `Player <span class="playerO"> O </span> Won`
                break;
            case tie:
                announcer.innerHTML = 'tie'
        }
        announcer.classList.remove('hide')
    }

    const changePlayer = ()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        playerDisplay.innerText = currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`)
    }

    const isValidAction = (tile)=>{
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false
        }
        return true
    }

    const userAction = (tile,index)=>{
        if( isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer
            tile.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleResultValidation()
            changePlayer()
        }
    }

    const resetBoard = ()=>{
        board = ["","","","","","","","",""]
        isGameActive = true
        announcer.classList.add('hide')

        if(currentPlayer === 'O'){
            changePlayer()
        }

        tiles.forEach(tile=>{
            tile.innerText = ''
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index))
    })

    resetButton.addEventListener('click',resetBoard)
})