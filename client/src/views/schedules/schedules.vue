<template>
<br>
  <b>Расписания</b> <button @click="refresh">Обновить</button><button @click="add">Добавить</button>
  <div>
    <table style="border:1px solid black;padding:10px;display:inline-block">
      <tr>
        <th style="width:200px;">Группа</th>
        <th style="width:200px;">Дисциплина</th>
        <th style="width:200px;">Дата</th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
        <th style="width:70px;"></th>
      </tr>
      <template v-for="item in schedules" :key="item.id">
        <tr>
        <schedule v-bind:schedule="item"/>
        <td><button @click="remove(item)">Delete</button></td>
        </tr>
      </template>
    </table>
    
  </div>
</template>

<script>
import schedule from "@/views/schedules/schedule";
import $ from "jquery/src/jquery";

import scheduleModel from "@/models/schedule";

export default {
  name: 'schedules',
  components: {
    schedule
  },
  data() { 
    return {
      schedules: [],
      url: "http://localhost:8000/schedule",
    }
  },
  methods: {
    add() {
      this.$router.push("/schedules/add");
    },
    async refresh() {
      this.schedules = [];
      let result = await $.ajax({
        url: this.url,
        method: "GET",
      });
      this.schedules = scheduleModel.mapArray(result);
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

      const index = this.schedules.indexOf(item);
      if (index > -1) {
        this.schedules.splice(index, 1);
      }
    },
  },
  beforeMount() {
    this.refresh();
  }
}
</script>