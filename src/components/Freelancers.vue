<template>
  <div class="section md:section-md" id="browse">
    <h1 class="section_title">Find a Freelancer</h1>
    <div
      class="w-full columns"
    >
    <div class="profile shadow-lg bg-white" v-for="entry in custom" :key="entry.user.username">
      <div class="flex user items-center border-b p-4">
        <div class="avatar mr-2" :style="{backgroundImage: 'url(' + entry.user.avatar_url + ')'}"></div>
        <div class="flex w-full">
          <div class="flex-col w-full">
            <div class="flex border-b w-full pb-1">
              <h3 class="text-xm font-bold">{{entry.data.account.name}} </h3>
              <span class="font-light ml-2">@{{entry.user.username}}</span>
            </div>
            <div class=" meta">
              <span class="font-light">{{ entry.data.profile.occupation }}</span> <span class="location">{{ entry.data.account.location.city }}, {{ entry.data.account.location.country }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 px-5">
        <h4 class="pb-2 border-b font-bold">Profile</h4>
        <p class="pt-2 description">{{entry.data.profile.description}}</p>
      </div>
      <div class="px-5 pb-0">
        <h4 class="pb-2 border-b font-bold">Skills</h4>
        <div class="pt-3 description inline-block">
          <p v-for="skill in entry.data.profile.skills" class="mr-2 border rounded-lg p-1 px-2 mb-2 text-xs float-left" :key="skill">{{skill}}</p>
        </div>
      </div>
      <div class="px-5 pb-0 mb-0">
        <h4 class="pb-2 border-b font-bold">Languages</h4>
        <div class="pt-3 description inline-block pb-2">
          <p v-for="language in entry.data.profile.languages" class="mr-2 border rounded-lg p-1 px-2 mb-2 text-xs float-left" :key="language">{{language.name}}</p>
        </div>
      </div>
      <div class="rate mx-5 mb-4 mt-0 inline-flex rounded-lg overflow-hidden border">
        <p class="p-2 px-3 font-light bg-gray-100 flex items-center border-r">Hourly Rate (estimate)</p>
        <p class="p-2 px-3 font-bold">€{{entry.data.profile.rate.amount}}</p>
      </div>

      <div class="footer">

        <div>View Full Profile</div>
        <div>Contact @{{entry.user.username}}</div>

      </div>

   </div>

  </div>
</div>
</template>

<script>
export default {
  props: ["custom", "html"],
  methods: {
   
  }
};
</script>
<style lang="scss">
.columns {
  column-count: 2;
}
.profile {
  border-radius: 5px;
  overflow: hidden;
  margin-top: 15px;
  width: 100%;
  display: inline-block;
}
.user {
  background: linear-gradient(180deg,hsla(0,0%,92.9%,.6),#fff);
  @apply w-full;
  .avatar {
    flex-shrink: 0;
    width: 55px;
    margin-right: 15px;
    height: 55px;
    background-size: cover;
    border-radius: 105px;
  }
}
.description {
  font-size: 14px;
}
.rate {
  font-size: 12px;
}
.location {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30'%3E%3Cpath fill='rgba(0,0,0,0)' stroke='black' stroke-width='1px' d='M18.4 6a7 7 0 00-5.7-4 8.9 8.9 0 00-1.4 0 7 7 0 00-5.7 4 7.5 7.5 0 00.4 7.4l5.2 8.1a1 1 0 001.6 0l5.2-8.1a7.5 7.5 0 00.4-7.4zM12 12a3 3 0 113-3 3 3 0 01-3 3z'/%3E%3C/svg%3E") no-repeat 5px 100%;
  background-size: 17px;
  padding: 5px 0 5px 25px;
  @apply font-light;
}
.meta {
font-size: 14px;
padding-top: 7px;
}

.footer {
  @apply flex w-full bg-gray-100 border-t;
  div {
    @apply w-full p-3 text-center font-light;
    font-size: 14px;
    &:first-child {
    @apply border-r;
  }
  }
}
</style>
