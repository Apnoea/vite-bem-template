export default function uitab() {
  const tabBlocks = document.querySelectorAll('.ui-tab')
  for (const tabBlock of tabBlocks) {
    const tabGroup = tabBlock.dataset.tabGroup
    const headGroup = document.querySelectorAll(`.ui-tab-head[data-tab-group="${tabGroup}"]`)
    const bodyGroup = document.querySelectorAll(`.ui-tab-body[data-tab-group="${tabGroup}"]`)
    const headItems = ((headGroup.length > 0) ? document.querySelectorAll(`.ui-tab-head[data-tab-group="${tabGroup}"] > .ui-tab-head__item`) : tabBlock.querySelectorAll('.ui-tab-head__item'))
    const bodyItems = ((bodyGroup.length > 0) ? document.querySelectorAll(`.ui-tab-body[data-tab-group="${tabGroup}"] > .ui-tab-body__item`) : tabBlock.querySelectorAll('.ui-tab-body__item'))
    for (const [index, button] of headItems.entries()) {
      button.addEventListener('click', (event) => {
        for (const head of headItems) {
          head.classList.remove('ui-tab-head__item--active')
        }
        for (const body of bodyItems) {
          body.classList.remove('ui-tab-body__item--active')
        }
        event.currentTarget.classList.add('ui-tab-head__item--active')
        bodyItems[index].classList.add('ui-tab-body__item--active')
      })
    }
  }
}
