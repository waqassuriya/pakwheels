<template>
  <!-- <v-list>
    <v-list-item-avatar>
      <v-img
        src="https://cmsimages-alt.kbb.com/content/dam/kbb-editorial/make/rolls-royce/cullinan/2019-rolls-royce-cullinan-side.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
      ></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle>
        PKR {{ item.selling_price | separator }}/=
      </v-list-item-subtitle>
      <div>{{ item.city }}</div>
      <div>Registeration City : {{ item.registeration_city }}</div>
      <div>Mileage(Kms): {{ item.mileage }}</div>
      <div>Ad Description:{{ item.ad_description }}</div>
      <div>Exterior Color:{{ item.exterior_color }}</div>
      <div>
        <Strong> {{ item.seller_name }} </Strong>
      </div>
      <div>Seller Number: {{ item.seller_num }}</div>
  </v-list-item-content>-->
  <!-- </v-list> -->

  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 12 : 2" class="mx-auto" max-width="400">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cmsimages-alt.kbb.com/content/dam/kbb-editorial/make/rolls-royce/cullinan/2019-rolls-royce-cullinan-side.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
        >
          <v-card-title>{{ item.name }}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div style="margin-bottom: 10px">
            <Strong>Selling Price:</Strong>
            <div>PKR {{ item.selling_price }}/=</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>City:</Strong>
            <div>{{ item.city }}</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Registeration City:</Strong>
            <div>{{ item.registeration_city }}</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Mileage:</Strong>
            <div>{{ item.mileage }} Kms</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Exterior Color:</Strong>
            <div>{{ item.exterior_color }}</div>
          </div>
          <div v-if="item.exterior_color==='Unlisted'" style="margin-bottom: 10px">
            <Strong>Color:</Strong>
            <div>{{ item.color }}</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Seller Name:</Strong>
            <div>{{ item.seller_name }}</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Seller Number:</Strong>
            <div>{{ item.seller_num }}</div>
          </div>
          <div style="margin-bottom: 10px">
            <Strong>Ad Description:</Strong>
            <div>{{ item.ad_description }}</div>
          </div>
        </v-card-text>

        <!-- <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>

      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-
        actions>-->
      </v-card>
    </v-card>
  </v-hover>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    item: {},
    loading: false
  }),
  async mounted() {
    this.fetchDetails();
  },
  watch: {
    "$route.params.id"() {
      this.fetchDetails();
    }
  },
  methods: {
    async fetchDetails() {
      this.loading = true;
      const id = this.$route.params.id;
      const response = await axios.get(`http://localhost:1337/wahwheels/${id}`);
      this.item = response.data;
      this.loading = false;
    }
  }
};
</script>

<style></style>
