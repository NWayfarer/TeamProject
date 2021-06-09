<template>
    <td>{{schedule.group.name}}</td>
    <td>{{schedule.discipline.name}}</td>
    <td>{{schedule.date}}</td>
    <td><button @click="update">Edit</button></td>
</template>

<script>
export default {
  name: 'schedule',
  props: {
    schedule: Object,
  },
  methods: {
    update() {
      this.$router.push({ name : "UpdateSchedule", params: { instance: JSON.stringify(this.schedule) }})
    },
  },
}
</script>

