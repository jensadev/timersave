import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<main class="center">
  <div clas="timer-controls">
    <h1 id="timer">0.00</h1>
    <button id="timer-button" class="btn">Start</button>
  </div>
  <ul id="timerList" class="timer-list"></ul>
</main>`


const setupTimer = (button: HTMLButtonElement, timerElement: HTMLHeadingElement) => {
  let interval: number
  let count = 0
  let isRunning = false

  const start = () => {
    if (isRunning) return
    isRunning = true
    interval = window.setInterval(() => {
      count++
      const seconds = Math.floor(count / 100)
      const hundredths = count % 100
      timerElement.textContent = `${seconds}.${hundredths.toString().padStart(2, '0')}`
    }, 10)
  }

  const stop = () => {
    if (!isRunning) return
    isRunning = false
    clearInterval(interval)
    updateLs(timerElement.textContent!)
  }

  button.addEventListener('click', () => {
    if (isRunning) {
      stop()
      button.textContent = 'Start'
    } else {
      start()
      count = 0
      button.textContent = 'Stop'
    }
  })
}

const button = document.querySelector<HTMLButtonElement>('#timer-button')!
const timerElement = document.querySelector<HTMLHeadingElement>('#timer')!
setupTimer(button, timerElement)

const updateLs = (time: string) => {
  const timerList = document.querySelector<HTMLUListElement>('#timerList')!
  const li = document.createElement('li')
  const iconDate = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>`
  const iconTimer = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>`
  let date = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long'
  }).format(new Date())
  // li.textContent = `${date} timer: ${time}`
  li.innerHTML = `${iconDate} ${date} ${iconTimer} ${time}`
  timerList.appendChild(li)
}