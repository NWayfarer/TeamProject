<template>
  <td>{{discipline.name}}</td>
  <td>{{discipline.description}}</td>
  <td><button @click="update">Edit</button></td>
</template>

<script>
import disciplineModel from "@/models/discipline"

export default {
  name: 'discipline',
  props: {
    discipline: disciplineModel
  },
  methods: {
    update() {
      this.$router.push({ name : "UpdateDiscipline", params: { instance: JSON.stringify(this.discipline) }})
    },
  }
}
</script>

