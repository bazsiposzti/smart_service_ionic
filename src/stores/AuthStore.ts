import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    felhasznalo: null as User | null,
    isAuthReady: false, // Ez jelzi, ha a Firebase betöltötte a korábbi bejelentkezést
  }),

  getters: {
    isLoggedIn: (state) => !!state.felhasznalo,
  },

  actions: {
    async bejelentkezes(email: string, jelszo: string) {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        jelszo,
      );
      this.felhasznalo = userCredential.user;
    },

    async kijelentkezes() {
      const auth = getAuth();
      await signOut(auth);
      this.felhasznalo = null;
    },

    initAuth() {
      return new Promise<void>((resolve) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          this.felhasznalo = user;
          this.isAuthReady = true;
          resolve();
        });
      });
    },
  },
});
