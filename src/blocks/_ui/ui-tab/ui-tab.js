export default function uiTab() {
  const tabBlocks = document.querySelectorAll('.ui-tab-head')
  const uniqueHeads = []
  const uniqueBodys = []
  for (const tabBlock of tabBlocks) {
    const tabGroup = tabBlock.dataset.tabGroup
    const headGroups = document.querySelectorAll(`.ui-tab-head[data-tab-group="${tabGroup}"]`)
    for (const headGroup of headGroups) {
      if (!uniqueHeads.includes(headGroup)) {
        uniqueHeads.push(headGroup)
      }
    }
    const bodyGroups = document.querySelectorAll(`.ui-tab-body[data-tab-group="${tabGroup}"]`)
    for (const bodyGroup of bodyGroups) {
      if (!uniqueBodys.includes(bodyGroup)) {
        uniqueBodys.push(bodyGroup)
      }
    }
  }
  for (const [index, uniqueHead] of uniqueHeads.entries()) {
    const headItems = uniqueHead.querySelectorAll(':scope > .ui-tab-head__item')
    for (const [innerIndex, headItem] of headItems.entries()) {
      headItem.addEventListener('click', () => {
        for (const headItem of headItems) {
          headItem.classList.remove('ui-tab-head__item--active')
        }
        headItem.classList.add('ui-tab-head__item--active')
        const bodyItems = uniqueBodys[index].querySelectorAll(':scope > .ui-tab-item')
        for (const bodyItem of bodyItems) {
          bodyItem.classList.remove('ui-tab-item--active')
        }
        bodyItems[innerIndex].classList.add('ui-tab-item--active')
      })
    }
  }
}
