<template>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style scoped lang="scss">
@import '../../assets/colors.scss';

.error {
  color: $c-red-50;
}
</style>
