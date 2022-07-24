<template>
  <v-snackbar
    v-model="isVisible"
    class="pr-0"
    :color="settings.color"
    :timeout="timeout"
    :multi-line="isMobile()"
    fixed
    top
    right>
    <div class="d-flex align-center justify-space-between">
      <v-icon color="white">
        {{ settings.icon }}
      </v-icon>
      <div class="px-2 flex-grow-1">
        <div>
          {{ message }}
        </div>
        <v-btn
          v-if="showCreateSubscriptionLink"
          :to="localePath(suggestedLink)"
          color="white"
          small
          depressed
          class="warning--text mx-0 mt-1">
          <span style="cursor: pointer">
            {{ subscribe }}
          </span>
        </v-btn>
      </div>
      <v-btn class="ml-2" text icon color="white" @click="isVisible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ComponentSnackbar',
  data () {
    return {
      isVisible: false,
      timeout: 6000,
      showCreateSubscriptionLink: false,
      suggestedLink: null,
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'snackbar/getSnackbar',
    }),
    settings () {
      const { type } = this.snackbar

      const condition = {
        error: {
          color: 'error darken-1 white--text',
          icon: 'mdi-alert-circle',
        },
        success: { color: 'success white--text', icon: 'mdi-check-circle' },
      }

      return (
        condition[type] ?? {
          color: 'primary darken-1 white--text',
          icon: 'mdi-information',
        }
      )
    },
    message () {
      return this.snackbar.message
    },
  },
  watch: {
    snackbar: {
      handler (value) {
        this.isVisible = true
        this.showCreateSubscriptionLink = !!value.suggestedLink
        this.suggestedLink = value.suggestedLink
      },
      deep: true,
    },
  },
  methods: {
    isMobile () {
      return (
        process.browser &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      )
    },
  },
}
</script>
