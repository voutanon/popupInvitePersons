import { ref } from 'vue'

export function baseValidationFunctional() {
  function isError (validationModel) {
    return ref(!!validationModel.$errors.length)
  }
  async function isValid(validationModel) {
    return await validationModel.$validate()
  }
  function getError (validationModel) {
    if(validationModel.$errors.length) return ref(validationModel.$errors.$message)
    return ref('')
  }
  function resetValidation(validationData) {
    validationData.value.$reset()
  }
  return {
    isError,
    isValid,
    getError,
    resetValidation
  }
}