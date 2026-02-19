import { defineStore } from "pinia";
import { db } from "@/firebaseConfig";
import type { Munkak } from "@/models/Munkak";
import { getDocs, addDoc, collection } from "firebase/firestore";

export const useMunkaStore = defineStore('munkaStore', {
    state: () => ({
        munkak: [] as Munkak[],
        isLoading: false,
        error: null as string | null,
    }),
    
    actions: {
        async fetchMunkak() {
            this.isLoading = true;
            try {
                const querySnapshot = await getDocs(collection(db, 'munkak'));
                this.munkak = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    letrehozva: doc.data().letrehozva?.toDate() || new Date()
                } as Munkak))
            } catch (error) {
                console.error("Hiba a lekéréskor:", error);
            } finally {
                this.isLoading = false;
            }
        },

        async addMunka(ujMunka: Munkak){
            try{
            await addDoc(collection(db, 'munkak'), ujMunka)
            await this.fetchMunkak();
            }
            catch(error){
                console.error("Hiba mentéskor:", error)
            }
        }
    }
})