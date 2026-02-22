<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons } from "@ionic/vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
import { logOutOutline } from "ionicons/icons";

const authStore = useAuthStore()
const router = useRouter()

const kilepes = async () => {
  await authStore.kijelentkezes()
  router.push('/login')
}

</script>

<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Munkalapok</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="kilepes" color="danger">
          <ion-icon slot="icon-only" :icon="logOutOutline" ></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<style>
ion-title {
  text-align: center;
}
</style>
