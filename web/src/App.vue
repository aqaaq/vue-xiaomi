<template>
  <div id="app">
    <keep-alive :include="['Home','Mi']">
      <router-view />
    </keep-alive>
  </div>
</template>
<style>
</style>
