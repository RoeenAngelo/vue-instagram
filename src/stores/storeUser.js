import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"
import { message } from 'ant-design-vue';

export const useStoreUser = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('')
  const loading = ref(false)
  const loadingUser = ref(false)

/*
  Validate Email
*/

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


/*
  Login
*/

  function handleLogin() {
    
  }

/*
  Sign up
*/  
  async function handleSignup(credentials) {
    const { email, password, username } = credentials

    if(password.length < 6) {
      return errorMessage.value = "Password should be at least 6 characters long."
    }

    if(username.length <4) {
      return errorMessage.value = "Username should be at least 4 characters long."
    }

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is Invalid"
    }

    errorMessage.value = ''


    // Validate if user exists
    const { data: usernameAlreadyExists } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single()
  
    const {error} = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      return errorMessage.value = error.message
    }
    
    // Add user details to user table
    await supabase.from('users').insert({
      email,
      username
    });


  }  

/*
  Logout
*/
  function handleLogout() {
    
  }  

/*
  Get User
*/
  function getUser() {
    
  }  

  return { 
    user,
    handleLogin,
    handleLogout,
    getUser,
    handleSignup,
    errorMessage
  }
})