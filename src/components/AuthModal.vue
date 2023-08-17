<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';

const storeUser = useStoreUser()
const { errorMessage, user, loading } = storeToRefs(storeUser)
const { handleLogin, handleSignup, clearErrorMessage } = storeUser

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

function clearUserCredentialsInput() {
    userCredentials.email = ''
    userCredentials.password = ''
    userCredentials.username = ''
    clearErrorMessage()
}

async function handleOk(e){
  if(props.isLogin) {
    await handleLogin({
      password: userCredentials.password,
      email: userCredentials.email
    })
  }
  else {
    await handleSignup(userCredentials)
    }
    if(user.value) {
      clearUserCredentialsInput()
      visible.value = false
    }
};

function handleCancel() {
  clearUserCredentialsInput()
  visible.value = false
}

/*
	Keyboard Control (press enter to sign in)
  or place @keydown.enter="login(userCredentials.email, userCredentials.password, or userCredentials.username) in the input tags"
*/
  function handleKeyboard(e) {
    if (e.key === 'Enter') handleOk(userCredentials.email, userCredentials.password, userCredentials.username)
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
    })

  onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard)

  })

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
    {{ user }}
    <AModal
      v-model:visible="visible"
      :title="title"
      @ok="handleOk"
    >
      <template #footer>
        <AButton key="back" @click="handleCancel">Cancel</AButton>
        <AButton 
            :disabled="loading" 
            key="submit" 
            type="primary" 
            :loading="loading" 
            @click="handleOk"
        >
            Submit
        </AButton>
      </template>
      <div
        v-if="!loading"
        class="input-container"
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
      </div>
      <div
        v-else
        class="spinner"
      >
        <ASpin />
      </div>
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

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>


