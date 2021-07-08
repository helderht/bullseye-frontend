<template>
  <div>
    <p class="text-center">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'empty',
  props: {message: {type: String, default: 'Vacio'}}
}
</script>
