<template>
<div>
  <!-- Plain mode -->
  <b-form-file v-model="file" class="mt-1" placeholder="Select a File" plain></b-form-file>

</div>
</template>

<script>
export default {
  data () {
    return {
      file: null,
    }
  }
}
</script>