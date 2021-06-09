<template>
  <div style="border:1px solid black;padding:10px;">
    Название <input type=text v-model="toUpdate.name"><br>
    Описание <input type=text v-model="toUpdate.numberOfStudents"><br>
    <button @click="update">Изменить</button><br><br>
    <div>Измененная запись: {{updated}}</div>

  </div>
</template>

<script>
import groupModel from "@/models/group"
import $ from "jquery/src/jquery.js";

export default {
  data() {
    return {
      toUpdate: new groupModel(),
      updated: {}
    }
  },
  props: {
    instance: String
  },
  methods: {
    async update() {
      let result = await $.ajax({
        url: "http://localhost:8000/group",
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
  beforeMount() {
    groupModel.map(JSON.parse(this.instance)).copy(this.toUpdate);
  }
}
</script>
