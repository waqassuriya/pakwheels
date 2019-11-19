<template>
  <v-row no-gutters>
    <v-col>
      <div class="list">
        <h1>Used Cars for sale in Pakistan | WahWheels</h1>

        <div>
          <v-card class="mx-auto" max-width="400" max-height="100%" tile>
            <div v-if="ad.length===0 && loading===false">NO RESULTS FOUND</div>
            <v-list three-line>
              <v-skeleton-loader v-if="loading" type="list-item-avatar-three-line" class="mx-auto"></v-skeleton-loader>
              <v-list-item v-for="item in ad" :key="item.id" @click="showDetails(item.id)">
                <v-list-item-avatar>
                  <v-img :src="getImageUrl(item)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>PKR {{ item.selling_price | separator }}/=</v-list-item-subtitle>
                  <div>{{ item.city }}</div>
                  <!-- <div>Registeration City : {{ item.registeration_city }}</div>
              <div>Mileage(Kms): {{ item.mileage }}</div>
              <div>Ad Description:{{ item.ad_description }}</div>
                  <div>Exterior Color:{{ item.exterior_color }}</div>-->
                  <div>
                    <Strong>{{ item.seller_name }}</Strong>
                  </div>
                  <!-- <div>Seller Number: {{ item.seller_num }}</div> -->
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    ad: [],
    loading: false
  }),
  async mounted() {
    this.fetchWheels();
  },
  watch: {
    "$route.query"() {
      this.fetchWheels();
    }
  },
  methods: {
    async fetchWheels() {
      this.loading = true;
      const query = this.$route.query;
      const params = {
        _sort: "id:DESC"
      };
      if (query.name) {
        params["name_contains"] = query.name;
      }
      if (query.city) {
        params["city_contains"] = query.city;
      }
      if (query.color) {
        params["color_contains"] = query.color;
      }
      if (query.registeration_city) {
        params["registeration_city_contains"] = query.registeration_city;
      }
      if (query.from_price) {
        params["selling_price_gte"] = query.from_price;
      }
      if (query.to_price) {
        params["to_price_lte"] = query.to_price;
      }
      const response = await axios.get("http://localhost:1337/wahwheels", {
        params
      });

      this.ad = response.data;
      this.loading = false;
    },
    showDetails(id) {
      this.$router.push(`/details/${id}`);
    },
    getImageUrl(item) {
      if (item.image) {
        return `http://localhost:1337${item.image.url}`;
      } else {
        return "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
