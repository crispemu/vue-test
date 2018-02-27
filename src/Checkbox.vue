<template>
             <div class="list-group">
                <div class="list-group-item">
                    <input type="checkbox"
                           v-model="selectAll"
                           v-on:click="handleAll(-1)">
                    All
                </div>
                <div class="list-group-item"
                     v-for="(item, index) in tagTypeList">
                    <input type="checkbox"
                           v-model="item.selected"
                           v-on:click="handleAll(index)">
                    {{item.text}}
                </div>
            </div>
</template>

<script>
export default {
  props: ['leftMenuList'],
  data () {
    return {
      itemSelected: 0,
      selectAll: false,
            tagTypeList: [{ text: "Ad Server Macro Tags", selected: false, menuOpt: 2 },
                            { text: "Hardcoded Tags", selected: false, menuOpt: 3 },
                            { text: "Wrapped Video Tags", selected: false, menuOpt: 4 },
                            { text: "vCE for Publishers", selected: false, menuOpt: -1 }],
    }
  },
  methods: {
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
            handleLeftMenu: function (opt, selected) {
                if (opt != -1)
                    this.leftMenuList[opt].display = selected;
            },
  },
}
</script>
