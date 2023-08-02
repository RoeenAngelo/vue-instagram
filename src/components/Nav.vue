<script setup>
import { ref } from "vue";
import {RouterLink, useRouter} from "vue-router"
import AuthModal from "./AuthModal.vue";
import Container from "./Container.vue";


const router = useRouter()
const searchUsername = ref('')

const isAuthenticated = ref(true)


function onSearch() {
	if (searchUsername.value) {
		router.push(`/profile/${searchUsername.value}`)
	}
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
				<div
					v-if="!isAuthenticated"
				  class="right-content"
				>
					<AuthModal :isLogin="false"/>
					<AuthModal :isLogin="true"/>
				</div>
				<div
					v-else
				  class="right-content"
				>
					<AButton type="primary">Profile</AButton>
					<AButton type="primary">Logout</AButton>
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
.right-content {
	display: flex;
	justify-content: center;
	align-items: center;
	
	button {
		margin-left: 10px;
	}
}
</style>