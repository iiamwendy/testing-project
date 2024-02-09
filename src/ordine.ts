// ordine.ts

interface CustomerData {
    codiceFiscale: string;
    nome: string;
    cognome: string;
    email: string;
  }
  
  interface Order {
    customerData: CustomerData;
    giftcards: any[]; // Tipo degli oggetti giftcards da definire in base alle tue esigenze
  }
  
  export const ordini: Order[] = []; // Esporta la variabile ordini
  
  export function newOrder(customerData: CustomerData): Order {
    // Verifica che il codice fiscale abbia esattamente 16 caratteri
    if (customerData.codiceFiscale.length !== 16) {
      throw new Error('Il codice fiscale deve avere esattamente 16 caratteri.');
    }
  
    // Altri controlli o logica per la creazione dell'ordine
  
    const order: Order = {
      customerData,
      giftcards: [],
    };
  
    // Aggiungi l'ordine alla lista degli ordini
    ordini.push(order);
  
    return order;
  }
  