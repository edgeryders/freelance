<template>
  <div class="relative flex" style="min-height: 400px; overflow: visible; width: 90vw;">
    <div class="hero_about w-full bg-gray-100 p-20">
      <div class="hero_logo_wrapper">Freelance</div>
      <h1 class="text-3xl font-bold w-1/2 border-t pt-4 pr-10 mb-3 leading-tight">A network of independent freelancers supported by a community of 5000+</h1>

      <scrollactive
        class="flex flex-col"
        active-class="active"
        :offset="80"
        :duration="800"
        bezier-easing-value=".5,0,.35,1"
      >
        <a class="nav-item scrollactive-item border-b pb-3 w-1/3 pt-3 font-bold text-lg inline-block" href="#browse">
          <span class="mr-1">💼</span> Find a Freelancer</a>
        <a class="nav-item scrollactive-item border-b pb-3 w-1/3 pt-3 font-bold text-lg inline-block" href="#join">
          <span class="mr-1">📝</span> Join the Network</a>
      </scrollactive>


    </div>
    <div class="hero-image">
      <img :src="getImg('undraw_web_developer_p3e5.svg')" />
    </div>

  </div>
</template>

<script>
import moment from "moment";

export default {
  methods: {
    getImg(value) {
      return require("@/assets/" + value);
    }
  },
  computed: {
    styleObject() {
      if (this.custom.background.url) {
        return {
          background: `url('${this.custom.background.url}')`,
          backgroundPosition: "cover"
        }
      } else if (this.custom.background.color) {
        return { 
          background: this.custom.background.color 
        }
      } 
      else {
        return { background: "#efefef" }
      }
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["category", "custom", "baseUrl"]
};
</script>

<style lang="scss">

.hero_logo_wrapper {
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' version='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%236C63FF' d='M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm250 183V250H67a183 183 0 1 1 183 183z' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat 13px center #fff;
  background-size: 50px;


  display: inline-flex;
  padding: 8px 20px 8px 75px;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: #6C63FF;
  margin-bottom: 20px;
border: 5px solid #fff;
border-radius: 10px;
transform: rotate(-1deg);
box-shadow: 0 2px 7px rgba(0,0,0,.05);
}
.hero-image {
  width: 670px; 
  height: auto;
  left: 50%;
  position: absolute !important;
  top: 00px;
  z-index: 99999;
  img {
    width: 100%;
     z-index: 99999;
  }
}
</style>
