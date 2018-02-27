<template>
  <b-container fluid>
      <b-row>
        <br>
      </b-row>
    <b-row>
        <b-col md="3" class="my-1">
            <b-form-input type="text" v-model="clientName" class="form-control"></b-form-input>
        </b-col>
        <b-col md="1" class="my-1">
            <b-button variant="primary">Search</b-button>
        </b-col>
    </b-row>
    <br />
    <b-col md="12" class="my-1">
    <b-row><h4>{{clientName}}</h4></b-row >
  </b-col>
    <br />
    <b-row>
        <b-col md="3" class="my-1">
         <b-list-group>
            <b-list-group-item button v-for="(item, index) in leftMenuList"
                v-show="item.display"
                v-bind:class="{ 'active' : isSelected(index)}"
                v-on:click="selected = index">
                {{item.text}}
              </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="9" class="my-1">
          <div v-show="selected == 0">
                <h5>Does your tag need a PID? </h5>
                <p>
                    The PID (Project ID) is a value required for survey
                    projects recruiting via Ad Recruit.
                </p>
          </div>
          <div v-show="selected == 1">
                <h5>Select the tags you need to create </h5>
              <app-checkbox :leftMenuList="leftMenuList"></app-checkbox>
          </div>
          <div v-show="selected == 2">
                <h5>Ad Server Macro Tags </h5>
              <macro-tag-grid></macro-tag-grid>
          </div>
          <div v-show="selected == 3">
                <h5>Hardcoded Tags </h5>
              <app-grid></app-grid>
          </div>

        </b-col>
    </b-row>

  </b-container>
</template>

<script>

export default {
  data () {
    return {
      client: '',
                  selected: 0,
                  itemSelected: 0,
                  selectedArray: [],
      clientName: 'Havas (1000000)',
      leftMenuList: [
            {
                text: 'Does your tags need a PID?',
                display: true,
            }, {
                text: 'What Tags do you need?',
                display: true,
            }, {
                text: 'Ad Server Macro Tags',
                display: false,
            }, {
                text: 'Hardcoded Tags',
                display: false,
            }, {
                text: 'Wrapped Video Tags',
                display: false,
            },
        ],
            tagTypeList: [{ text: "Ad Server Macro Tags", selected: false, menuOpt: 2 },
                            { text: "Hardcoded Tags", selected: false, menuOpt: 3 },
                            { text: "Wrapped Video Tags", selected: false, menuOpt: 4 },
                            { text: "vCE for Publishers", selected: false, menuOpt: -1 }],
    }
  },
  computed: {

  },
  methods: {
    isSelected: function (i) {
       return i === this.selected;
    },
    handleAll: function (index) {
                if (index == -1) {
                    this.selectAll = !this.selectAll;
                    for (var i = 0; i < this.tagTypeList.length; i++) {
                        this.tagTypeList[i].selected = this.selectAll;
                        this.handleLeftMenu(this.tagTypeList[i].menuOpt,
                                            this.tagTypeList[i].selected);
                    }
                    this.itemSelected = this.selectAll ? this.tagTypeList.length : 0;
                }
                else {
                    this.tagTypeList[index].selected ? this.itemSelected-- : this.itemSelected++;
                    this.tagTypeList[index].selected = !this.tagTypeList[index].selected;
                    this.handleLeftMenu(this.tagTypeList[index].menuOpt,
                                        this.tagTypeList[index].selected);

                    this.selectAll = this.itemSelected == this.tagTypeList.length;
                }
            },
  }
}
</script>
