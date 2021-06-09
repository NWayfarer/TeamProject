<template>
  <td>{{group.name}}</td>
  <td>{{group.numberOfStudents}}</td>
  <td><button @click="update">Edit</button></td>
</template>

<script>
export default {
  name: 'group',
  props: {
    group: Object
  },
  methods: {
    update() {
      this.$router.push({ name : "UpdateGroup", params: { instance: JSON.stringify(this.group) }})
    },
  },
}
</script>

