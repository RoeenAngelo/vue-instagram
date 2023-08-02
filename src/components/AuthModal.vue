<script setup>
import { ref } from 'vue';

const visible = ref(false);

const props = defineProps([
  'isLogin'
])

const title = props.isLogin ? 'Login' : 'Sign up'


function showModal() {
  visible.value = true
}

function handleOk(e){
  console.log(e)
  visible.value = false;
};

</script>

<template>
  <div>
    <AButton
      @click.prevent="showModal"
      class="btn"
      type="primary"
    >
      {{ title }}
    </AButton>
    <AModal
      v-model:visible="visible"
      :title="title"
      @ok="handleOk"
    >
      <AInput class="input" v-if="!isLogin" v-model:value="value" placeholder="username" />
      <AInput class="input" v-model:value="value" placeholder="email" />
      <AInput class="input" v-model:value="value" placeholder="password" />
    </AModal>
  </div>
</template>


<style lang="scss" scoped>
.btn {
  margin-left: 10px;
}

.input {
  margin-bottom: 5px;
}
</style>


