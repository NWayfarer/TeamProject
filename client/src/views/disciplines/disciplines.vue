<template>
<br>
  <b>Дисциплины</b> <button @click="refresh">Обновить</button><button @click="add">Добавить</button>
  <div>
    <table style="border:1px solid black;padding:10px;display:inline-block">
      <tr>
        <th style="width:200px;">Наименование</th>
        <th style="width:200px;">Описание</th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
      </tr>
      <template v-for="item in disciplines" :key="item.id">
        <tr>
        <discipline v-bind:discipline="item"/>
        <td><button @click="remove(item)">Delete</button></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import discipline from "@/views/disciplines/discipline.vue";
import $ from "jquery/src/jquery.js";

import disciplineModel from "@/models/discipline";

export default {
  name: 'disciplines',
  components: {
    discipline
  },
  data() { 
    return {
      disciplines: [],
      url: "http://localhost:8000/discipline",
    }
  },
  methods: {
    add() {
      this.$router.push("/disciplines/add");
    },
    async refresh() {
      this.disciplines = [];
      let result = await $.ajax({
        url: this.url,
        method: "GET",
      });
      this.disciplines = disciplineModel.mapArray(result);
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

      const index = this.disciplines.indexOf(item);
      if (index > -1) {
        this.disciplines.splice(index, 1);
      }
    },
  },
  beforeMount() {
    this.refresh();
  }
}
</script>