<template>
  <div style="border:1px solid black;padding:10px;">
    Название <input type=text v-model="toAdd.name"><br>
    Описание <input type=text v-model="toAdd.description"><br>
    <button @click="add">Добавить</button><br><br>
    <div>Добавленная запись: {{added}}</div>

  </div>
</template>

<script>
import disciplineModel from "@/models/discipline"
import $ from "jquery/src/jquery.js";

export default {
  data() {
    return {
      toAdd: new disciplineModel(),
      added: {}
    }
  },
  methods: {
    async add() {
      let result = await $.ajax({
        url: "http://localhost:8000/discipline",
        method: "POST",
        data: this.toAdd
      });

      if (result.error)
      {
        console.log(result.error)
        return;
      }
      this.added = disciplineModel.map(result)
    },
  }
}
</script>
