export default {
  setMessage ({ commit }, { message, type, suggestedLink = '' }) {
    const snackbar = { message, type }

    if (suggestedLink) {
      snackbar.suggestedLink = suggestedLink
    }

    commit('setSnackbar', snackbar)
  },
  setSuccessMessage ({ dispatch }, message) {
    dispatch('setMessage', { message, type: 'success' })
  },
  setInfoMessage ({ dispatch }, message) {
    dispatch('setMessage', { message, type: 'info' })
  },
  setErrorMessage ({ dispatch }, error) {
    dispatch('setMessage', { message: error, type: 'error' })
  },
  setPermissionErrorMessage ({ dispatch }, { error, suggestedLink }) {
    dispatch('setMessage', { message: error, type: 'error', suggestedLink })
  },
}
