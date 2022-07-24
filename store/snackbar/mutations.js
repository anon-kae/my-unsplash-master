export default {
  setSnackbar (state, { message, type = 'info', suggestedLink = '' }) {
    state.snackbar = {
      message,
      type,
      suggestedLink,
    }
  },
}
