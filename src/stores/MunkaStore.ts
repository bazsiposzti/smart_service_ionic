import { defineStore } from "pinia";
import { db } from "@/firebaseConfig";
import type { Munkak } from "@/models/Munkak";
import { getDocs, addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
        },

        async updateMunka(id: string, frissitettAdat: Partial<Munkak>){
            try {
                // Megkeressük a konkrét dokumentumot az ID alapján
                const munkaRef = doc(db, 'munkak', id)

                // Frissítjük a Firebase-ben
                await updateDoc(munkaRef, frissitettAdat);

                // Újratöltjük a listát, hogy látszódjon a változás
                await this.fetchMunkak()
            } catch (error) {
                console.error("Hiba frissítéskor:", error);
            }
        },

        async deleteMunka(id: string){
            try {
                //megkeressük id alapján firebaseben
                const deleteMunkaRef = doc(db, 'munkak', id)
                //töröljük
                await deleteDoc(deleteMunkaRef)
                //betöltjük
                await this.fetchMunkak()
            } catch (error) {
                console.error("Hiba törléskor:", error);
            }
        }
    }
})