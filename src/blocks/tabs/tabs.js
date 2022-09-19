export default function tabs() {
  const tabBlocks = document.querySelectorAll('.tabs')
  for (const tabBlock of tabBlocks) {
    const tabGroup = tabBlock.dataset.tabsGroup
    const headGroup = document.querySelectorAll(`.tabs-head[data-tabs-group="${tabGroup}"]`)
    const bodyGroup = document.querySelectorAll(`.tabs-body[data-tabs-group="${tabGroup}"]`)
    const headItems = ((headGroup.length > 0) ? document.querySelectorAll(`.tabs-head[data-tabs-group="${tabGroup}"] .tabs-head__item`) : tabBlock.querySelectorAll('.tabs-head__item'))
    const bodyItems = ((bodyGroup.length > 0) ? document.querySelectorAll(`.tabs-body[data-tabs-group="${tabGroup}"] .tabs-body__item`) : tabBlock.querySelectorAll('.tabs-body__item'))
    for (const [index, button] of headItems.entries()) {
      button.addEventListener('click', (event) => {
        for (const head of headItems) {
          head.classList.remove('tabs-head__item--active')
        }
        for (const body of bodyItems) {
          body.classList.remove('tabs-body__item--active')
        }
        event.currentTarget.classList.add('tabs-head__item--active')
        bodyItems[index].classList.add('tabs-body__item--active')
      })
    }
  }
}
