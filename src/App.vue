<template>
  <button class="filled" @click="openPopup('inviteOtherPopup')">Invite other</button>
  <InviteOthersPopup />
</template>

<script>
import { basePopupFunctional } from '@/composables/popup/BasePopupFunctional.js'

import InviteOthersPopup from "@/components/popups/inviteOthersPopup.vue"

export default {
  name: 'HomePage',
  components: { InviteOthersPopup },
  setup() {
    const { openPopup } = basePopupFunctional()
    return {
      openPopup,
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
