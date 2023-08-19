<script setup>
import Container from './Container.vue';
import Cards from './Cards.vue';
import { ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';
import { storeToRefs } from 'pinia';
import LoginMessage from './LoginMessage.vue';

const store = useStoreUser()
const { user, loadingUser } = storeToRefs(store)


</script>


<template>
  <Container>
    <div v-if="!loadingUser">
      <Cards v-if="user"/>
      <LoginMessage v-else/>
    </div>  
    <div v-else class="timeline-spinner">
      <ASpin />
    </div>
  </Container>
</template>



<style lang="scss" scoped>

</style>