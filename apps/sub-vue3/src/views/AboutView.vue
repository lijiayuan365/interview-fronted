<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { helloWorld, configureApi } from '@ljy/api-client';
configureApi('http://127.0.0.1:3000');
onMounted(async () => {
  const [error, data] = await helloWorld.helloWorldControllerPostHello({ name: 'John' });
  if (error) return;
  console.log(data?.message);
});
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
