export default function uiTab() {
  const tabBlocks = document.querySelectorAll('.ui-tab-head')
  for (const tabBlock of tabBlocks) {
    const tabGroup = tabBlock.dataset.tabGroup
    const headGroups = document.querySelectorAll(`.ui-tab-head[data-tab-group="${tabGroup}"]`)
    const bodyGroups = document.querySelectorAll(`.ui-tab-body[data-tab-group="${tabGroup}"]`)
    for (const headGroup of headGroups) {
      const headItems = headGroup.querySelectorAll(':scope > .ui-tab-head__item')
      for (const [index, headItem] of headItems.entries()) {
        headItem.addEventListener('click', () => {
          for (const headItem of headItems) {
            headItem.classList.remove('ui-tab-head__item--active')
          }
          headItem.classList.add('ui-tab-head__item--active')
          for (const bodyGroup of bodyGroups) {
            const bodyItems = bodyGroup.querySelectorAll(':scope > .ui-tab-item')
            for (const bodyItem of bodyItems) {
              bodyItem.classList.remove('ui-tab-item--active')
            }
            bodyItems[index].classList.add('ui-tab-item--active')
          }
        })
      }
    }
  }
}
