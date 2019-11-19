<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <v-app-bar absolute color="#43a047" dark src="https://picsum.photos/1920/1080?random">
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-toolbar-title>
          <v-btn text @click="$router.push('/')">WahWheels</v-btn>
        </v-toolbar-title>

        <div class="search-wrapper" style="padding-left:300px">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <input
            type="text"
            v-model="search"
            placeholder="Search.."
            @keydown.enter="$router.push({name: 'list', query: {search: search}})"
          />
        </div>

        <v-btn color="success" @click="$router.push('/advance')">Advanced Search</v-btn>
        <v-spacer></v-spacer>
        <div class="my-2">
          <v-btn color="success" dark @click="$router.push('/add')">Sell</v-btn>
        </div>
        <div class="my-3">
          <v-btn color="success" dark>Contact Us</v-btn>
        </div>

        <div style="margin-left:10px" />
        <div id="app"></div>
      </v-app-bar>

      <v-sheet class="overflow-y-auto" style="max-height: 100vh">
        <v-container style="padding-top: 70px;">
          <router-view />
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  })
};
</script>
