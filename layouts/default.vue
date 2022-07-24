<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <component-snackbar :style="{ left: 0, top: 0 }" />
    <v-footer color="white">
      <v-col class="text-center pa-0 transparent">
        Code By: Anon-kae,
        <strong>
          <a href="https://github.com/anon-kae">
            My github
          </a>
        </strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import ComponentSnackbar from '../components/Snackbar/Snackbar'

export default {
  name: 'DefaultLayout',
  components: { ComponentSnackbar },
  errorCaptured (error) {
    const errorHandler = async (error) => {
      const errorMessage = error.response.data.error.message
      await this.$store.dispatch('snackbar/setErrorMessage', errorMessage)
    }

    if (error && error.message) {
      errorHandler(error)
      return false
    } else if (process.env.CLIENT_NOTIFY_UI_ERROR === 'true') {
      const errorMessage = `[UI] ${error.message}`
      this.$store.dispatch('snackbar/setErrorMessage', errorMessage)
      return false
    }
  },
}
</script>
