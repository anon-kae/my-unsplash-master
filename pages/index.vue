<template>
  <div>
    <v-app-bar
      absolute
      class="elevation-0 mt-10"
      color="white">
      <v-spacer />
      <v-img
        max-height="150"
        max-width="150"
        contain
        :src="require('../assets/my_unsplash_logo.svg')" />
      <v-text-field
        v-model="keyword"
        outlined
        style="border-radius:12px"
        class="mt-8"
        label="Search by name"
        prepend-inner-icon="mdi-magnify"
        @change="findAll" />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-btn
        color="success"
        depressed
        style="border-radius:12px"
        class="text-none"
        large
        @click="openDialog">
        Add a photo
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <div style="margin-top: 160px">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          md="4"
          lg="4"
          xl="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="item.photoUrl" height="225px">
                <v-card-title class="justify-end">
                  <v-btn
                    :color="transparent"
                    outlined
                    depressed
                    style="border-radius:38px"
                    :class="{ 'show': hover, 'text-none': hover }"
                    @click="deletePhoto(item.id)">
                    delete
                  </v-btn>
                </v-card-title>
                <div style="position: absolute;top: 160px; color: transparent">
                  <v-card-text class="font-weight-bold">
                    <h1 :class="{ 'show': hover, 'white--text': hover }">
                      {{ item.label }}
                    </h1>
                  </v-card-text>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            Add a new photo
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-0">
                <p class="ma-0">
                  Label
                </p>
                <v-text-field
                  v-model="photo.label"
                  outlined
                  style="border-radius:12px" />
              </v-col>
              <v-col cols="12" class="pa-0">
                <p class="ma-0">
                  Photo URL
                </p>
                <v-text-field
                  v-model="photo.photoUrl"
                  outlined
                  style="border-radius:12px" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="#BDBDBD"
            class="text-none"
            text
            @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            depressed
            class="text-none"
            color="success"
            @click="onCreate">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      transparent: 'rgba(255, 255, 255, 0)',
      keyword: '',
      dialog: false,
      items: [],
      photo: {}
    }
  },
  async mounted () {
    await this.findAll();
  },
  methods: {
    openDialog () {
      this.dialog = true;
    },
    async deletePhoto (id) {
      await this.$api.uploadService.deletePhoto(id)
      await this.$store.dispatch('snackbar/setSuccessMessage', 'Delete photo success!')
      await this.findAll();
    },
    async onCreate () {
      const { photoUrl } = this.photo
      const valid = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)$/g.test(photoUrl)
      if (!valid) {
        await this.$store.dispatch('snackbar/setErrorMessage', 'Photo URL not match pattern!')
      }

      await this.$api.uploadService.createPhoto(this.photo)
      await this.$store.dispatch('snackbar/setSuccessMessage', 'Create photo success!')
      await this.findAll();
      this.dialog = false;
      this.photo = {}
    },
    async findAll () {
      const { result: { photos } } = await this.$api.uploadService.findAll({ keyword: this.keyword, page: 1, size: 50 })
      this.items = photos
    }
  },
}
</script>

<style>
.show {
  color: #EB5757 !important;
}
</style>
