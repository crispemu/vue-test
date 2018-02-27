<template>
  <b-container fluid>
     <b-row>
      <b-input-group-button>
        <b-btn @click="addRow()">Add Tag</b-btn>
        </b-input-group-button>
      </b-row>
    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields">

      <template slot="ad_server" slot-scope="row">
          <app-combo></app-combo>
      </template>
      <template slot="configuration" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm"  @click.stop="configModal(row.item, row.index, $event.target)" class="mr-1 configButton">
          Edit 
        </b-button>
        <div class="configDetail">
          {{ arraySelected[row.index].serverSelected }} 
          {{ arraySelected[row.index].preferenceSelected}} 
          {{ arraySelected[row.index].tagSelected}}
        </div>
      </template>
      <template slot="results" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="documentModal(row.item, row.index, $event.target)" class="mr-1">
          Document
        </b-button>
      </template>
      <template slot="action" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click="deleteRow(row.item, row.index, $event.target)" class="mr-1">
          Remove
        </b-button>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal id="modalConfig" @hide="resetModal" @show="showModal" @ok="modalOk" :title="modalInfo.title" ok-only>
      <b-row>
        <b-col md="6" class="my-1">
        <div>
          <b-form-group label="">
            <b-form-checkbox-group stacked v-model="serverSelected" name="server_check" :options="serverTypeList">
            </b-form-checkbox-group>
          </b-form-group>
          <div>Selected: <strong>{{ serverSelected }}</strong></div>
        </div>
        
        <br>
        <div>
          <b-form-group label="">
            <b-form-checkbox-group stacked v-model="preferenceSelected" name="server_check" :options="preferenceList" >
            </b-form-checkbox-group>
          </b-form-group>
          <div>Selected: <strong>{{ preferenceSelected }}</strong></div>
        </div>
      </b-col>
      <b-col md="6" class="my-1">
        <div>
          <b-form-group label="">
            <b-form-checkbox-group stacked v-model="tagSelected" name="server_check" :options="tagTypeList" >
            </b-form-checkbox-group>
          </b-form-group>
          <div>Selected: <strong>{{ tagSelected }}</strong></div>
        </div>
      </b-col>
    </b-row>
    </b-modal>

    <b-modal id="modalDocument" @hide="resetModal" :title="modalInfo.title" ok-only>
      <b-row>
        <b-col md="6" class="my-1">

          <b-form-group label="">
            <b-form-radio-group v-model="selected"
                                :options="docOptionList"
                                stacked
                                name="radiosStacked">
            </b-form-radio-group>
          </b-form-group>
              <div class="mt-3">
            Selected: <strong>{{ selected }}</strong>
          </div>

      </b-col>
      <b-col md="6" class="my-1">
        <ul class="list-group list-border">
          <li class="list-group-item"></li>
          <li class="list-group-item"><b-form-input type="text" v-show="selected=='include'"></b-form-input></li>
          <li class="list-group-item"><b-form-input type="text" v-show="selected=='create'"></b-form-input></li>
        </ul>
      </b-col>
    </b-row>
    </b-modal>

  </b-container>
</template>

<script>

export default {
  data () {
    return {
      items: [],
      arraySelected: [],
      serverSelected: ["",""],
      preferenceSelected: [],
      tagSelected: [],
      rowSelected: 0,
      selected: 'master',
      fields: [
        { key: 'ad_server', label: 'Ad Server' },
        { key: 'configuration', label: 'Configurtion' },
        { key: 'results', label: 'Results' },
        { key: 'action', label: 'Action' }
      ],
      serverTypeList: [{ text: "Standard", value: "standard" },
                        { text: "Secure", value: "secure" }],
      preferenceList: [{ text: "No Blocking", value: "no_blocking" },
                        { text: "No Flash", value: "no_flash" },
                        { text: "IRL" , value: "irl"},
                        { text: "Custom Viewability", value: "viewability" }],
      tagTypeList: [{ text: "Javascript", value: "javascript" },
                        { text: "Pixel", value: "pixel"}],
      docOptionList: [{text: "One Master Document", value: "master"},
                        {text: "Include in Existing Document", value: "include"},
                        {text: "Create New Document", value: "create"}],
      modalInfo: { title: '', content: '' }
    }
  },
  methods: {
    configModal (item, index, button) {
      this.modalInfo.title = `Ad Server Macro - Edit Configuration`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.rowSelected = index;
      this.$root.$emit('bv::show::modal', 'modalConfig', button)
    },
    documentModal (item, index, button) {
      this.modalInfo.title = `Ad Server Macro - Edit Configuration`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.rowSelected = index;
      this.$root.$emit('bv::show::modal', 'modalDocument', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    showModal () {
      this.serverSelected = this.arraySelected[this.rowSelected].serverSelected == "" ? [] : 
                            this.arraySelected[this.rowSelected].serverSelected.split(",");

      this.preferenceSelected = this.arraySelected[this.rowSelected].preferenceSelected == "" ? [] : 
                      this.arraySelected[this.rowSelected].preferenceSelected.split(",");

      this.tagSelected = this.arraySelected[this.rowSelected].tagSelected == "" ? [] : 
                          this.arraySelected[this.rowSelected].tagSelected.split(",");
    },
    addRow: function() {
      this.items.push({ad_server: 'vindico', configuration: '', results:'result.xls', action:''});
      this.arraySelected.push({
        serverSelected: "",
        preferenceSelected: "",
        tagSelected: "",
      });

    },
    deleteRow: function(item, index) {
      alert(index);
      this.items.splice(index, 1);
    },

    modalOk: function() {
      this.arraySelected[this.rowSelected].serverSelected = this.serverSelected.toString();
      this.arraySelected[this.rowSelected].preferenceSelected = this.preferenceSelected.toString();
      this.arraySelected[this.rowSelected].tagSelected = this.tagSelected.toString();
    },
  }
}
</script>

<style type="text/css">
.configDetail {
  width:100px;
  font-size:10pt;
  float:left;
}

.configButton {
  float:left;
}

.list-border .list-group-item  {
  border:0;
}
</style>