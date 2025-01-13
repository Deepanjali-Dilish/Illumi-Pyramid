const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const clearButton = document.getElementById('clear')
const rowInput = document.getElementById('rows')
const colorInput = document.getElementById('color')
const delayInput = document.getElementById('delay')
const container = document.getElementById('pyramid')
const contents = document.querySelector('.content')

let intervalId;
let currentRow = 0;

startButton.addEventListener('click', () => {
    const rows = parseInt(rowInput.value)
    const color = colorInput.value
    const delay = parseInt(delayInput.value)

    if (isNaN(rows) || rows <=0 || !color || isNaN(delay) || delay < 100){
        alert('Please enter a vaild details')
    }

    contents.style.display = 'none';

    if(currentRow === 0){
        container.innerHTML = '';
        for(let i=1; i<= rows; i++){
            const row = document.createElement('div')
            row.classList.add('row')
            for(let j=0; j<i; j++){
                const block = document.createElement('div')
                block.classList.add('block')
                row.appendChild(block)
            }

            container.appendChild(row)
        }
    }
    
    const rowsElements = document.querySelectorAll('.row')

    clearInterval(intervalId)
    intervalId = setInterval(() => {
        if (currentRow < rowsElements.length){
            rowsElements[currentRow].childNodes.forEach(block => {
                block.style.background = color
            })
            currentRow++
        }else{
            clearInterval(intervalId)
        }
    },delay)
    
})

stopButton.addEventListener('click', () => {
    clearInterval(intervalId)
})

clearButton.addEventListener('click', () => {
    clearInterval(intervalId)
    currentRow = 0
    container.innerHTML = ''
    rowInput.value = ''
    colorInput.value =''
    delayInput.value = ''
    contents.style.display = 'flex'
})