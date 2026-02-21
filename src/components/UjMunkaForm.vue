<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ szerkesztendoMunka ? 'Munka szerkesztése' : 'Új munkalap' }}</ion-title>
      <ion-buttons slot="end">
        <ion-buttons  @click="bezar(false)" class="bezar-gomb" fill="clear"><ion-icon :icon="close"></ion-icon></ion-buttons>
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
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-select label="Státusz:" v-model="form.statusz">
          <ion-select-option value="uj">Új</ion-select-option>
          <ion-select-option value="folyamatban">folyamatban</ion-select-option>
          <ion-select-option value="kesz">Kész</ion-select-option>
        </ion-select>
      </ion-item>

    </ion-list>

    <ion-button expand="block" class="ion-margin-top" @click="mentes">{{ szerkesztendoMunka ? 'Frissítés' : 'Mentés' }}</ion-button>
  </ion-content>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useMunkaStore } from "@/stores/MunkaStore";
import type { Munkak } from "@/models/Munkak";
import { close } from "ionicons/icons";

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
  IonSelect,
  IonSelectOption,
  IonIcon
} from "@ionic/vue";
import { showToast } from "@/utils/toast";

const props = defineProps<{
  szerkesztendoMunka?: Munkak | null
}>();

const emit = defineEmits(['kesz'])

const jobStore = useMunkaStore();

const form = ref({
    kliens: '',
    cim: '',
    megjegyzes: '',
    osszeg: 0,
    statusz: 'uj' as 'uj' | 'folyamatban' | 'kesz'
});

onMounted(() => {
  if(props.szerkesztendoMunka){
    form.value.kliens = props.szerkesztendoMunka.kliens;
    form.value.cim = props.szerkesztendoMunka.cim || '';
    form.value.megjegyzes = props.szerkesztendoMunka.megjegyzes;
    form.value.osszeg = props.szerkesztendoMunka.osszeg;
    form.value.statusz = props.szerkesztendoMunka.statusz;
  }
});

const mentes = async() => {
  if(props.szerkesztendoMunka && props.szerkesztendoMunka.id){
    await jobStore.updateMunka(props.szerkesztendoMunka.id, {
      kliens: form.value.kliens,
      cim: form.value.cim,
      megjegyzes: form.value.megjegyzes,
      osszeg: form.value.osszeg,
      statusz: form.value.statusz
    })

    await showToast('Munkalap sikeresen frissítve! ✏️', 'success')
  }
  else
  {
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
    await showToast('Új munkalap sikeresen mentve! ✅', 'success')
  }
    bezar(true);
}

const bezar = (sikeres: boolean) => {
    emit('kesz')
}

</script>
