<template>
  <Teleport to="body">
    <Transition>
      <div v-if="notificationData.visible" class="notification" :class="notificationData.type">
        <span :class="{notification__info_default: notificationData.type === 'default'}" class="notification__info">{{ notificationData.message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>
<script>
export default {
  props: {
    notificationData: {
      type: Object,
      require: true,
    },
  },
}
</script>
<style lang="scss" scoped>
  .notification {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    bottom: 15px;
    right: 15px;
    border-radius: 8px;
    border: 1px solid $light-gray;
    &.success {
      background: rgb(158, 234, 45) !important;
    }
    &.warn {
      background: rgb(232, 232, 38);
    }
    &.error {
      background: rgb(202, 36, 36);
    }
    &__info {
      padding: 10px 15px;
      font-size: 18px;
      color: $white;
      &_default {
        color: $mahogany;
      }
    }
  }
</style>
