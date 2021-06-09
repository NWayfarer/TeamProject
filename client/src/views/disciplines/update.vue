<template>
  <div style="border:1px solid black;padding:10px;">
    Название <input type=text v-model="toUpdate.name"><br>
    Описание <input type=text v-model="toUpdate.description"><br>
    <button @click="update">Изменить</button><br><br>
    <div>Измененная запись: {{updated}}</div>

  </div>
</template>

<script>
import disciplineModel from "@/models/discipline"
import $ from "jquery/src/jquery.js";

export default {
  data() {
    return {
      toUpdate: new disciplineModel(),
      updated: {}
    }
  },
  props: {
    instance: String
  },
  methods: {
    async update() {
      let result = await $.ajax({
        url: "http://localhost:8000/discipline",
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
    disciplineModel.map(JSON.parse(this.instance)).copy(this.toUpdate);
  }
}
</script>
