<template>
  <div style="border:1px solid black;padding:10px;">
    Группа 
    <select v-model="toUpdate.groupId">
      <option v-for="item in groups" :key="item.id" :value="item.id">
        {{item.name}}
      </option>
    </select><br>
    Дисциплина
    <select v-model="toUpdate.disciplineId">
      <option v-for="item in disciplines" :key="item.id" :value="item.id">
        {{item.name}}
      </option>
    </select><br>
    <input type="text" v-model="toUpdate.date" placeholder="yyyy-mm-dd hh-mm-ss.sss">
    <button @click="update">Изменить</button><br><br>
    <div>Измененная запись: {{updated}}</div>
  </div>
</template>

<script>
import scheduleModel from "@/models/schedule"
import $ from "jquery/src/jquery.js";
import groupModel from "@/models/group";
import disciplineModel from "@/models/discipline";

export default {
  data() {
    return {
      groups: [],
      disciplines: [],
      toUpdate: new scheduleModel(),
      updated: {}
    }
  },
  props: {
    instance: String
  },
  methods: {
    async update() {
      let result = await $.ajax({
        url: "http://localhost:8000/schedule",
        method: "PUT",
        data: this.toUpdate
      });

      if (result.error)
      {
        console.log(result.error)
        return;
      }
      
      this.toUpdate.copy(this.updated)
    },
  },
  async beforeMount() {
    scheduleModel.map(JSON.parse(this.instance)).copy(this.toUpdate);

    this.groups = [];
    let result = await $.ajax({
      url: "http://localhost:8000/group",
      method: "GET",
    });
    this.groups = groupModel.mapArray(result);

    
    this.disciplines = [];
    result = await $.ajax({
      url: "http://localhost:8000/discipline",
      method: "GET",
    });
    this.disciplines = disciplineModel.mapArray(result);
  }
}
</script>
