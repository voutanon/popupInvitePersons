<template>
  <vue-final-modal class="popup" v-model="showPopup" :name="name">
    <div class="popup__header">
      <h2 class="popup__title">{{ title }}</h2>
      <button class="popup__closeButton" @click="closePopup(name)"></button>
    </div>
    <slot></slot>
  </vue-final-modal>
</template>
<script>
import { basePopupFunctional } from '@/composables/popup/BasePopupFunctional.js'
import { ref } from 'vue'
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    const { closePopup } = basePopupFunctional()
    const showPopup = ref(false)
    return {
      showPopup,
      closePopup
    }
  },
}
</script>
<style scoped lang="scss">
  .popup {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    &__title {
      font-family: 'Open Sans';
      font-weight: 600;
      font-size: 24px;
      color: $mahogany;
    }
    &__closeButton {
      background-image: url('@/assets/content/icons/Сross.svg');
      background-repeat: no-repeat;
      background-size: cover;
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
</style>
