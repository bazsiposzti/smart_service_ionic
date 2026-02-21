<script setup lang="ts">
import { IonItem, IonLabel, IonBadge } from '@ionic/vue';
import type { Munkak } from '@/models/Munkak';

defineProps<{
    munka: Munkak;
}>();
</script>

<template>
  <ion-item>
    <ion-label class="ion-text-center">
      <h2>{{ munka.kliens }}</h2>
      <p>{{ munka.megjegyzes }}</p>
      <ion-badge color="secondary">{{ munka.statusz }}</ion-badge>
      <h3>{{ munka.osszeg }} Ft</h3>
    </ion-label>
  </ion-item>
</template>

<style scoped>


</style>