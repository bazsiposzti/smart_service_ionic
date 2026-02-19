import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc} from 'firebase/firestore';
import type { Munkak } from "@/models/Munkak";

const COLLECTION_NAME = 'munkak'

export const MunkaService = {
    async getallMunka(): Promise<Munkak[]> {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Munkak))
    },

    async createMunka(munka: Munkak): Promise<void> {
        // A dátumot konvertálni kell, mert a JS Date objektum
        await addDoc(collection(db, COLLECTION_NAME), {
            ...munka,
            createdAt: new Date()
        })
    }
}