export interface Munkak {
    id?: string; // A kérdőjel azt jelenti, hogy létrehozáskor még nincs ID-ja
    kliens: string;
    cim?: string;
    telefonszam?: string;
    megjegyzes: string;
    statusz: 'uj' | 'folyamatban' | 'kesz';
    letrehozva: Date;
    osszeg: number;
    szamlazva: 'igen' | 'nem'
}