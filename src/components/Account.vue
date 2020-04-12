<template>
  <div class="section md:section-md" id="about">

    <div class="section_title flex justify-between">
    

    <h1 style="flex-shrink: 0" id="join">Join the network</h1>
        

      <div v-if="custom" class="flex items-center pb-2">
        <div class="profile_badge" style="font-size: 14px">
          <div class="avatar" :style="{ backgroundImage: 'url(' + custom.avatar + ')' }"></div>
          <p>@{{ custom.username }}</p>
        </div>
      </div>
    </div>


    <div class="flex flex-col">
      <div class="sign_in flex items-start mb-4" v-if="!custom & !newAccount">
        <a class="funnel_question" :href="loginurl">
          <h3 class="bg-white text-lg text-center p-4 py-5 font-bold border-b">
            I already have an account.
          </h3>
          <img
            style="width: 76%; margin: 20px auto"
            :src="getImg('undraw_real_time_collaboration_c62i.svg')"
          />
          <p class="p-4 border-t px-5 bg-white">
            <b>Huzzah!</b> You'll just need to login, and you'll be redirected
            to this page to fill in the form.
          </p>
        </a>

        <div class="funnel_question" @click="setNewAccount">
          <h3 class="bg-white text-center text-lg p-4 py-5 font-bold border-b">
            I'm new to Edgeryders.
          </h3>
          <img
            style="width: 70%; margin: 20px auto"
            :src="getImg('undraw_add_document_0hek.svg')"
          />

          <p class="p-4 border-t px-5 bg-white">
            <b>No problem!</b> We'll ask you a few more questions to set you up
            and you'll receive an email with your account details.
          </p>
        </div>
      </div>


      <div class="form" v-if="custom || newAccount">
        <div class="form_wrapper" :class="section">
          <div class="section" :class="{ active: section == 'zero' }">
            <div class="flex w-full justify-between border-b pb-2">
              <h4 class="font-bold text-xl">
                <span class="number">0 of 3</span> Create your account
              </h4>
            </div>

            <div class="entry">
              <p>Your name or pseudonym</p>
              <input
                v-model="form.account.name"
                class="manual w-full p-4"
                placeholder="your name or pseudonym"
              />
            </div>

            <div class="entry">
              <p class="mb-1">Your location</p>
              <p class="optional">
                This will help us connect you with people in your region
                (optional).
              </p>
              <div>
                <Multiselect
                  v-model="form.account.location"
                  id="ajax"
                  :custom-label="cityAndCountry"
                  :multiple="false"
                  :taggable="true"
                  @tag="addTag"
                  tag-placeholder="Add this location"
                  track-by="id"
                  placeholder=""
                  open-direction="bottom"
                  :options="countries"
                  :searchable="true"
                  :loading="isLoading('countries')"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="true"
                  :options-limit="300"
                  :limit="3"
                  :limit-text="limitText"
                  :max-height="600"
                  :show-no-results="false"
                  @search-change="asyncFindCountry"
                >
                  <template slot="noOptions">Start typing..</template>

                  <template slot="tag" slot-scope="{ option }"
                    ><div class="custom__location">
                      {{ option.name }}, {{ option.country }}
                    </div></template
                  >
                  <template slot="clear" slot-scope="props">
                    <div
                      class="multiselect__clear"
                      v-if="form.account.location"
                      @mousedown.prevent.stop="clearAll(props.search)"
                    ></div> </template
                  ><span slot="noResult">Oops! No cities found.</span>
                </Multiselect>
              </div>
            </div>

            <div class="entry">
              <p>Your email</p>
              <input
                class="manual username w-full p-4"
                v-model="form.account.email.text"
                @keydown.space.prevent
                @keyup="checkEmail()"
                placeholder="your email address"
                :class="{
                  available: form.account.email.isValid,
                  notavailable: form.account.email.isValid == false,
                }"
              />
            </div>

            <div class="entry">
              <p>Desired Username</p>
              <input
                class="manual username w-full p-4"
                @keydown.space.prevent
                :class="{
                  available: form.account.username.isValid,
                  notavailable: form.account.username.isValid == false,
                }"
                v-model="form.account.username.text"
                @keyup="checkUsername()"
                placeholder="check to see if your username is available."
              />
            </div>
            
            <p v-if="errors.length" class="mb-3 bg-gray-100 p-4">🧐 Please enter a valid 
              <span class="font-bold" v-for="(entry, index) in errors" :key="entry">{{entry}}<span v-if="errors.length && index < errors.length-2">, </span><span v-if="errors.length && index == errors.length-2"> &amp; </span>
              </span>
            </p>

            <div class="w-full border-t pt-4 flex justify-end">
              <div class="goto next" @click="validateForm('account')">Next</div>
            </div>
      
          </div>

          <div class="section" :class="{ active: section == 'one' }">
            <div class="flex w-full justify-between border-b pb-2">
              <h4 class="font-bold text-xl">
                <span class="number">1 of 3</span> About Yourself
              </h4>
            </div>

            <div class="entry" v-if="!newAccount">
              <p class="mb-2">Your Location</p>
              <div>
                <Multiselect
                  v-model="form.profile.location"
                  id="ajax"
                  :custom-label="cityAndCountry"
                  :multiple="false"
                  :taggable="true"
                  @tag="addTag"
                  tag-placeholder="Add this location"
                  track-by="id"
                  placeholder=""
                  open-direction="bottom"
                  :options="countries"
                  :searchable="true"
                  :loading="isLoading('countries')"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="true"
                  :options-limit="300"
                  :limit="3"
                  :limit-text="limitText"
                  :max-height="600"
                  :show-no-results="false"
                  @search-change="asyncFindCountry"
                >
                  <template slot="noOptions">Start typing..</template>

                  <template slot="tag" slot-scope="{ option }"
                    ><div class="custom__location">
                      {{ option.name }}, {{ option.country }}
                    </div></template
                  >
                  <template slot="clear" slot-scope="props">
                    <div
                      class="multiselect__clear"
                      v-if="form.profile.location"
                      @mousedown.prevent.stop="clearAll(props.search)"
                    ></div> </template
                  ><span slot="noResult">Oops! No cities found.</span>
                </Multiselect>
              </div>
            </div>
            <div class="entry">
              <p class="mb-2">What languages do you speak?</p>

              <div>
                <multiselect
                  v-model="form.profile.languages"
                  id="ajaxtwo"
                  label="name"
                  track-by="name"
                  placeholder=""
                  open-direction="bottom"
                  :options="languages"
                  :multiple="true"
                  :searchable="true"
                  :internal-search="false"
                  :clear-on-select="true"
                  :close-on-select="true"
                  :options-limit="300"
                  :max-height="600"
                  :show-no-results="false"
                  :hide-selected="false"
                  @search-change="asyncFindLanguage"
                >
                  <template slot="noOptions">Start typing..</template>
                  <template slot="tag" slot-scope="{ option, remove }"
                    ><span class="custom__tag" @click="remove(option)">
                      {{ option.name }}</span
                    ></template
                  >
                  <span slot="noResult">Oops! No languages found.</span>
                </multiselect>
              </div>
            </div>
            <div class="entry">
              <p>Provide a general description of what you do.</p>
              <textarea
                class="mt-2 border border-gray-200 w-full p-2"
                v-model="form.profile.description"
                placeholder="description"
              ></textarea>
            </div>
            <div class="entry">
              <p class="mb-2">A rough estimate of your hourly rate</p>
              <div class="flex items-center justify-start">
                <multiselect
                  v-model="form.profile.rate.currency"
                  :options="currencies"
                  :custom-label="showCurrency"
                  :searchable="false"
                  :close-on-select="true"
                  :show-labels="false"
                  placeholder="Select a currency"
                  style="flex-basis: 30%"
                  class="mr-2"
                ></multiselect>
                <multiselect
                  v-model="form.profile.rate.amount"
                  :options="rates"
                  :custom-label="showRate"
                  :searchable="false"
                  :close-on-select="true"
                  :show-labels="false"
                  placeholder="Select an hourly rate"
                  class="flex-grow"
                ></multiselect>
              </div>
            </div>
            <p v-if="errors.length" class="mb-3 bg-gray-100 p-4">🧐 Please enter a valid 
              <span class="font-bold" v-for="(entry, index) in errors" :key="entry">{{entry}}<span v-if="errors.length && index < errors.length-2">, </span><span v-if="errors.length && index == errors.length-2"> &amp; </span>
              </span>
            </p>

            <div class="flex justify-between items-center border-t pt-4">
              <div class="goto prev" @click="next('zero')">Previous</div>
              <div class="goto next" @click="validateForm('about')">Next</div>
            </div>
          </div>
          <div class="section" :class="{ active: section == 'two' }">
            <div class="flex w-full justify-between border-b pb-2">
              <h4 class="font-bold text-xl">
                <span class="number">2 of 3</span> Professional Background
              </h4>
            </div>
            <div class="entry">
              <p class="mb-2">Your Occupation</p>
              <multiselect
                v-model="form.profile.occupation"
                :options="occupations"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Select an occupation"
              ></multiselect>
            </div>

            <div class="entry">
              <p class="mb-2 pb-1 border-b">Skills</p>

              <p class="optional">List the skills related to the services you’re offering and add your experience level.</p>
    
              <VueTagsInput
                v-model="skill"
                placeholder="Add skill (press return)"
                add-on-key="[13,',',';','.']"
                :tags="skills"
                :autocomplete-items="filteredSkills"
                @tags-changed="newSkills => form.profile.skills = newSkills.map(x => x.text)"
              />
            </div>

            <div class="entry">
                <p class="mb-2">Education</p>
    
              <VueTagsInput
                v-model="school"
                placeholder="Add school, university or other institution (press return)"
                add-on-key="[13,',',';','.']"
                :tags="schools"
                @tags-changed="newSkills => form.profile.education = newSkills.map(x => x.text)"
              />

            </div>


            <div class="entry">
              <div class="flex justify-between">
                <p class="mb-2">Certification</p>
              </div>
              
              <VueTagsInput
                v-model="certificate"
                placeholder="Add diploma, degree or other certification (press return)"
                add-on-key="[13,',',';','.']"
                :tags="certificates"
                @tags-changed="newSkills => form.profile.certificates = newSkills.map(x => x.text)"
              />

            </div>

            <p v-if="errors.length" class="mb-3 bg-gray-100 p-4">🧐 Please enter a valid 
              <span class="font-bold" v-for="(entry, index) in errors" :key="entry">{{entry}}<span v-if="errors.length && index < errors.length-2">, </span><span v-if="errors.length && index == errors.length-2"> &amp; </span>
              </span>
            </p>

            <div class="flex justify-between items-center border-t pt-4">
              <div class="goto prev" @click="next('one')">Previous</div>
              <div class="goto next" @click="validateForm('work')">Next</div>
            </div>
          </div>

          <div class="section" :class="{ active: section == 'three' }">
            <div class="flex w-full justify-between border-b pb-2">
              <h4 class="font-bold text-xl">
                <span class="number">3 of 3</span> Online Presence
              </h4>
            </div>
            <div class="entry">
              <p class="mb-0">Personal Website</p>
              <input
                class="manual w-full p-4"
                placeholder="your personal site"
                v-model="form.profile.links.site"
              />
            </div>

            <div class="entry">
              <p class="mb-2">Portfolios &amp; Networks</p>
              <div class="social stack_overflow" :class="{active: social == 'stack_overflow'}"  @click="social = 'stack_overflow'"></div>
             
              <div class="social github" :class="{active: social == 'github'}" @click="social = 'github'"></div>
               <div class="social behance" :class="{active: social == 'behance'}"  @click="social = 'behance'"></div>
              <div class="social dribble" :class="{active: social == 'dribble'}" @click="social = 'dribble'"></div>

              <div class="social vimeo" :class="{active: social == 'vimeo'}"  @click="social = 'vimeo'"></div>
              <div class="social other" :class="{active: social == 'other'}"  @click="social = 'other'"></div>
  
              <div v-if="social !== ''" class="social_input">
                <input
                  class="border border-gray-200 w-full mt-4 p-2"
                  v-model="form.profile.links[social]"
                  :placeholder="social"
                  :class="social"
                />
              </div>
            </div>
            <div class="p-6 bg-gray-100 mb-4">
              <p>
                <b>That's it!</b> Click submit and your profile will be added to
                our network of freelancers.
              </p>
            </div>
            <div class="flex items-center justify-center">
              <div class="goto next" @click="submitForm">Submit</div>
              <p class="ml-2">
                <b>or</b>
                <span @click="next('two')" class="goto prev ml-2" style="color: black" 
                  >go back</span
                >
              </p>
            </div>
          </div>
          <div class="section" :class="{ active: section == 'four' }">
            
            <div class="p-4 bg-gray-100 w-full" style="height: 430px; overflow: scroll">
              <pre class="w-full">{{form}}</pre>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import VueTagsInput from '@johmun/vue-tags-input';
import ajaxFindCountry from "../helpers/cities_api";
import ajaxFindLanguage from "../helpers/languages_api";
import CryptoJS from "crypto-js";

export default {
  props: ["custom", "html"],
  data() {
    return {
      section: "one",
      loginurl: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/, //eslint-disable-line
      newAccount: false,
      errors: [],
      tags: '',
      skills: [],
      skill: '',
      school: '',
      schools: [],
      certificate: '',
      certificates: [],
      social: '',
      cities: "",
      languages: [],
      rates: [
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
      ],
      currencies: [
      "EUR", "USD", "BTC"
      ],
      suggested_skills: [
        "html",
        "css",
        "javascript",
        "photoshop",
        "copywriting",
        "translation",
        "vue",
        "react",
        "node",
        "php",
        "ruby",
        "discourse",
        "open source",
        "vector",
        "svg",
        "illustrator",
        "animation",
        "video",
        "filmmaking",
        "advertising",
        "wordpress",
        "graphic design",
        "fundraising",
        "social media",
        "facebook",
        "instagram",
        "marketing",
        "ai",
        "ethnography",
        "research"
      ],
      occupations: [
        "Sales",
        "Fundraising",
        "Digital Marketing",
        "Graphics & Design",
        "Writing & Translation",
        "Programming & Tech",
        "Music & Audio",
        "Video & Animation",
        "Social Media",
        "Building strategic partnerships",
        "Community Management",
        "Webinar & Course production",
        "Other",
      ],
      networks: [
        "dribble",
        "behance",
        "vimeo",
        "stack_overflow",
        "github",
        "other",
      ],
      network_inputs: [],
      countries: [],
      loading: null,
      form: {
        account: {
          name: '',
          username: {
            text: '',
            isValid: null
          },
          email: {
            text: '',
            isValid: null
          },
          location: ''
        },
        profile: {
          languages: [],
          location: null,
          description: '',
          rate: {
            currency: 'EUR',
            amount: ''
          },
          occupation: '',
          skills: [],
          education: [''],
          certificates: [''],
          links: {
            site: ''
          }
        }
      },
    };
  },
  methods: {
    setNewAccount() {
      this.newAccount = true;
      this.section = "zero";
    },
    getImg(value) {
      return require("@/assets/" + value);
    },
    next(value) {
      this.section = value;
    },
    validateForm(value) {
      var self = this;
      var array = [];
      if (value == 'account') {
        array = [];
        if (this.form.account.name == '') {
          array.push('name');
        }
        if (this.form.account.email.isValid !== true) {
          array.push('email');
        }
        if (this.form.account.username.isValid !== true) {
          array.push('username');
        }
        if (array.length) {
          self.errors = array;
        }
        if (array.length == 0) {
          self.errors = [];
          self.next('one');
        }
      }
      if (value == 'about') {
        array = [];
        if (this.form.profile.languages.length == 0) {
          array.push('language');
        }
        if (this.form.profile.description == '') {
          array.push('description');
        }
        if (array.length) {
          self.errors = array;
        }
        if (array.length == 0) {
          self.errors = [];
          self.next('two');
        }
      }
      if (value == 'work') {
        array = [];
        if (this.form.profile.occupation == '') {
          array.push('occupation');
        }
        if (this.form.profile.skills == '') {
          array.push('skill');
        }
        if (array.length) {
          self.errors = array;
        }
        if (array.length == 0) {
          self.errors = [];
          self.next('three');
        }
      }
    },
    submitForm(){
      this.next('four');
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.countries.push(tag);
      this.form.profile.location = tag;
      if (this.form.account) {
         this.form.account.location = tag;
      }
    },
    isLoading(value) {
      if (this.loading == value) {
        return true;
      } else {
        return false;
      }
    },
    cityAndCountry({ name, country }) {
      return `${name}, ${country}`;
    },
    showRate(value) {
      var currency = '€';
      var amount = value;
      if (this.form.profile.rate.currency == 'USD') {
        currency = '$'
        var usd_amount = value / 1.0989010989;
        amount = usd_amount.toFixed(0)
        return currency + amount + '/hr';
      }
      if (this.form.profile.rate.currency == 'BTC') {
        currency = '₿';
        amount = value / 6250;
        return currency + ' ' + amount + '/hr';
      }
      else {
        return currency + amount + '/hr';
      }
      
    },
    showCurrency(value) {
      var currency = '€ (EUR)';
      if (value == 'USD') {
        currency = '$ (USD)'
      }
      if (value == 'BTC') {
        currency = '₿ (BTC)'
      }
      return currency;
    },
    asyncFindCountry(query) {
      this.loading = "countries";
      ajaxFindCountry(query).then((response) => {
        this.countries = response;
        this.loading = null;
      });
    },
    asyncFindLanguage(query) {
      this.loading = "languages";
      ajaxFindLanguage(query).then((response) => {
        this.languages = response;
        this.loading = null;
      });
    },
    clearAll() {
      this.form.profile.countries = [];
    },
    checkEmail() {
      if (this.form.account.email.text == null || this.form.account.email.text == "") {
        this.form.account.email.isValid = null;
      } else if (!this.reg.test(this.form.account.email.text)) {
        this.form.account.email.isValid = false;
      } else {
        this.form.account.email.isValid = true;
      }
    },
    checkUsername() {
      var username = this.form.account.username.text.trim();
      var self = this;
      if (username == "") {
        self.form.account.username.isValid = null;
      }
      if (username.length < 3 && username.length > 0) {
        self.form.account.username.isValid = false;
      }
      if (username.length > 2) {
        axios
          .get("https://edgeryders.eu/u/" + username + ".json", {})
          .then(function(response) {
            window.console.log(response);
            self.form.account.username.isValid = false;
          })
          .catch(function(error) {
            window.console.log(error);
            self.form.account.username.isValid = true;
          });
      }
    },
  },
  mounted() {
  },
  computed: {
    filteredSkills() {
      return this.suggested_skills.filter(i => {
        return i.toLowerCase().indexOf(this.skill.toLowerCase()) !== -1;
      });
    },
  },
  components: {
    Multiselect,
    VueTagsInput
  },
  created() {
    var payload = "nonce=1234&return_sso_url=https://er-freelance.netlify.com";
    let base = btoa(payload);
    let res = encodeURI(base);
    let encrypted = CryptoJS.HmacSHA256(base, 'kwp49nekuqhr29nsv3jnskxgjophg28');
    this.loginurl = "https://communities.edgeryders.eu/session/sso_provider?sso=" + res + '&sig=' + encrypted;
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.funnel_question {
  @apply w-full rounded-lg overflow-hidden ml-6 ;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  transform: scale(0.9);
  &:hover {
    @apply bg-gray-100;
    transform: scale(0.95);
    cursor: pointer;
  }
}

.vue-tags-input {
  max-width: 100% !important;
  .ti-input {
  border-radius: 5px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  font-size: 18px !important;
  }
}
.profile_badge {
  @apply inline-flex items-center font-bold border border-gray-200 w-auto p-1 px-1 pr-3 rounded-lg;
  align-self: flex-start;
  flex-shrink: 0;
  .avatar {
    @apply inline-block mr-2;
    background-size: cover;
    background-position: center center;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 6px;
  }
}

.number {
  color: rgba(0, 0, 0, 0.4);
  @apply mr-1;
}

.form .multiselect input {
  padding: 0 !important;
  margin-top: 0 !important;
  padding-top: 3px !important;
}
.multiselect__tags {
  padding: 9px 40px 0 8px !important;
}

.custom__location {
  @apply pt-3 inline-block;
  background: red !important;
  margin-top: 20px !important;
}
.custom__tag {
  @apply bg-gray-200 p-1 px-2 mr-1;
  border-radius: 4px;
  &:hover {
    @apply bg-gray-300;
    cursor: pointer;
  }
}



.goto {
  @apply font-bold w-auto inline-block rounded-lg;
  width: auto;
  &.prev {
    color: rgba(0, 0, 0, 0.8);
    @apply p-2 px-3;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      color: black;
      @apply underline;
    }
  }
  &.next {
    @apply p-2 px-3;
    background: #fff;
    border: 1px solid black;
    color: black;
    &:hover {
      background: #000;
      color: white;
    }
  }
  &:hover {
    cursor: pointer;
  }
}

// .goto {
//   background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath d='M5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2a7 7 0 002 4.9l5 4.9c.3.3.4.6.4 1v6.4c0 .4.2.7.6.8l2.9.9c.5.1 1-.2 1-.8v-7.2c0-.4.2-.7.4-1l5.1-5a7 7 0 002-4.9zm-9.7-.1c-4.8 0-7.4-1.3-7.5-1.8.1-.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-.2.5-2.7 1.8-7.5 1.8z'/%3E%3Cpath d='M5268.4 2410.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1h-4.3zM5272.7 2413.7h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1zM5272.7 2417h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1 0-.5-.4-1-1-1zM39.7 42.5V30.9c0-1.3.7-2.4 1.8-3 .5-.2 1-.4 1.5-.4a3 3 0 012 .7l25.9 19.1c.8.6 1.4 1.6 1.4 2.7s-.5 2.1-1.4 2.7L45.1 71.8c-1 .8-2.4.9-3.5.3a3.4 3.4 0 01-1.8-3V57.5h-37a47.5 47.5 0 100-15h36.9z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E") no-repeat 0 3px;
//   background-size: contain;
//   width: 30px;
//   height: 34px;
//   &.prev {
//   transform: scaleX(-1);
// }
// }
.form {
  width: 100%;
  overflow: hidden;

  overflow-x: hidden;
  .form_wrapper {
    width: auto;
    display: flex;
    transition: transform 0.75s ease-in-out;
    &.one {
      transform: translateX(-50%);
    }
    &.two {
      transform: translateX(-100%);
    }
    &.three {
      transform: translateX(-150%);
    }
    &.four {
      transform: translateX(-200%);
    }
  }
  .section {
    width: 60%;
    flex-shrink: 0;
    opacity: 0.3;
    padding-left: 0 !important;
    transform: scale(0.95);
    transition: all 1s ease;
    &.active {
      opacity: 1;
      transform: scale(1);
    }
    h3 {
      @apply border-b pb-2;
    }
  }
  .entry {
    @apply my-3;
    textarea {
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    p {
      @apply font-bold;
      &.optional {
        @apply font-light mb-2;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  input.manual {
    @apply p-2 mt-2;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  input.username {
    transition: padding 0.3s ease;
    background-size: 20px !important;
    background-position: 7px 53% !important;
    background-repeat: no-repeat !important;
    &.available {
      background: url("data:image/svg+xml,%3Csvg width='801' height='801' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0h561c66 0 120 54 120 120v561c0 66-54 120-120 120H120C54 801 0 747 0 681V120C0 54 54 0 120 0zm209 458l230-231c11-11 28-11 38 0l30 29c11 11 11 28 0 38L347 574a26 26 0 01-37 0L175 439a26 26 0 010-38l29-29c11-11 28-11 38 0l87 86z' fill='%23009D6A' fill-rule='evenodd'/%3E%3C/svg%3E");
      padding-left: 35px;
      background-size: 20px;
    }
    &.notavailable {
      background: url("data:image/svg+xml,%3Csvg width='801' height='801' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0h561c66 0 120 54 120 120v561c0 66-54 120-120 120H120C54 801 0 747 0 681V120C0 54 54 0 120 0zm343.2 400.5l110.3-110.4a44.6 44.6 0 10-63-63L400 337.4l-110-110a44.6 44.6 0 10-63 63L337.4 401 227.1 511a44.6 44.6 0 1063 63l110.4-110.3 110.4 110.3a44.6 44.6 0 1063-63L463.2 400.5z' fill='%23FF4501' fill-rule='evenodd'/%3E%3C/svg%3E");
      padding-left: 35px;
      background-size: 20px;
    }
  }
}

  .add_entry, .remove_entry {
    width: 25px;
    height: 20px;
    background-size: 20px !important;
    opacity: 0.4;
    transition: opacity .5s ease;
    &:hover {
    cursor: pointer;
    opacity: 1;
  }
  }

.add_entry {
  background: url("data:image/svg+xml,%3Csvg width='96' height='96' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath d='M65.7 43.6H52.4V30.3c0-2.4-2-4.4-4.4-4.4-2.4 0-4.4 2-4.4 4.4v13.3H30.3c-2.4 0-4.4 2-4.4 4.4 0 1.2.5 2.3 1.3 3.1.8.8 1.9 1.3 3.1 1.3h13.3v13.3c0 1.2.5 2.3 1.3 3.1.8.8 1.9 1.3 3.1 1.3 2.4 0 4.4-2 4.4-4.4V52.4h13.3c2.4 0 4.4-2 4.4-4.4 0-2.4-1.9-4.4-4.4-4.4z'/%3E%3Cpath d='M48 .5C21.8.5.5 21.8.5 48S21.8 95.5 48 95.5 95.5 74.2 95.5 48 74.2.5 48 .5zm0 86.2C26.6 86.7 9.3 69.4 9.3 48 9.3 26.6 26.6 9.3 48 9.3c21.4 0 38.7 17.3 38.7 38.7 0 21.4-17.3 38.7-38.7 38.7z'/%3E%3C/g%3E%3C/svg%3E") no-repeat center center;
}
.remove_entry {
  @apply mr-1;
  background: url("data:image/svg+xml,%3Csvg width='96' height='96' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath d='M65.7 43.6H30.3c-2.4 0-4.4 2-4.4 4.4 0 1.2.5 2.3 1.3 3.1.8.8 1.9 1.3 3.1 1.3H65.7c2.4 0 4.4-2 4.4-4.4 0-2.4-1.9-4.4-4.4-4.4z'/%3E%3Cpath d='M48 .5C21.8.5.5 21.8.5 48S21.8 95.5 48 95.5 95.5 74.2 95.5 48 74.2.5 48 .5zm0 86.2C26.6 86.7 9.3 69.4 9.3 48 9.3 26.6 26.6 9.3 48 9.3c21.4 0 38.7 17.3 38.7 38.7 0 21.4-17.3 38.7-38.7 38.7z'/%3E%3C/g%3E%3C/svg%3E") no-repeat center center;
}

.social {
  width: 50px;
  height: 50px;
  border-right: 1px solid white;
  background-color: #fff;
  display: inline-block;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  transition: background-color .1s ease;
    border-radius: 3px;

  &:hover {
  cursor: pointer;
  background-color: #efefef;
}
  &.active {
  opacity: 1 !important;
  background-color: #efefef;
}
&.other {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 33.75'%3E%3Cpath d='M19.5 18c-1.12 0-2.13.42-2.91 1.1l-7.67-4.8a4.46 4.46 0 000-1.6l7.67-4.8A4.46 4.46 0 0024 4.5a4.5 4.5 0 10-8.92.8l-7.67 4.8A4.46 4.46 0 000 13.5a4.5 4.5 0 007.41 3.4l7.67 4.8A4.46 4.46 0 0019.5 27a4.5 4.5 0 000-9z'/%3E%3C/svg%3E");
  background-size: 22px !important;
  opacity: 0.5;
  background-position: 45% 70% !important;
}
&.dribble {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.2 32C.2 14.4 14.4.2 32 .2S63.8 14.5 63.8 32c0 17.6-14.2 31.8-31.8 31.8S.2 49.6.2 32zm58.7 4.4c-.9-.3-8.4-2.5-16.9-1.2 3.6 9.8 5 17.7 5.3 19.4 6-4.1 10.3-10.7 11.6-18.2zM42.6 57.1c-.4-2.4-2-10.7-5.8-20.6-.1 0-.1 0-.2.1-15.3 5.3-20.8 16-21.3 17 4.6 3.6 10.4 5.7 16.7 5.7 3.8-.1 7.4-.8 10.6-2.2zm-30.8-6.9c.6-1.1 8.1-13.4 22.1-17.9L35 32c-.7-1.5-1.4-3.1-2.2-4.6-13.6 4-26.8 3.8-28 3.8v.8c0 7 2.7 13.4 7 18.2zM5.4 26.5c1.2 0 12.4.1 25.1-3.3-4.5-8-9.4-14.7-10.1-15.7a26.72 26.72 0 00-15 19zM25.6 5.6c.8 1 5.7 7.7 10.1 15.9 9.7-3.6 13.8-9.1 14.3-9.8a26.87 26.87 0 00-24.4-6.1zm27.5 9.2c-.6.8-5.1 6.6-15.2 10.7l1.8 3.9c.2.5.4.9.6 1.4 9-1.1 18 .7 18.9.9-.1-6.3-2.4-12.2-6.1-16.9z' fill='%23121212' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-size: 28px !important;
  opacity: 0.5;
  &.active {
    background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23EA4C89' fill-rule='nonzero' cx='32' cy='32' r='32'/%3E%3Cpath d='M32 63.8C14.4 63.8.2 49.6.2 32S14.4.2 32 .2 63.8 14.5 63.8 32c0 17.6-14.2 31.8-31.8 31.8zm26.9-27.4c-.9-.3-8.4-2.5-16.9-1.2 3.6 9.8 5 17.7 5.3 19.4 6-4.1 10.3-10.7 11.6-18.2zM42.6 57.1c-.4-2.4-2-10.7-5.8-20.6-.1 0-.1 0-.2.1-15.3 5.3-20.8 16-21.3 17 4.6 3.6 10.4 5.7 16.7 5.7 3.8-.1 7.4-.8 10.6-2.2zm-30.8-6.9c.6-1.1 8.1-13.4 22.1-17.9L35 32c-.7-1.5-1.4-3.1-2.2-4.6-13.6 4-26.8 3.8-28 3.8v.8c0 7 2.7 13.4 7 18.2zM5.4 26.5c1.2 0 12.4.1 25.1-3.3-4.5-8-9.4-14.7-10.1-15.7a26.72 26.72 0 00-15 19zM25.6 5.6c.8 1 5.7 7.7 10.1 15.9 9.7-3.6 13.8-9.1 14.3-9.8a26.87 26.87 0 00-24.4-6.1zm27.5 9.2c-.6.8-5.1 6.6-15.2 10.7l1.8 3.9c.2.5.4.9.6 1.4 9-1.1 18 .7 18.9.9-.1-6.3-2.4-12.2-6.1-16.9z' fill='%23C32361'/%3E%3C/g%3E%3C/svg%3E");
  }
}
&.github {
  background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 21.7h-.1l-.1-.1V21v-2.5c0-.7-.1-1.3-.4-1.8 2.3-.4 4.8-1.6 4.8-6.1 0-1.2-.4-2.3-1.1-3.2.2-.6.3-1.7-.2-3.1l-.3-.3-.4-.1c-.6 0-1.5.2-3 1.2-.8-.1-1.7-.3-2.7-.3-1 0-1.9.1-2.8.3a5.7 5.7 0 00-3-1.1l-.4.1-.3.3a4.9 4.9 0 00-.2 3.1c-.7.9-1.1 2-1.1 3.2 0 4.4 2.6 5.6 4.8 6.1l-.3.8a2 2 0 01-.9.2c-.4 0-.8-.1-1.1-.4l-.1-.1-.2-.2-.1-.1-.1-.1c0-.1-.8-1.3-2.2-1.4-.5 0-.9.2-1 .5-.2.5.4.9.7 1.1 0 0 .6.3 1 1.4.2.7 1.1 2 3.2 2h.7v1.4l-.1.1s-.1 0 0 0C3 20.2 0 16 0 11.3a11 11 0 0111-11 11 11 0 013.5 21.4z' fill='%23000' fill-rule='nonzero'/%3E%3C/svg%3E");
  background-size: 28px;
  opacity: 0.5;
}
&.vimeo {
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='vimeo-v' class='svg-inline--fa fa-vimeo-v fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='currentColor' d='M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z'%3E%3C/path%3E%3C/svg%3E");
  background-size: 27px !important;
  opacity: 0.5;
  &.active {
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='vimeo-v' class='svg-inline--fa fa-vimeo-v fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%2319B7EA' d='M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z'%3E%3C/path%3E%3C/svg%3E");
}
}
&.stack_overflow {
  background-image: url("data:image/svg+xml,%3Csvg width='74' height='88' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath d='M62.4 79.8V56.6h7.7v30.9H.6V56.6h7.7v23.2z'/%3E%3Cpath d='M16.8 54.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zM50.7.9l-6.2 4.6 23 31 6.2-4.6-23-31zM16 72h38.6v-7.7H16V72z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 22px !important;
  opacity: 0.5;
  &.active {
  background-image: url("data:image/svg+xml,%3Csvg width='74' height='88' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath fill='%23BCBBBB' d='M62.4 79.8V56.6h7.7v30.9H.6V56.6h7.7v23.2z'/%3E%3Cpath d='M16.8 54.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zM50.7.9l-6.2 4.6 23 31 6.2-4.6-23-31zM16 72h38.6v-7.7H16V72z' fill='%23F48023'/%3E%3C/g%3E%3C/svg%3E");
}
}
&.behance {
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Ccircle fill='%23000' cx='100' cy='100' r='100'/%3E%3Cpath d='M70.6 54.7c4.4 0 8.3.4 11.9 1.1 3.5.8 6.6 2 9 3.8 2.6 1.7 4.6 4 6 6.9 1.4 2.9 2 6.4 2 10.7 0 4.5-1 8.3-3 11.4-2 3-5.2 5.5-9.2 7.5 5.6 1.6 9.7 4.4 12.5 8.4a25 25 0 014.1 14.5 23 23 0 01-9.8 20c-3 2.2-6.5 3.8-10.3 4.8-3.9 1-7.9 1.5-11.9 1.5H28V54.7h42.6zm-2.5 36.7c3.6 0 6.5-.9 8.8-2.6 2.3-1.7 3.4-4.4 3.4-8.2 0-2.1-.4-3.9-1.1-5.2a8.4 8.4 0 00-3.1-3.2c-1.3-.8-2.7-1.3-4.4-1.6-1.7-.3-3.4-.4-5.1-.4H47.9v21.2h20.2zm1.2 38.4c1.8 0 3.7-.2 5.5-.5 1.8-.4 3.4-1 4.7-2a9.7 9.7 0 003.3-3.6c.8-1.5 1.2-3.4 1.2-5.8 0-4.7-1.3-8-4-10-2.6-2-6-3-10.4-3H48v25h21.4zM129 128c2.7 2.6 6.6 4 11.7 4 3.6 0 6.7-1 9.4-2.8 2.6-1.8 4.2-3.7 4.8-5.7h15.8a30 30 0 01-11.6 16.8c-5.3 3.4-11.6 5.1-19 5.1-5.2 0-9.9-.8-14-2.5a29 29 0 01-17.2-18 40 40 0 010-27.6 32.2 32.2 0 0131.1-21 29.1 29.1 0 0124.8 12c2.7 3.7 4.6 7.8 5.8 12.5 1.2 4.6 1.6 9.5 1.3 14.6h-47.3c.2 5.8 1.7 10 4.4 12.6zm20.4-34.5c-2.2-2.4-5.5-3.6-9.9-3.6-2.9 0-5.3.5-7.1 1.5a13.7 13.7 0 00-7 8.2c-.5 1.6-.8 3-.8 4.3h29.3a21 21 0 00-4.5-10.4zm-28-34.1h36.7v10.1h-36.6V59.3z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 28px !important;
  opacity: 0.5;
  &.active {
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Ccircle fill='%230863FF' cx='100' cy='100' r='100'/%3E%3Cpath d='M70.6 54.7c4.4 0 8.3.4 11.9 1.1 3.5.8 6.6 2 9 3.8 2.6 1.7 4.6 4 6 6.9 1.4 2.9 2 6.4 2 10.7 0 4.5-1 8.3-3 11.4-2 3-5.2 5.5-9.2 7.5 5.6 1.6 9.7 4.4 12.5 8.4a25 25 0 014.1 14.5 23 23 0 01-9.8 20c-3 2.2-6.5 3.8-10.3 4.8-3.9 1-7.9 1.5-11.9 1.5H28V54.7h42.6zm-2.5 36.7c3.6 0 6.5-.9 8.8-2.6 2.3-1.7 3.4-4.4 3.4-8.2 0-2.1-.4-3.9-1.1-5.2a8.4 8.4 0 00-3.1-3.2c-1.3-.8-2.7-1.3-4.4-1.6-1.7-.3-3.4-.4-5.1-.4H47.9v21.2h20.2zm1.2 38.4c1.8 0 3.7-.2 5.5-.5 1.8-.4 3.4-1 4.7-2a9.7 9.7 0 003.3-3.6c.8-1.5 1.2-3.4 1.2-5.8 0-4.7-1.3-8-4-10-2.6-2-6-3-10.4-3H48v25h21.4zM129 128c2.7 2.6 6.6 4 11.7 4 3.6 0 6.7-1 9.4-2.8 2.6-1.8 4.2-3.7 4.8-5.7h15.8a30 30 0 01-11.6 16.8c-5.3 3.4-11.6 5.1-19 5.1-5.2 0-9.9-.8-14-2.5a29 29 0 01-17.2-18 40 40 0 010-27.6 32.2 32.2 0 0131.1-21 29.1 29.1 0 0124.8 12c2.7 3.7 4.6 7.8 5.8 12.5 1.2 4.6 1.6 9.5 1.3 14.6h-47.3c.2 5.8 1.7 10 4.4 12.6zm20.4-34.5c-2.2-2.4-5.5-3.6-9.9-3.6-2.9 0-5.3.5-7.1 1.5a13.7 13.7 0 00-7 8.2c-.5 1.6-.8 3-.8 4.3h29.3a21 21 0 00-4.5-10.4zm-28-34.1h36.7v10.1h-36.6V59.3z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E");
}
}
}

.social_input {
  background-color: #fafafa;
  border-radius:4px;
  padding: 10px 10px;
  input {
  margin: 0;
  padding-left: 35px;
  &.stack_overflow {
    background: url("data:image/svg+xml,%3Csvg width='74' height='88' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ddd' fill-rule='nonzero'%3E%3Cpath d='M62.4 79.8V56.6h7.7v30.9H.6V56.6h7.7v23.2z'/%3E%3Cpath d='M16.8 54.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zM50.7.9l-6.2 4.6 23 31 6.2-4.6-23-31zM16 72h38.6v-7.7H16V72z'/%3E%3C/g%3E%3C/svg%3E") no-repeat 10px center #fff;
    background-size: 14px !important;
  }
  &.dribble {
    background: url("data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ddd' d='M.2 32C.2 14.4 14.4.2 32 .2S63.8 14.5 63.8 32c0 17.6-14.2 31.8-31.8 31.8S.2 49.6.2 32zm58.7 4.4c-.9-.3-8.4-2.5-16.9-1.2 3.6 9.8 5 17.7 5.3 19.4 6-4.1 10.3-10.7 11.6-18.2zM42.6 57.1c-.4-2.4-2-10.7-5.8-20.6-.1 0-.1 0-.2.1-15.3 5.3-20.8 16-21.3 17 4.6 3.6 10.4 5.7 16.7 5.7 3.8-.1 7.4-.8 10.6-2.2zm-30.8-6.9c.6-1.1 8.1-13.4 22.1-17.9L35 32c-.7-1.5-1.4-3.1-2.2-4.6-13.6 4-26.8 3.8-28 3.8v.8c0 7 2.7 13.4 7 18.2zM5.4 26.5c1.2 0 12.4.1 25.1-3.3-4.5-8-9.4-14.7-10.1-15.7a26.72 26.72 0 00-15 19zM25.6 5.6c.8 1 5.7 7.7 10.1 15.9 9.7-3.6 13.8-9.1 14.3-9.8a26.87 26.87 0 00-24.4-6.1zm27.5 9.2c-.6.8-5.1 6.6-15.2 10.7l1.8 3.9c.2.5.4.9.6 1.4 9-1.1 18 .7 18.9.9-.1-6.3-2.4-12.2-6.1-16.9z' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat 10px center #fff;
    background-size: 16px !important;
  }
  &.github {
      background: url("data:image/svg+xml,%3Csvg width='22' height='22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 21.7h-.1l-.1-.1V21v-2.5c0-.7-.1-1.3-.4-1.8 2.3-.4 4.8-1.6 4.8-6.1 0-1.2-.4-2.3-1.1-3.2.2-.6.3-1.7-.2-3.1l-.3-.3-.4-.1c-.6 0-1.5.2-3 1.2-.8-.1-1.7-.3-2.7-.3-1 0-1.9.1-2.8.3a5.7 5.7 0 00-3-1.1l-.4.1-.3.3a4.9 4.9 0 00-.2 3.1c-.7.9-1.1 2-1.1 3.2 0 4.4 2.6 5.6 4.8 6.1l-.3.8a2 2 0 01-.9.2c-.4 0-.8-.1-1.1-.4l-.1-.1-.2-.2-.1-.1-.1-.1c0-.1-.8-1.3-2.2-1.4-.5 0-.9.2-1 .5-.2.5.4.9.7 1.1 0 0 .6.3 1 1.4.2.7 1.1 2 3.2 2h.7v1.4l-.1.1s-.1 0 0 0C3 20.2 0 16 0 11.3a11 11 0 0111-11 11 11 0 013.5 21.4z' fill='%23ddd' fill-rule='nonzero'/%3E%3C/svg%3E") no-repeat 10px center #fff;
    background-size: 16px !important;
  }
  &.behance {
        background: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Ccircle fill='%23ddd' cx='100' cy='100' r='100'/%3E%3Cpath d='M70.6 54.7c4.4 0 8.3.4 11.9 1.1 3.5.8 6.6 2 9 3.8 2.6 1.7 4.6 4 6 6.9 1.4 2.9 2 6.4 2 10.7 0 4.5-1 8.3-3 11.4-2 3-5.2 5.5-9.2 7.5 5.6 1.6 9.7 4.4 12.5 8.4a25 25 0 014.1 14.5 23 23 0 01-9.8 20c-3 2.2-6.5 3.8-10.3 4.8-3.9 1-7.9 1.5-11.9 1.5H28V54.7h42.6zm-2.5 36.7c3.6 0 6.5-.9 8.8-2.6 2.3-1.7 3.4-4.4 3.4-8.2 0-2.1-.4-3.9-1.1-5.2a8.4 8.4 0 00-3.1-3.2c-1.3-.8-2.7-1.3-4.4-1.6-1.7-.3-3.4-.4-5.1-.4H47.9v21.2h20.2zm1.2 38.4c1.8 0 3.7-.2 5.5-.5 1.8-.4 3.4-1 4.7-2a9.7 9.7 0 003.3-3.6c.8-1.5 1.2-3.4 1.2-5.8 0-4.7-1.3-8-4-10-2.6-2-6-3-10.4-3H48v25h21.4zM129 128c2.7 2.6 6.6 4 11.7 4 3.6 0 6.7-1 9.4-2.8 2.6-1.8 4.2-3.7 4.8-5.7h15.8a30 30 0 01-11.6 16.8c-5.3 3.4-11.6 5.1-19 5.1-5.2 0-9.9-.8-14-2.5a29 29 0 01-17.2-18 40 40 0 010-27.6 32.2 32.2 0 0131.1-21 29.1 29.1 0 0124.8 12c2.7 3.7 4.6 7.8 5.8 12.5 1.2 4.6 1.6 9.5 1.3 14.6h-47.3c.2 5.8 1.7 10 4.4 12.6zm20.4-34.5c-2.2-2.4-5.5-3.6-9.9-3.6-2.9 0-5.3.5-7.1 1.5a13.7 13.7 0 00-7 8.2c-.5 1.6-.8 3-.8 4.3h29.3a21 21 0 00-4.5-10.4zm-28-34.1h36.7v10.1h-36.6V59.3z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E") no-repeat 10px center #fff;
    background-size: 16px !important;
  }
  &.vimeo {
         background: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fab' data-icon='vimeo-v' class='svg-inline--fa fa-vimeo-v fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23ddd' d='M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z'%3E%3C/path%3E%3C/svg%3E") no-repeat 10px center #fff;
    background-size: 16px !important;
  }
  &.other {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 33.75'%3E%3Cpath fill='%23ddd' d='M19.5 18c-1.12 0-2.13.42-2.91 1.1l-7.67-4.8a4.46 4.46 0 000-1.6l7.67-4.8A4.46 4.46 0 0024 4.5a4.5 4.5 0 10-8.92.8l-7.67 4.8A4.46 4.46 0 000 13.5a4.5 4.5 0 007.41 3.4l7.67 4.8A4.46 4.46 0 0019.5 27a4.5 4.5 0 000-9z'/%3E%3C/svg%3E") no-repeat 10px 60% #fff;
    background-size: 14px !important;
}
}
}
</style>
