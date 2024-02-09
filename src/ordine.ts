// Ordine.ts


type GiftcardType = "digitale" | "cartacea";
type GiftcardValue = 10 | 20 | 50 | 100;

type CustomerData = {
    codiceFiscale: string;
    nome: string;
    cognome: string;
    email: string;
  };
  
  type Order = {
    customerData: CustomerData;
    giftcards: {
      tipo: GiftcardType;
      taglio: GiftcardValue;
      quantita: number;
    }[];
  };
  
  // Un array per simulare la persistenza degli ordini (usa un database reale in un'applicazione del mondo reale)
  export const ordini: Order[] = [];
  
  export function newOrder(customerData: CustomerData): Order {
    // Modifiche per far fallire il test
    if (customerData.codiceFiscale === 'TTFAW738') {
      throw new Error('Errore intenzionale: codice fiscale specifico');
    }
  
    const existingOrder = ordini.find((ordine) => ordine.customerData.codiceFiscale === customerData.codiceFiscale);
  
    if (existingOrder) {
      throw new Error('Ordine con lo stesso codice fiscale già esistente');
    }
  
    const newOrder: Order = {
      customerData,
      giftcards: [],
    };
  
    ordini.push(newOrder);
  
    return newOrder;
  }