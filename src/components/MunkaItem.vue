<script setup lang="ts">
import { IonItem, IonLabel, IonBadge } from "@ionic/vue";
import type { Munkak } from "@/models/Munkak";

defineProps<{
  munka: Munkak;
}>();
</script>

<template>
  <ion-item>
    <ion-label>
      <h2>{{ munka.kliens }}</h2>
      <p>{{ munka.megjegyzes }}</p>
      <ion-badge color="secondary">{{ munka.statusz }}</ion-badge>
    </ion-label>
    <div slot="end">
      <h3
        style="
          font-weight: bold;
          font-size: 1.1rem;
          color: var(--ion-color-primary);
        "
      >
        {{ munka.osszeg }} Ft
      </h3>
    </div>
  </ion-item>
</template>

<style scoped></style>
