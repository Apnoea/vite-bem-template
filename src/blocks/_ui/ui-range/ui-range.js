import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

export default function uiRange() {
  const rangeBlocks = document.querySelectorAll(('.ui-range'))
  if (rangeBlocks) {
    for (const rangeBlock of rangeBlocks) {
      const rangeBody = rangeBlock.querySelector('.ui-range__body')
      const startValue = rangeBlock.dataset.start.split(',')
      const connectValue = startValue.length === 1 ? 'lower' : true
      const stepValue = Number(rangeBlock.dataset.step)
      const stepMin = Number(rangeBlock.dataset.min)
      const stepMax = Number(rangeBlock.dataset.max)
      noUiSlider.create(rangeBody, {
        start: startValue,
        connect: connectValue,
        step: stepValue,
        range: {
          min: stepMin,
          max: stepMax
        },
        format: wNumb(
          {
            decimals: 0,
            thousand: ' '
          }
        )
      })

      const rangeValues = [
        rangeBody.parentElement.querySelector('.ui-range__lower'),
        rangeBody.parentElement.querySelector('.ui-range__upper')
      ]
      rangeBody.noUiSlider.on('update', function (values, handle) {
        rangeValues[handle].innerHTML = values[handle]
      })
    }
  }
}
