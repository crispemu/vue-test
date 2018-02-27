<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Select Ad Server' },
        { value: 1, text: 'Dfa' },
        { value: 2, text: 'Dfp' },
        { value: 3, text: 'Sysmek' }
      ]
    }
  }
}
</script>