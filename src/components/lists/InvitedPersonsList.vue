<template>
  <div class="personsList">
    <ul class="personsList__list">
      <template v-if="persons.length">
        <li v-for="person in persons" :key="person.id" class="personsList__item">
          <div class="personsList__block personsList__block_padding">
            <div class="personsList__data" v-if="person.name">
              <span class="personsList__title">{{ person.name }}</span>
              <span class="personsList__subTitle">{{ person.email }}</span>
            </div>
            <div class="personsList__data" v-else>
              <span class="personsList__title">{{ person.email }}</span>
            </div>
            <RoleSelect />
          </div>
          <button @click="deletePerson(person.id)" class="personsList__deleteButton"></button>
        </li>
      </template>
      <li class="personsList__item personsList__item_empty" v-else>
        <span class="personsList__subTitle">Empty list invited person</span>
      </li>
    </ul>
  </div>
</template>
<script>
import RoleSelect from '@/components/formElements/selects/RoleSelect.vue'
export default {
  props: {
    persons: {
      type: Array,
      require: true
    }
  },
  components: { RoleSelect },
  setup(props, { emit }) {
    function deletePerson(id) {
      emit('deletePerson', id)
    }
    return {
      deletePerson
    }
  },
}
</script>
<style lang="scss" scoped>
  .personsList {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    width: calc(100% + 23px + 24px);
    border-top: 1px $light-gray solid;
    border-bottom: 1px $light-gray solid;
    margin: 0 -23px 0 -24px;
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      max-height: 365px;
      height: 100%;
      overflow-y: scroll;
      padding: 0 19px 0 24px;
      margin: 15px 3px 15px 0;
    }
    &__item {
      display: flex;
      align-items: stretch;
      column-gap: 10px;
      min-height: 48px;
      &_empty {
        justify-content: center;
      }
    }
    &__block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $antique-white-dark;
      border-radius: 6px;
      width: 100%;
      &_padding {
        padding: 6px 12px;
      }
    }
    &__data {
      display: flex;
      flex-direction: column;
      column-gap: 0;
    }
    &__subTitle {
      font-size: 12px;
      line-height: 16px;
      color: $mahogany-light;
    }
    &__deleteButton {
      background-image: url('@/assets/content/icons/MinusCircle.svg');
      background-size: contain;
      background-repeat: no-repeat;
      padding: 0;
      height: 22px;
      width: 22px;
      margin: auto 0;
    }
  }
</style>
