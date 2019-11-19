<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2" class="mx-auto">
            <v-form @submit.prevent="search">
              <div class="heading">
                <h1>Advanced Search</h1>
              </div>

              <v-card-text>
                <div>
                  <v-text-field v-model="name" label="Name" placeholder="Car Name"></v-text-field>
                </div>
                <v-text-field v-model="city" label="City" placeholder="Karachi"></v-text-field>

                <v-text-field
                  v-model="registeration_city"
                  label="Registeration City"
                  placeholder="Karachi"
                ></v-text-field>

                <v-text-field v-model="color" label="Color" placeholder="Color"></v-text-field>

                <v-text-field
                  v-model="from_price"
                  label="From Price Range"
                  placeholder="Amount in PKR"
                ></v-text-field>
                <v-text-field v-model="to_price" label="To Price Range" placeholder="Amount in PKR"></v-text-field>
              </v-card-text>
              <v-divider class="mt-12"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <div v-if="name===''"> -->
                <v-btn color="primary" text type="submit">Search</v-btn>
                <!-- </div> -->
              </v-card-actions>
            </v-form>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      city: "",
      registeration_city: "",
      color: "",
      from_price: "",
      to_price: ""
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "list",
        query: {
          name: this.name,
          city: this.city,
          registeration_city: this.registeration_city,
          color: this.color,
          from_price: this.from_price,
          to_price: this.to_price
        }
      });
    }
  }
};
</script>

<style>
</style>
