import { toggle } from 'slide-element'

export default function uiAccordion() {
  const accordionBlocks = document.querySelectorAll('.ui-accordion')
  if (accordionBlocks) {
    for (const accordionItem of accordionBlocks) {
      const itemHead = accordionItem.querySelector('.ui-accordion__head')
      const itemBody = accordionItem.querySelector('.ui-accordion__body')
      itemHead.addEventListener('click', () => {
        itemHead.classList.toggle('ui-accordion__head--active')
        toggle(itemBody)
      })
    }
  }
}
