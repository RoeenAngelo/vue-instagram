<script setup>
import Container from './Container.vue';
import { ref } from 'vue';
import Userbar from './Userbar.vue';
import ImageGallery from './ImageGallery.vue';


</script>


<template>
  <Container>
    <div class="profile-container">
      <Userbar 
        username="Roeen"
        :userInfo="{
          posts: 5,
          followers: 500,
          following: 300
        }"
      />
      <ImageGallery
        :posts="[{
          id: 1,
          image: 'https://ilovetravelingandexploring.files.wordpress.com/2014/08/surfing.jpg'
        }]"
      />
    </div>
  </Container>
</template>



<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>