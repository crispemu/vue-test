<template>
  <div>
    <b-form-group label="">
      <b-form-checkbox-group stacked v-model="selected" name="flavour" :options="optionList">
      </b-form-checkbox-group>
    </b-form-group>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>

</template>

<script>
export default {
  props: ['optionList' ],
  created() {
  },
  data () {
    return {
      selected: [], 
    }
  },
  methods: {
    /*onClickButton (event) {
      this.$emit('clicked', this.selected)
    }*/
  },
  watch: {
    selected () {
      this.$emit('clicked', this.selected)
    }
  },
}
</script>
