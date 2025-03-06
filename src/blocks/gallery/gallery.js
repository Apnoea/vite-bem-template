import { Fancybox } from '@fancyapps/ui'

export default function gallery() {
  const galleryBlocks = document.querySelectorAll('.gallery')
  if (galleryBlocks) {
    for (const galleryBlock of galleryBlocks) {
      const galleryItems = galleryBlock.querySelectorAll('.gallery__item')
      for (const galleryItem of galleryItems) {
        galleryItem.dataset.fancybox = galleryBlock.dataset.fancyboxId
      }
    }
  }
  Fancybox.bind('[data-fancybox]', {
    parentEl: document.querySelector('.wrapper')
  })
}
