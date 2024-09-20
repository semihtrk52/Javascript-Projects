const widthRange = document.getElementById('width-range')
const widthValue = document.getElementById('width-value')
const heightRange = document.getElementById('height-range')
const heightValue = document.getElementById('height-value')
const createButton = document.getElementById('submit-grid')
const clearButton = document.getElementById('clear-grid')
const colorSelect = document.getElementById('color-input')
const eraseButton = document.getElementById('erase-btn')
const paintButton = document.getElementById('paint-btn')
const container = document.querySelector('.container')

setInterval(() => {
  widthValue.textContent = widthRange.value
  heightValue.textContent = heightRange.value
}, 100)

let isPainting = false
let isErase = false
let count = 1

container.addEventListener('mousedown', () => {
  if (!isErase && count) {
    isPainting = true
  } else if (!count) {
    isErase = true
  }
})

container.addEventListener('mouseup', () => {
  isPainting = false
  isErase = false
})

container.addEventListener('mouseleave', () => {
  isPainting = false
})

eraseButton.addEventListener('click', () => {
  isErase = true
  isPainting = false
  count = 0
})

paintButton.addEventListener('click', () => {
  isPainting = true
  isErase = false
  count = 1
})

createButton.addEventListener('click', () => {
  container.innerHTML = ''

  for (let i = 0; i < heightRange.value; i++) {
    let div = document.createElement('div')
    div.classList.add('gridRow')

    for (let j = 0; j < widthRange.value; j++) {
      let col = document.createElement('div')
      col.classList.add('gridCol')
      div.appendChild(col)

      col.addEventListener('mousedown', () => {
        if (isPainting) {
          col.style.backgroundColor = colorSelect.value
        } else if (isErase) {
          col.style.backgroundColor = 'white'
        }
      })

      col.addEventListener('mouseenter', (e) => {
        if (e.buttons === 1) {
          if (isPainting) {
            col.style.backgroundColor = colorSelect.value
          } else if (isErase) {
            col.style.backgroundColor = 'white'
          }
        }
      })
    }
    container.appendChild(div)
  }
})

clearButton.addEventListener('click', () => {
  container.innerHTML = ''
})
