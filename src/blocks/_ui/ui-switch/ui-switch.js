export default function uiSwitch() {
  const switches = document.querySelectorAll('.ui-switch')
  if (switches) {
    for (const switchItem of switches) {
      const labels = switchItem.querySelectorAll('.ui-switch__label')
      const switchBody = switchItem.querySelector('.ui-switch__body')
      labels[0].addEventListener('click', () => {
        switchItem.classList.remove('ui-switch--active')
      })
      labels[1].addEventListener('click', () => {
        switchItem.classList.add('ui-switch--active')
      })
      switchBody.addEventListener('click', () => {
        switchItem.classList.toggle('ui-switch--active')
      })
    }
  }
}
