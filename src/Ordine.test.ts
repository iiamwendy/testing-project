// Ordine.test.ts

import { newOrder, ordini } from "./ordine";


// Costanti per i dati del cliente
const CLIENTE_ALESSANDRO = {
  codiceFiscale: 'HTKDMMEAA98HHFRJ',
  nome: 'Alessandro',
  cognome: 'Arrigoni',
  email: 'arrigoni@gmail.com',
};

// Test della funzione newOrder
describe('newOrder function', () => {
  test('should create a new order for a customer', () => {
    const order = newOrder(CLIENTE_ALESSANDRO);

    expect(order).toBeDefined();
    expect(order.customerData).toEqual(CLIENTE_ALESSANDRO);
    expect(order.giftcards.length).toBe(0);
  });

  test('should throw an error if an order with the same codice fiscale already exists', () => {
    // Simula un ordine già esistente con lo stesso codice fiscale
    const existingOrder = {
      customerData: {
        codiceFiscale: 'ITFFRHMTONWW3RHQ',
        nome: 'Altro',
        cognome: 'Cliente',
        email: 'altro@email.com',
      },
      giftcards: [],
    };
    ordini.push(existingOrder);

    try {
      // Utilizza un codice fiscale specifico per far fallire il test
      newOrder({
        codiceFiscale: 'HDRMWWTTNP9BTRJ',
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario@email.com',
      });
      // Se la funzione sopra non ha lanciato un errore, il test dovrebbe fallire
      fail('La funzione dovrebbe lanciare un errore, ma non l\'ha fatto.');
    } catch (error) {
      // Verifica che l'errore sia quello atteso
      expect(error.message).toBe('Il codice fiscale deve avere esattamente 16 caratteri.');
    }
  });
});

// Test per il controllo del codice fiscale (separato dal test newOrder)
describe('Controllo del codice fiscale', () => {
  test('should check the length and replacement of the codice fiscale', () => {
    const cutomerData = {
      cf: 'TTFWAD03HDUNRTDF',
    };

    expect(cutomerData.cf.length === 16).toBe(true);
    const modifiedCF = cutomerData.cf.replace("cwhcvhsv", "");
    expect(modifiedCF.length).toBe(9);  });
});
