<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import {RouterLink, useRouter} from "vue-router"
import { useStoreUser } from "../stores/storeUser";
import AuthModal from "./AuthModal.vue";
import Container from "./Container.vue";

const storeUser = useStoreUser()
const { user, loadingUser } = storeToRefs(storeUser)


const router = useRouter()
const searchUsername = ref('')


function onSearch() {
	if (searchUsername.value) {
		router.push(`/profile/${searchUsername.value}`)
	}
}

async function handleLogout() {
	await storeUser.handleLogout()
}

function goToOwnProfile() {
	router.push(`/profile/${user.value.username}`)
}

</script>

<template>
	<ALayoutHeader>
		<Container>
			<div class="nav-container">
				<div class="left-content">
					<RouterLink to="/">InstaVue</RouterLink>
					<AInputSearch
					v-model:value="searchUsername"
					placeholder="search username..."
					style="width: 200px"
					@search="onSearch"
					/>
				</div>
				<div v-if="!loadingUser" class="container-right-content">
					<div v-if="!user" class="right-content">
						<AuthModal :isLogin="false"/>
						<AuthModal :isLogin="true"/>
					</div>
					<div v-else class="right-content">
						<AButton @click="goToOwnProfile" type="primary">Profile</AButton>
						<AButton @click="handleLogout" type="primary">Logout</AButton>
					</div>
				</div>
			</div>
		</Container>
	</ALayoutHeader>
</template>

<style lang="scss" scoped>
.nav-container {
	display: flex;
	justify-content: space-between;
}

.left-content {
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		margin-right: 10px
	}
}

.container-right-content {
	display: flex;
	align-items: center;
}
.right-content {
	display: flex;
	justify-content: center;
	align-items: center;
	
	button {
		margin-left: 10px;
	}
}


</style>