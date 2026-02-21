<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="jobStore.isLoading" class="center-text">
        <ion-spinner></ion-spinner>
      </div>

      <ion-list v-else>
        <ion-item-sliding v-for="job in jobStore.munkak" :key="job.id">
          <munka-item
            :munka="job"
            @click="szerkesztesMegnyitasa(job)"
          />

          <ion-item-options side="end">
            <ion-item-option color="danger" @click="munkaTorlese(job.id)">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="ujMunkaMegnyitasa">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal :is-open="isModalOpen" @didDismiss="isModalOpen = false">
        <uj-munka-form
          :szerkesztendo-munka="kivalasztottMunka"
          @kesz="modalBezarasa"
        />
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
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/vue";
import { add, trash } from "ionicons/icons"; // Ikonok importálása
import { useMunkaStore } from "@/stores/MunkaStore";
import { ref } from "vue";
import type { Munkak } from "@/models/Munkak";


import Header from "@/components/Header.vue";
import MunkaItem from "@/components/MunkaItem.vue";
import UjMunkaForm from "@/components/UjMunkaForm.vue";

// Store használata
const jobStore = useMunkaStore();

const isModalOpen = ref(false);

// Ez a változó tárolja, hogy épp melyik munkára kattintottunk rá:
const kivalasztottMunka = ref<Munkak | null>(null);

// Amikor betölt az oldal (mint az onMounted C#-ban)
onMounted(() => {
  jobStore.fetchMunkak();
});

// Gombnyomás: ÚJ munka (kiürítjük a kiválasztottat)
const ujMunkaMegnyitasa = () => {
  kivalasztottMunka.value = null;
  isModalOpen.value = true;
};

const szerkesztesMegnyitasa = (munka: Munkak) => {
  kivalasztottMunka.value = munka;
  isModalOpen.value = true;
};

const munkaTorlese = async (id: string | undefined) => {
  if(!id) return;

  const biztosan = confirm("Biztosan törölni szeretnéd ezt a munkalapot?")

  if(biztosan) {
    await jobStore.deleteMunka(id);
  }
}

const modalBezarasa = () => {
  isModalOpen.value = false;
  kivalasztottMunka.value = null;
};
</script>

<style scoped>
.center-text {
  text-align: center;
  margin-top: 20px;
}
</style>
