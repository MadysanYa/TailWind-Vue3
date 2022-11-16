<template>
  <div class="container">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import 'tw-elements'


export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
  body {
    background-color: #f1f1f1;
  }
</style>
