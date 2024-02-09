// ordine.ts

interface CustomerData {
    codiceFiscale: string;
    nome: string;
    cognome: string;
    email: string;
  }

  
  interface Order {
    customerData: CustomerData;
    giftcards: Giftcard[];
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
  

  interface Giftcard {
    amount: number;
    type: string; // Aggiunto il tipo della giftcard
  }


  export function addGiftcard(order: Order, amount: number, type: string = 'digitale'): void {
    // Verifica che l'importo della giftcard sia valido
    if (![10, 20, 50, 100].includes(amount)) {
      throw new Error('L\'importo della giftcard deve essere 10, 20, 50 o 100.');
    }
  

    const existingGiftcard = order.giftcards.find((giftcard) => giftcard.amount === amount && giftcard.type === type);

    if (existingGiftcard) {
      // Se esiste già una giftcard con lo stesso taglio e tipo, aggiorna la quantità
      existingGiftcard.amount += amount;
    } else {
      // Altrimenti, aggiungi una nuova giftcard all'ordine
      const giftcard: Giftcard = {
        amount,
        type,
      };
      order.giftcards.push(giftcard);
    }
}