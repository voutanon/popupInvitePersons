
import { inject } from 'vue'

export function basePopupFunctional() {
  const $vfm = inject('$vfm')
  function openPopup(name) {
    $vfm.show(name)
  }
  function closePopup(name) {
    $vfm.hide(name)
  }
  return {
    openPopup,
    closePopup
  }
}