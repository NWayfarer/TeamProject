<template>
  <div style="border:1px solid black;padding:10px;">
    Группа 
    <select v-model="toAdd.groupId">
      <option v-for="item in groups" :key="item.id" :value="item.id">
        {{item.name}}
      </option>
    </select><br>
    Дисциплина
    <select v-model="toAdd.disciplineId">
      <option v-for="item in disciplines" :key="item.id" :value="item.id">
        {{item.name}}
      </option>
    </select><br>
    <input type="text" v-model="toAdd.date" placeholder="yyyy-mm-dd hh-mm-ss.sss">
    <button @click="add">Добавить</button>
    <div>Добавленная запись: {{added}}</div>
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
      toAdd: new scheduleModel(),
      added: {},
      groups: [],
      disciplines: []
    }
  },
  methods: {
    async add() {
      let result = await $.ajax({
        url: "http://localhost:8000/schedule",
        method: "POST",
        data: this.toAdd
      });

      if (result.error)
      {
        console.log(result.error)
        return;
      }
      this.added = scheduleModel.map(result)
    },
  },
  async beforeMount() {
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
