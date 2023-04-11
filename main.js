const xCell = 'x'
const circleCell = 'circle'
const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElm = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winnerElm = document.getElementById('winnerText')
const restartBut = document.getElementById('restart')
const winnerText = document.querySelector('[data-winnig-text]')
let circleTurn

starGame()
restartBut.addEventListener('click',starGame)
function starGame() {
    circleTurn = false
    cellElm.forEach(cell => {
        cell.classList.remove(xCell)
        cell.classList.remove(circleCell)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick , {once : true})
    })
    setborad_hover()
    winnerElm.classList.remove('show')
}
function handleClick(x){
    const cell = x.target
    const nowcircle = circleTurn ? circleCell : xCell
    placeMark(cell, nowcircle)
    if (check(nowcircle)) {
        end(false)
    } else if (isequal()) {
        end(true)
    }
    else {
        
        swap()
        setborad_hover()
    }
}
function end(equal) {
    if (equal) {
        winnerText.innerText = 'Equal ! 👻'
    } else {
        winnerText.innerText = `${ circleTurn ? "O" : "X"} Wins!🏆`
    }
    winnerElm.classList.add('show')
}
function isequal() {
    return [...cellElm].every(cell => {
        return cell.classList.contains(xCell) ||
        cell.classList.contains(circleCell)
     })
}
function placeMark(cell, nowcircle) {
    cell.classList.add(nowcircle)
}
function swap() {
    circleTurn = !circleTurn
}
function setborad_hover() {
    board.classList.remove(xCell)
    board.classList.remove(circleCell)
    if (circleTurn) {
        board.classList.add(circleCell)
    } else {
        board.classList.add(xCell)
    }
}
function check(nowcircle) {
    return winner.some(combination => {
        return combination.every(index => {
            return cellElm[index].classList.contains(nowcircle)
        })
    })
}