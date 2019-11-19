<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2" class="mx-auto">
            <v-card>
              <v-form ref="form">
                <div class="heading">
                  <h1>Car Information</h1>
                  <h3>(All fields marked with * are mandatory)</h3>
                </div>

                <v-alert v-if="hasErrors" dense outlined type="error">Please fill in all fields.</v-alert>

                <v-card-text>
                  <v-text-field
                    ref="name"
                    v-model="name"
                    :rules="[() => !!name || 'This field is required']"
                    label="Name*"
                    placeholder="Car Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    ref="city"
                    v-model="city"
                    :rules="[() => !!city || 'This field is required']"
                    label="City*"
                    placeholder="Karachi"
                    required
                  ></v-text-field>

                  <v-text-field
                    ref="Registeration City"
                    v-model="registeration_city"
                    :rules="[
                    () => !!registeration_city || 'This field is required'
                  ]"
                    label="Registeration City*"
                    placeholder="Karachi"
                    required
                  ></v-text-field>

                  <v-text-field
                    ref="mileage"
                    v-model="mileage"
                    :rules="[() => !!name || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Mileage (Kms)*"
                    placeholder="Mileage in Kms*"
                    required
                  ></v-text-field>
                  <v-text-field
                    ref="ad_description"
                    v-model="ad_description"
                    :rules="[
                    () => !!ad_description || 'This field is required',
                    () =>
                      (!!ad_description && ad_description.length <= 250) ||
                      'Ad Description must be less than 250 characters'
                  ]"
                    label="Ad Description*"
                    placeholder="Describe your car"
                    counter="250"
                    required
                  ></v-text-field>

                  <v-select
                    class="exterior_color"
                    :items="items"
                    label="Exterior Color"
                    v-model="exterior_color"
                    required
                    :rules="[() => !!exterior_color || 'This field is required']"
                  ></v-select>

                  <v-text-field
                    v-if="exterior_color==='Unlisted'"
                    ref="Color"
                    v-model="color"
                    :rules="[() => !!color || 'This field is required']"
                    label="Color*"
                    required
                    placeholder="Color"
                  ></v-text-field>

                  <v-text-field
                    ref="selling_price"
                    v-model="selling_price"
                    :rules="[() => !!selling_price || 'This field is required']"
                    label="Expected Selling Price*"
                    required
                    placeholder="Amount in PKR"
                  ></v-text-field>
                  <v-file-input
                    v-model="files"
                    placeholder="Your Car Pictures"
                    label="Upload Pictures"
                    prepend-icon="mdi-paperclip"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label color="primary">{{ text }}</v-chip>
                    </template>
                  </v-file-input>

                  <v-row>
                    <v-col>
                      <v-card>
                        <div class="heading">
                          <h1 style="margin-bottom: 10px">Seller Information</h1>
                        </div>

                        <v-text-field
                          outlined
                          label="Seller Name"
                          prepend-inner-icon="mdi-account"
                          :rules="[() => !!seller_name || 'This field is required']"
                          v-model="seller_name"
                        ></v-text-field>
                        <v-text-field
                          outlined
                          label="Mobile Number"
                          prepend-inner-icon="mdi-phone"
                          :rules="[() => !!seller_num || 'This field is required']"
                          v-model="seller_num"
                        ></v-text-field>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <div v-if="name===''"> -->
                  <v-btn color="primary" text @click="saveAd">Submit & Continue</v-btn>
                  <!-- </div> -->
                </v-card-actions>
              </v-form>
            </v-card>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    files: [],
    hasErrors: false,
    errorMessages: "",
    name: "Asdasd",
    registeration_city: "Asdasd",
    ad_description: "asdasdasd",
    city: "Asdasd",
    mileage: "123123123",
    selling_price: "123123",
    exterior_color: "White",
    seller_name: "Asdasd",
    seller_num: "11122333",
    color: null,
    items: [
      "White",
      "Silver",
      "Black",
      "Grey",
      "Blue",
      "Green",
      "Red",
      "Gold",
      "Maroon",
      "Beige",
      "Pink",
      "Brown",
      "Burgundy",
      "Yellow",
      "Bronze",
      "Purple",
      "Turquoise",
      "Orange",
      "Indigo",
      "Magenta",
      "Navy",
      "Unlisted"
    ],
    loading: false
  }),

  watch: {
    city() {
      this.errorMessages = "";
    }
  },

  methods: {
    async saveAd() {
      this.hasErrors = false;
      // if (this.name === null && true) {
      //   this.hasErrors = true;
      if (this.$refs.form.validate() === false) {
        this.hasErrors = true;
      } else {
        this.loading = true;
        const formData = new FormData();

        if (this.files) {
          formData.append("files.image", this.files);
        }

        formData.append(
          "data",
          JSON.stringify({
            registeration_city: this.registeration_city,
            ad_description: this.ad_description,
            city: this.city,
            mileage: this.mileage,
            selling_price: this.selling_price,
            name: this.name,
            exterior_color: this.exterior_color,
            seller_name: this.seller_name,
            seller_num: this.seller_num,
            color: this.color
          })
        );

        await axios.post("http://localhost:1337/wahwheels", formData);

        // this.loading = false;
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.heading {
  padding-left: 10px;
}
</style>
