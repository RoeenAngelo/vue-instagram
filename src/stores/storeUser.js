import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useStoreUser = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('')
  const loading = ref(false) //Activates the spinner ASpin from Antd

  //prevent the SignUp and Profile buttons or any unwanted component from rendering while fetching for logged in user
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

  async function handleLogin(credentials) {

    const { email, password } = credentials

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is Invalid"
    }
    if(!password.length) {
      return errorMessage.value = "Please enter password"
    }

    loading.value = true

    // Sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    // Fetch user data
    const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single()
    
    // Update user state
    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id
    }

    loading.value = false
    errorMessage.value = ''
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

    loading.value = true

    // Validate if user exists
    const { data: userWithUsername } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single()

    if(userWithUsername){
      loading.value = false
      return errorMessage.value = 'Username already exists'
    }

    errorMessage.value = ''

    const {error} = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      loading.value = false
      return errorMessage.value = error.message
    }
    
    // Add user details to user table
    await supabase.from('users').insert({
      email,
      username
    });

    // Update user state
    const { data: newUser } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false

  }  

/*
  Logout
*/
  async function handleLogout() {
    await supabase.auth.signOut()
    user.value = null
  }  

/*
  Get Logged In User
*/
  async function getUser() {

    loadingUser.value = true

    // Fetch user data from Auth
    const { data } = await supabase.auth.getUser()

    // Reset these states if user is logged out
    if(!data.user) {
      loadingUser.value = false
      return user.value = null
    }

    // Fetch user data from user table
    const { data: userWithEmail } = await supabase
    .from('users')
    .select()
    .eq('email', data.user.email)
    .single()
    
    // Update user state
    user.value = {
      email: userWithEmail.email,
      username: userWithEmail.username,
      id: userWithEmail.id,
    }

    loadingUser.value = false
  }  

/*
  Clear Error Message
*/
  function clearErrorMessage() {
    errorMessage.value = ''
  }

  return { 
    user,
    handleLogin,
    handleLogout,
    getUser,
    handleSignup,
    errorMessage,
    clearErrorMessage,
    loading,
    loadingUser
  }
})