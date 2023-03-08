<template>
  <BasePopup title="Invite others" :name="namePopup">
    <form class="popup__form" @submit.prevent="sentInvitedPersons()">
      <div class="popup__block">
        <input v-model="v$.person.email.$model" :class="{error: isError(v$.person.email).value}" class="popup__field" placeholder="Enter people E-mails" type="text">
        <button type="button" @click="addNewPerson()" :disabled="isError(v$.person.email).value"  class="popup__button transparant">Add</button>
      </div>
      <div class="popup__block popup__block_halfPadding">
        <span class="popup__text">or add from</span>
        <ul class="popup__emailsList">
          <li
            @click="addEmailServicePerson()"
            class="popup__emailsItem"
            v-for="email in emailsList"
            :key="email"
            :style="{backgroundImage: getImgUrl(email)}">
          </li>
        </ul>
      </div>
      <div class="popup__block">
        <InvitedPersonsList :persons="personsList" @deletePerson="deletePerson" />
      </div>
      <div class="popup__block">
        <input v-model="message" type="text" placeholder="Personal message (optional)">
      </div>
      <div class="popup__block popup__block_right">
        <span class="popup__counterRecients">{{ recipientsText }}</span>
        <button class="popup__button filled" type="submit">Send</button>
      </div>
    </form>
  </BasePopup>
  <Notification :notificationData="notificationData" />
</template>
<script>
import { ref, reactive, computed } from 'vue'
import { basePopupFunctional } from '@/composables/popup/BasePopupFunctional.js'
import { baseNotificationFunctional } from '@/composables/notification/BaseNotificationFunctional.js'
import { baseValidationFunctional } from '@/composables/validation/BaseValidationFunctional.js'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import BasePopup from "@/components/popups/BasePopup.vue"
import InvitedPersonsList from "@/components/lists/InvitedPersonsList.vue"
import Notification from "@/components/notifications/BaseNotification.vue"

export default {
  components: { BasePopup, InvitedPersonsList, Notification },
  setup() {
    const emailsList = ref([ 'AOL', 'Gmail', 'Mail', 'Yahoo'])
    function getImgUrl(email) {
      return `url(${require('@/assets/content/icons/emails/' + email + '.svg')})`
    }

    const person = reactive({
      email: null,
      name: null,
      id: null
    })
    const rules = {
      person: {
        email: { required, email }
      }
    }
    const v$ = useVuelidate(rules, { person })
    const { isError, isValid, getError, resetValidation } = baseValidationFunctional()
    class Person {
      constructor(email, name, id) {
        this.email = email,
        this.name = name,
        this.id = id
      }
    }
    const personsList = ref([
      {email: 'example@email.com', name: "", id: 0},
      {email: 'example@email.com', name: "John Wick", id: 1},
      {email: 'example@email.com', name: "Bruce Wayne", id: 2},
      {email: 'example@email.com', name: "Jose Galdino", id: 4},
      {email: 'example@email.com', name: "", id: 5},
      {email: 'example@email.com', name: "John Wick", id: 6},
    ])
    const generateID = computed(() => personsList.value.length ? personsList.value[personsList.value.length - 1].id + 1 : 0)
    async function addNewPerson() {
      if(await isValid(v$.value.person)) {
        const newPerson = new Person(person.email, person.name, generateID.value)
        personsList.value.push(newPerson)
        v$.value.person.email.$model = null
        resetValidation(v$)
      } else {
        console.error(getError(v$.value.person))
      }
    }
    function addEmailServicePerson() {
      person.email = 'example@email.com'
      person.name = 'New user'
      const newPerson = new Person(person.email, person.name, generateID.value)
      personsList.value.push(newPerson)
      v$.value.person.email.$model = null
      resetValidation(v$)
    }
    function deletePerson(id) {
      personsList.value = personsList.value.filter((person) => person.id !== id)
    }
    const recipientsCount = ref(personsList.value.length)
    const recipientsText = computed(() => recipientsCount.value !== 1 ? `${recipientsCount.value} recipients` : `${recipientsCount.value} recipient`)

    let { showNotification, notificationData } = baseNotificationFunctional()
    const message = ref('')
    const namePopup = 'inviteOtherPopup'
    const { closePopup } = basePopupFunctional()
    async function sentInvitedPersons() {
      showNotification(v$.value.person.$errors)
      closePopup(namePopup)
    }

    return {
      recipientsText,
      emailsList,
      getImgUrl,
      personsList,
      addNewPerson,
      addEmailServicePerson,
      deletePerson,
      person,
      sentInvitedPersons,
      namePopup,
      message,
      v$,
      isError,
      getError,
      resetValidation,
      notificationData
    }
  }
}
</script>
<style lang="scss" scoped>
  .vfm::v-deep {
    .vfm {
      &__content {
        max-width: 598px;
      }
    }
  }
  .popup {
    &__block {
      display: flex;
      align-items: center;
      column-gap: 12px;
      padding-top: 25px;
      width: 100%;
      max-width: 598px;
      &_right {
        justify-content: right;
        .popup {
          &__counterRecients, &__button {
            font-size: 14px;
          }
          &__counterRecients {
            padding-right: 10px;
          }
        }
      }
      &_halfPadding {
        padding-top: 15px;
      }
    }
    &__emailsList {
      display: flex;
      column-gap: 10px;
    }
    &__emailsItem {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border: 1px solid $light-gray;
      border-radius: 6px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
</style>
