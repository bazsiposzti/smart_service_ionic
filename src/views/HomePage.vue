<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="jobStore.isLoading" class="center-text">
        <ion-spinner></ion-spinner>
      </div>

      <ion-list v-else>
        <munka-item v-for="job in jobStore.munkak" :key="job.id" :munka="job" />
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="isModalOpen = true">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal :is-open="isModalOpen" @didDismiss="isModalOpen = false">
      <uj-munka-form @kesz="isModalOpen = false"/>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  IonPage,
  IonContent,
  IonList,
  IonSpinner,
  IonModal,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons"; // Ikonok importálása
import { useMunkaStore } from "@/stores/MunkaStore";
import { ref } from "vue";

import Header from "@/components/Header.vue";
import MunkaItem from "@/components/MunkaItem.vue";
import UjMunkaForm from "@/components/UjMunkaForm.vue";


// Store használata
const jobStore = useMunkaStore();

const isModalOpen = ref(false);
// Amikor betölt az oldal (mint az onMounted C#-ban)
onMounted(() => {
  jobStore.fetchMunkak();
});

</script>

<style scoped>
.center-text {
  text-align: center;
  margin-top: 20px;
}
</style>
