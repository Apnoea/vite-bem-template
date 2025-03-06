import { Fancybox } from '@fancyapps/ui'

export default function popup() {
  Fancybox.bind('[data-popup]', {
    parentEl: document.querySelector('.wrapper'),
    dragToClose: false
  })
}
