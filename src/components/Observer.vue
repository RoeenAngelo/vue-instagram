<script setup>
import { onMounted, ref} from 'vue';


const observer = ref(null)
const root = ref(null)

const emits = defineEmits(['intersect'])

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if(entry && entry.isIntersecting) {
      emits('intersect') //emit to parent component -> Cards
    }
  })

  observer.value.observe(root.value)

})
</script>

<template>
  <div ref="root" class="observer">

  </div>
</template>



<style lang="scss" scoped>
.observer {
  height: 10px;
  width: 10px;
}
</style>