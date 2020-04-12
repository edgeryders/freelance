<template>
  <div class="flex flex-col w-full">
    <Nav style="margin-bottom: 60px" :data="navItems" />

    <Hero :baseUrl="data.baseUrl" :custom="getSectionData('hero')"/>
    
    <Freelancers :custom="profiles" />

    <div v-for="section in data.sections" :key="section.title" :id="section.id">
      <Account v-if="section.type == 'account'" :custom="account" />
    </div>

    <Terms />
  </div>
</template>

<script>
import data from "@/data/config.json";

import Nav from "@/components/Navigation.vue";
import Hero from "@/components/Hero.vue";
import Account from "@/components/Account.vue";
import Freelancers from "@/components/Freelancers.vue";
import Terms from "@/components/Terms.vue";

import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      data,
      category: { users: [] },
      categories: [],
      sections: null,
      account: null,
      profiles: []
    };
  },
  components: {
    Account,
    Hero,
    Nav,
    Freelancers,
    Terms
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('sso')) {

      let myParam = urlParams.get('sso');
      let account = atob(myParam);

      let accountParams = new URLSearchParams(account);
      var external_id = Number(accountParams.get('external_id'));
      var user_avatar = accountParams.get('avatar_url');
      var user_name = accountParams.get('username');

      var self = this;
      axios.get("https://edgeryders.eu/users/by-external/" + external_id + ".json").then(function(response) {
        var obj = {
          avatar: user_avatar,
          email: accountParams.get('email'),
          external_id: external_id,
          id: response.data.user.id,
          username: user_name,
          name: response.data.user.name,
          last_posted: response.data.user.last_posted_at,
          last_seen: response.data.user.last_seen_at,
          since: response.data.user.created_at,
          location: response.data.user.location,
          bio: response.data.user.bio_raw
        }
        self.account = obj
      })

    }

    axios.get(
      `https://edgeryders.eu/webkit_components/topics.json?serializer=event&tags=er-freelancer`
    ).then(({ data }) => {
      this.profiles = data.map(post => this.getProfile(post));
    });

    this.sections = this.data.sections;
  },
  methods: {
    getSectionData(type) {
      return this.sections.find(section => section.type === type) || {};
    },
    getProfile(post) {
      var obj = {
        user: '',
        data: ''
      }
      obj.user = post.author;
      obj.data = this.getJson(post.cooked);
      return obj
    }
  },
  computed: {
    navItems() {
      var navArray = this.sections.map(function(el) {
              if (el.id) {
                return {
                  title: el.title,
                  id: el.id,
                } 
              }
            });
      return navArray.filter(function (el) {
          return el != null;
      });
    }
  }
};
</script>
