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
      <template slot="upload_file" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <app-file-upload></app-file-upload>
      </template>
      <template slot="configuration" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="configModal(row.item, row.index, $event.target)" class="mr-1">
          Edit
        </b-button>
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
    <b-modal id="modalConfig" @hide="resetModal" :title="modalInfo.title" ok-only>
      <b-row>
        <b-col md="6" class="my-1">
        <app-checkbox2 :optionList="serverTypeList"></app-checkbox2>
        <br>
        <app-checkbox2 :optionList="preferenceList"></app-checkbox2>
      </b-col>
      <b-col md="6" class="my-1">
        <app-checkbox2 :optionList="tagTypeList"></app-checkbox2>
      </b-col>
    </b-row>
    </b-modal>

    <b-modal id="modalDocument" @hide="resetModal" :title="modalInfo.title" ok-only>
      <b-row>
        <b-col md="12" class="my-1">
        <app-checkbox2 :optionList="docOptionList"></app-checkbox2>
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
      fields: [
        { key: 'ad_server', label: 'Ad Server' },
        { key: 'upload_file', label: 'Upload File' },
        { key: 'configuration', label: 'Configurtion' },
        { key: 'column_mapping', label: 'Column Mapping', hidden: true },
        { key: 'publisher_mapping', label: 'Publisher Mapping' },
        { key: 'results', label: 'Results' },
        { key: 'action', label: 'Action' }
      ],
      serverTypeList: [{ text: "Standard", checked: true },
                        { text: "Secure" }],
      preferenceList: [{ text: "No Blocking" },
                        { text: "No Flash" },
                        { text: "IRL" },
                        { text: "Custom Viewability" }],
      tagTypeList: [{ text: "Javascript" },
                        { text: "Pixel" }],
                        docOptionList: [{text: "One Master Document"},
                        {text: "Include in Existing Document"},
                        {text: "Create New Document"}],
      modalInfo: { title: '', content: '' }
    }
  },
  methods: {
    configModal (item, index, button) {
      this.modalInfo.title = `Ad Server Macro - Edit Configuration`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalConfig', button)
    },
    documentModal (item, index, button) {
      this.modalInfo.title = `Ad Server Macro - Edit Configuration`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalDocument', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    addRow: function() {
      this.items.push({ad_server: 'vindico', upload_file: 'input.xls', configuration: '', results:'result.xls', action:''});
    },
    deleteRow: function(item, index) {
      alert(index);
      this.items.splice(index, 1);
    },
  }
}
</script>
