<template>
  <div>
    <router-link to="/groups"><button>Группы</button></router-link>
    <router-link to="/disciplines"><button>Дисциплины</button></router-link>
    <router-link to="/schedules"><button>Расписания</button></router-link>
  </div>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
