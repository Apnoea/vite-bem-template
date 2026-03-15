export default function uiTab() {
  const tabBlocks = document.querySelectorAll('.ui-tab-head')
  const uniqueHeads = new Set()
  const uniqueBodys = new Set()
  for (const tabBlock of tabBlocks) {
    const tabGroup = tabBlock.dataset.tabGroup
    const headGroups = document.querySelectorAll(`.ui-tab-head[data-tab-group="${tabGroup}"]`)
    const bodyGroups = document.querySelectorAll(`.ui-tab-body[data-tab-group="${tabGroup}"]`)
    for (const headGroup of headGroups) uniqueHeads.add(headGroup)
    for (const bodyGroup of bodyGroups) uniqueBodys.add(bodyGroup)
  }
  for (const [index, uniqueHead] of Array.from(uniqueHeads).entries()) {
    const headItems = uniqueHead.querySelectorAll(':scope > .ui-tab-head__item')
    const bodyItems = Array.from(uniqueBodys)[index].querySelectorAll(':scope > .ui-tab-item')

    for (const [innerIndex, headItem] of Array.from(headItems).entries()) {
      headItem.addEventListener('click', () => {
        headItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
        for (const headItem of headItems) {
          headItem.classList.remove('ui-tab-head__item--active')
        }
        headItem.classList.add('ui-tab-head__item--active')
        for (const bodyItem of bodyItems) {
          bodyItem.classList.remove('ui-tab-item--active')
        }
        bodyItems[innerIndex].classList.add('ui-tab-item--active')
      })
    }
  }
}
