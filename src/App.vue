<script setup>
import {onMounted} from "vue"
import Nav from "@/components/Nav.vue"
import { RouterView } from "vue-router"
import { useStoreUser } from "./stores/storeUser";

const storeUser = useStoreUser()
const { getUser } = storeUser

onMounted(() => getUser() )

</script>

<template>
    <Nav />
    <RouterView />
</template>

<style scoped>


</style>
