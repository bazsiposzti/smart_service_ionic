<template>
  <ion-page>
    <ion-content class="ion-padding" style="display: flex; align-items: center; justify-content: center;">
      
      <div class="login-container">
        <div class="ion-text-center ion-margin-bottom">
          <ion-icon :icon="construct" style="font-size: 64px; color: var(--ion-color-primary);"></ion-icon>
          <h1 style="font-weight: bold; margin-top: 10px;">SmartService</h1>
          <p style="color: gray;">Jelentkezz be a munkalapokhoz!</p>
        </div>

        <ion-list class="ion-margin-bottom" style="background: transparent;">
          <ion-item lines="full">
            <ion-icon :icon="mail" slot="start" color="medium"></ion-icon>
            <ion-input 
              type="email" 
              label="E-mail cím" 
              label-placement="floating" 
              v-model="email"
              @keyup.enter="bejelentkezes"
            ></ion-input>
          </ion-item>

          <ion-item lines="full">
            <ion-icon :icon="lockClosed" slot="start" color="medium"></ion-icon>
            <ion-input 
              type="password" 
              label="Jelszó" 
              label-placement="floating" 
              v-model="jelszo"
              @keyup.enter="bejelentkezes"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="block" @click="bejelentkezes" :disabled="isLoading">
          <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          <span v-else>Belépés</span>
        </ion-button>
        
        <p v-if="hibaUzenet" class="hiba-szoveg ion-text-center">
          {{ hibaUzenet }}
        </p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore'; // ÚJ: Behozzuk a store-t
import { 
  IonPage, IonContent, IonList, IonItem, 
  IonInput, IonButton, IonIcon, IonSpinner 
} from '@ionic/vue';
import { mail, lockClosed, construct } from 'ionicons/icons';

const router = useRouter();
const authStore = useAuthStore(); // ÚJ: Példányosítjuk a store-t

const email = ref('');
const jelszo = ref('');
const isLoading = ref(false);
const hibaUzenet = ref('');

const bejelentkezes = async () => {
  if (!email.value || !jelszo.value) {
    hibaUzenet.value = 'Kérlek, add meg az e-mailt és a jelszót!';
    return;
  }

  isLoading.value = true;
  hibaUzenet.value = '';

  try {
    // ÚJ: Itt már csak a Store függvényét hívjuk meg!
    await authStore.bejelentkezes(email.value, jelszo.value);
    
    // Ha sikeres, irány a főoldal
    router.push('/home');
  } catch (error: any) {
    console.error("Belépési hiba:", error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      hibaUzenet.value = 'Hibás e-mail cím vagy jelszó!';
    } else {
      hibaUzenet.value = 'Hiba történt a bejelentkezés során.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Egy kis stílus, hogy mobilon és weben is szép középen legyen */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 10vh;
}
.hiba-szoveg {
  color: var(--ion-color-danger);
  font-size: 0.9em;
  margin-top: 15px;
}
</style>