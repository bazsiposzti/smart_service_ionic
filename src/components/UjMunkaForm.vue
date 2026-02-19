<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Új munkalap</ion-title>
      <ion-buttons slot="end">
        <ion-buttons @click="bezar(false)">Mégse</ion-buttons>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-input
          label="Ügyfél neve:"
          label-placement="floating"
          v-model="form.kliens"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          label="Cím:"
          label-placement="floating"
          v-model="form.cim"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          type="text"
          label="Megjegyzés/Hiba:"
          label-placement="floating"
          v-model="form.megjegyzes"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          type="number"
          :min="30000"
          label="Összeg (Ft):"
          label-placement="floating"
          v-model="form.osszeg"
          placeholder="Pl. Kovács Kft."
        ></ion-input>
      </ion-item>
    </ion-list>

    <ion-button expand="block" class="ion-margin-top" @click="mentes"></ion-button>
    Mentés
  </ion-content>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useMunkaStore } from "@/stores/MunkaStore";
import type { Munkak } from "@/models/Munkak";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
} from "@ionic/vue";

const emit = defineEmits(['kesz'])

const jobStore = useMunkaStore();

const form = ref({
    kliens: '',
    cim: '',
    megjegyzes: '',
    osszeg: 0
});

const mentes = async() => {
    const ujAdat: Munkak = {
        kliens: form.value.kliens,
        cim: form.value.cim,
        megjegyzes: form.value.megjegyzes,
        osszeg: form.value.osszeg,
        statusz: 'uj',
        szamlazva: 'nem',
        letrehozva: new Date()
    };

    await jobStore.addMunka(ujAdat);
    bezar(true);
    form.value = {kliens: '', cim: '', megjegyzes: '', osszeg: 0}
}

const bezar = (sikeres: boolean) => {
    emit('kesz')
}



</script>
