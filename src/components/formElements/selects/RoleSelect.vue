<template>
  <div class="roleSelect">
    <span @click.stop="showListRole = !showListRole" :class="{active: showListRole}" class="roleSelect__current">{{ activeRole.value }}</span>
    <ul v-click-away="onClickAway" v-show="showListRole" class="roleSelect__list">
      <li @click="setActiveRole(role.id)" class="roleSelect__item" v-for="role in roles" :key="role.id">
        <img v-show="isCurrentRole(role.id)" class="roleSelect__active" src="@/assets/content/icons/CheckMark.svg" alt="">
        <div class="roleSelect__contend">
          <span class="roleSelect__name">{{ role.title }}</span>
          <p class="roleSelect__description">{{ role.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const roles = ref([
      {
        id: 1,
        title: 'Guest',
        description: 'Default access level, can leave tributes, share media and stories',
        value: 'Guest'
      },
      {
        id: 2,
        title: 'Administrator',
        description: 'Can control all aspects of the website, including moderating content posted by others and changing website settings',
        value: 'Admin'
      }
    ])
    const showListRole = ref(false)
    const activeRole = ref(roles.value[0])
    const isCurrentRole = (id) => activeRole.value.id === id
    function setStatusShow (value) {
      showListRole.value = value
    }
    function setActiveRole(id) {
      const currentRole = roles.value.find(role => role.id === id)
      activeRole.value = currentRole
      setStatusShow(false)
    }
    const onClickAway = () => {
      setStatusShow(false)
    }
    return {
      roles,
      activeRole,
      showListRole,
      setStatusShow,
      setActiveRole,
      isCurrentRole,
      onClickAway
    }
  },
}
</script>
<style lang="scss" scoped>
  .roleSelect {
    position: relative;
    padding-right: 7px;
    &__current {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      z-index: 0;
      font-size: 15px;
      &::after {
        content: '';
        display: block;
        background-image: url('@/assets/content/icons/ArrowShort.svg');
        background-repeat: no-repeat;
        background-position: center;
        width: 9px;
        height: 5px;
        padding-right: 5px;
        transition: 0.5s all;
        transform: rotate(180deg);
      }
      &.active::after {
        transform: rotate(0deg);
        transition: 0.5s all;
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.16);
      border-radius: 6px;
      background: $antique-white;
      position: absolute;
      z-index: 1;
      top: 100%;
      right: 0;
      padding: 4px 0;
      width: 318px;
      overflow: visible;
    }
    &__item {
      position: relative;
      display: flex;
      cursor: pointer;
      transition: 0.5s all;
      padding: 0 16px 0 48px;

      &:hover {
        transition: 0.5s all;
        background: $antique-white-dark;
      }
    }
    &__contend {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
    &__active {
      position: absolute;
      top: 6px;
      left: 20px;
    }
  }
</style>
