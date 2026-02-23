<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import type { Munkak } from "@/models/Munkak";
import { getStatusColor, getStatusText } from "@/utils/statusHelper";
// Behoztuk az új ikonokat is a szebb megjelenéshez
import {
  navigateOutline,
  locationOutline,
  constructOutline,
} from "ionicons/icons";
import { showToast } from "@/utils/toast";

const navigalas = async (cim?: string) => {
  if (!cim) {
    await showToast("Nincs megadva cím ehhez a munkalaphoz!", "warning");
    return;
  }

  const formazottCim = encodeURIComponent(cim);

  const url = `https://www.google.com/maps/search/?api=1&query=${formazottCim}`;

  window.open(url, "_blank");
};

defineProps<{
  munka: Munkak;
}>();
</script>

<template>
  <ion-card class="munka-card">
    <ion-card-header class="card-header">
      <div class="header-flex">
        <ion-card-title class="kliens-nev">
          {{ munka.kliens }}
        </ion-card-title>
        <ion-badge :color="getStatusColor(munka.statusz)">
          {{ getStatusText(munka.statusz) }}
        </ion-badge>
      </div>
    </ion-card-header>

    <ion-card-content>
      <div class="info-row">
        <ion-icon :icon="constructOutline" class="info-icon"></ion-icon>
        <span class="info-text">{{ munka.megjegyzes }}</span>
      </div>

      <div class="info-row">
        <ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
        <span class="info-text">{{ munka.cim }}</span>
      </div>

      <div class="card-footer">
        <ion-button
          fill="solid"
          shape="round"
          @click.stop="navigalas(munka.cim)"
        >
          <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
          Navigáció
        </ion-button>

        <h3 class="osszeg-text">{{ munka.osszeg }} Ft</h3>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
/* Maga a kártya formázása */
.munka-card {
  border-radius: 20px;
  margin-bottom: 16px;
  background: #282a2d;
  border: 2px solid rgba(255, 255, 255, 0.08);
  
}

/* Fejléc elrendezése */
.card-header {
  padding-bottom: 8px;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.kliens-nev {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

/* Információs sorok (ikon + szöveg) */
.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: var(--ion-color-medium);
}

.info-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.info-text {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Lábléc (összeg és gomb) */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(128, 128, 128, 0.2); /* Finom elválasztó vonal sötét és világos módban is jó */
  padding-top: 12px;
  margin-top: 8px;
}

.osszeg-text {
  margin: 0;
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--ion-color-primary);
}
</style>
