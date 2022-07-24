<template>
  <v-row justify="center" align="center">
    <div v-if="error.statusCode === 404" align="center">
      <v-img
        :src="require('@/assets/images/PageNotFound.png')"
        max-width="350px" />
      <h2>
        {{ pageNotFound }}
      </h2>
      <h4>
        <nuxt-link to="/">
          Home page
        </nuxt-link>
      </h4>
    </div>
    <div v-else align="center">
      <v-img :src="require('@/assets/images/Error.png')" max-width="350px" />
      <h2>
        {{ otherError }}
      </h2>
      <p>Our experts are working to fix the issue.</p>
      <h4>
        <nuxt-link to="/">
          Home page
        </nuxt-link>
      </h4>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'Oops! Something went wrong here',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
