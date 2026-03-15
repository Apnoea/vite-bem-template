import tippy from 'tippy.js'

export default function uiTooltip() {
  const tooltips = document.querySelectorAll('.ui-tooltip button')
  for (const tooltip of tooltips) {
    tooltip.addEventListener('click', (event) => {
      event.stopPropagation()
    })
  }
  tippy(tooltips, {
    allowHTML: true,
    arrow: false,
    interactive: true,
    trigger: 'click'
  })
}
