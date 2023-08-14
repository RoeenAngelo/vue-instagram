<script setup>
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';

const storeUser = useStoreUser()
const { errorMessage, user } = storeToRefs(storeUser)
const { handleLogin, handleSignup } = storeUser

const visible = ref(false);

const props = defineProps([
  'isLogin'
])

const title = props.isLogin ? 'Login' : 'Sign up'

const userCredentials = reactive(
  {
    email: '',
    password: '',
    username: ''
  }
)

function showModal() {
  visible.value = true
}

function handleOk(e){
  handleSignup(userCredentials)
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
      <AInput
        v-if="!isLogin"
        v-model:value="userCredentials.username"
        class="input"
        placeholder="username"
      />
      <AInput
        v-model:value="userCredentials.email"
        class="input"
        placeholder="email"
        type="email"
      />
      <AInput
        v-model:value="userCredentials.password"
        class="input"
        placeholder="password"
        type="password"
      />
      <ATypographyText
        v-if="errorMessage"
        type="danger"
      >
        {{ errorMessage }}
      </ATypographyText>
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


