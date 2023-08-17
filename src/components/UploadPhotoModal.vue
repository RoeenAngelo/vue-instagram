<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';
import { supabase } from '../supabase';

const store = useStoreUser()
const { user, loading, errorMessage } = storeToRefs(store)

const props = defineProps(['addNewPost'])

const visible = ref(false);
const caption = ref('')
const file = ref(null)

function showModal() {
  visible.value = true;
};

async function handleOk() {

  loading.value = true

  const fileName = Math.floor(Math.random() * 1000000000000)
  
  let filePath

  if(file.value) {

    // Add photo to images storage
    const { data, error } = await supabase.storage.from('images').upload('public/' + fileName, file.value)
    
    filePath = data.path

    console.log(filePath)
    if(error) {
      loading.value = false
      errorMessage.value = 'Image upload failed'
    }

    // Add data to posts table
    await supabase.from('posts').insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id 
    })
  }

  loading.value = false
  visible.value = false
  caption.value = ''

  // Use this function from Profile -> Userbar to add the post in the beginning of the posts array
  props.addNewPost({
      url: filePath,
      caption: caption.value,
    })
};

function handleUploadChange(e) {
  if(e.target.files[0]) {
    file.value = e.target.files[0]
  }
}

</script>


<template>
  <div>
    <AButton  @click="showModal">Upload Photo</AButton>
    <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input
          @change="handleUploadChange"
          accept=".jpeg, .png, .jpg"
          type="file"
        >
        <AInput
          v-model:value="caption"
          placeholder="Caption..."
          :maxLength="50"
        />
        <ATypographyText
          v-if="errorMessage"
          type="danger"
        >
          {{ errorMessage }}
        </ATypographyText>
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>
    </AModal>
  </div>
</template>


<style lang="scss" scoped>
input{
  margin-top: 10px;
}
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

 