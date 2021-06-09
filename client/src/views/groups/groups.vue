<template>
<br>
  <b>Группы</b> <button @click="refresh">Обновить</button><button @click="add">Добавить</button>
  <div>
    <table style="border:1px solid black;padding:10px;display:inline-block">
      <tr>
        <th style="width:200px;">Группа</th>
        <th style="width:200px;">Количество участников</th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
      </tr>
      <template v-for="item in groups" :key="item.id">
        <tr>
        <group v-bind:group="item"/>
        <td><button @click="remove(item)">Delete</button></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import group from "@/views/groups/group.vue";
import $ from "jquery/src/jquery.js";

import groupModel from "@/models/group";

export default {
  name: 'groups',
  components: {
    group
  },
  data() { 
    return {
      groups: [],
      url: "http://localhost:8000/group",
    }
  },
  methods: {
    add() {
      this.$router.push("/groups/add");
    },
    async refresh() {
      this.groups = [];
      let result = await $.ajax({
        url: this.url,
        method: "GET",
      });
      this.groups = groupModel.mapArray(result);
    },
    async remove(item){
      let result = await $.ajax({
        url: this.url,
        method: "DELETE",
        data: item
      });

      if (result.error)
      {
        console.log(result.error)
        return;
      }

      const index = this.groups.indexOf(item);
      if (index > -1) {
        this.groups.splice(index, 1);
      }
    },
  },
  beforeMount() {
    this.refresh();
  }
}
</script>