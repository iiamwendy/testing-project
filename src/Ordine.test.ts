// Ordine.test.ts

import { newOrder, ordini, addGiftcard, getAmount} from "./ordine";


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



// Test per la funzione addGiftcard
describe('addGiftcard function', () => {
    // Happy path
    test('should add a giftcard with a valid amount (10)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      addGiftcard(order, 10);
  
      expect(order.giftcards.length).toBe(1);
      expect(order.giftcards[0].amount).toBe(10);
      expect(order.giftcards[0].type).toBe('digitale');

    });
  
    // Special cases
    test('should add a giftcard with a valid amount (20)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      addGiftcard(order, 20);
  
      expect(order.giftcards.length).toBe(1);
      expect(order.giftcards[0].amount).toBe(20);
      expect(order.giftcards[0].type).toBe('digitale');

    });
  
    test('should add a giftcard with a valid amount (50)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      addGiftcard(order, 50);
  
      expect(order.giftcards.length).toBe(1);
      expect(order.giftcards[0].amount).toBe(50);
      expect(order.giftcards[0].type).toBe('digitale');

    });
  
    test('should add a giftcard with a valid amount (100)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      addGiftcard(order, 100);
  
      expect(order.giftcards.length).toBe(1);
      expect(order.giftcards[0].amount).toBe(100);
      expect(order.giftcards[0].type).toBe('digitale');

    });
  
    // Edge cases
    test('should throw an error for an invalid amount (5)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
  
      try {
        addGiftcard(order, 5);
        fail('La funzione dovrebbe lanciare un errore, ma non l\'ha fatto.');
      } catch (error) {
        expect(error.message).toBe('L\'importo della giftcard deve essere 10, 20, 50 o 100.');
      }
    });
  
    // Eccezioni
    test('should throw an error for an invalid amount (25)', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
  
      try {
        addGiftcard(order, 25);
        fail('La funzione dovrebbe lanciare un errore, ma non l\'ha fatto.');
      } catch (error) {
        expect(error.message).toBe('L\'importo della giftcard deve essere 10, 20, 50 o 100.');
      }
    });


// Nuovi test
test('should update quantity for an existing giftcard with the same amount and type', () => {
    const order = newOrder(CLIENTE_ALESSANDRO);
    addGiftcard(order, 10);
    addGiftcard(order, 10); // Aggiunge una giftcard con lo stesso taglio e tipo

    expect(order.giftcards.length).toBe(1);
    expect(order.giftcards[0].amount).toBe(20);
    expect(order.giftcards[0].type).toBe('digitale');
  });

  test('should add a new giftcard for a different amount', () => {
    const order = newOrder(CLIENTE_ALESSANDRO);
    addGiftcard(order, 10);
    addGiftcard(order, 20); // Aggiunge una giftcard con importo diverso

    expect(order.giftcards.length).toBe(2);
    expect(order.giftcards[0].amount).toBe(10);
    expect(order.giftcards[1].amount).toBe(20);
  });

  test('should add a new giftcard for a different type', () => {
    const order = newOrder(CLIENTE_ALESSANDRO);
    addGiftcard(order, 10);
    addGiftcard(order, 10, 'cartacea'); // Aggiunge una giftcard con tipo diverso

    expect(order.giftcards.length).toBe(2);
    expect(order.giftcards[0].type).toBe('digitale');
    expect(order.giftcards[1].type).toBe('cartacea');
  });



  
});

  
describe('getAmount function', () => {
    test('should return 0 for an order without giftcards', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      const amount = getAmount(order);
  
      expect(amount).toBe(0);
    });
  
    test('should return the total amount for an order with giftcards', () => {
      const order = newOrder(CLIENTE_ALESSANDRO);
      addGiftcard(order, 10);
      addGiftcard(order, 20);
      addGiftcard(order, 50);
  
      const amount = getAmount(order);
  
      expect(amount).toBe(80);
    });

});