<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'empty',
  props: {message: {type: String, default: 'Vacio'}}
}
</script>
