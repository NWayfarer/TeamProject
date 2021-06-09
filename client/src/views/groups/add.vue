<template>
  <div style="border:1px solid black;padding:10px;">
    Группа <input type=text v-model="toAdd.name"><br>
    Количество участников <input type=text v-model="toAdd.numberOfStudents"><br>
    <button @click="add">Добавить</button>
    <br><br>
    <div>Добавленная запись: {{added}}</div>
  </div>
</template>

<script>
import groupModel from "@/models/group"
import $ from "jquery/src/jquery.js";

export default {
  data() {
    return {
      toAdd: new groupModel(),
      added: {}
    }
  },
  methods: {
    async add() {
      let result = await $.ajax({
        url: "http://localhost:8000/group",
        method: "POST",
        data: this.toAdd
      });

      if (result.error)
      {
        console.log(result.error)
        return;
      }
      this.added = groupModel.map(result)
    },
  }
}
</script>
