const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Deck } = require(".");
const { db } = require("../db/config");

let deck;

describe('Deck', () => {
    
    beforeAll(async () => {
        await db.sync({ force: true });
        deck = await Deck.create({
            name: 'Gandalf',
            xp: 100
        });
    });
    
    afterAll(async () => {
        await db.sync({ force: true })
    });
    
    it("has an id", async () => {
        expect(deck).toHaveProperty('id');
    });
    
    it("can create a Deck", async () => {
        expect(deck.name).toBe("Gandalf");
        expect(deck.xp).toBe(100);
    });
    
    it("can update a Deck", async () => {
        await deck.update({
            name: "Frodo",
            xp: 50
        });
    
        expect(deck.name).toBe("Frodo");
        expect(deck.xp).toBe(50);
    });
    
    it("can delete a Deck", async () => {
        await deck.destroy();
        const deletedDeck = await Deck.findByPk(deck.id);
        expect(deletedDeck).toBeNull();
    })

    it("can associate a User with a Deck", async() => {
      const deck1 = await Deck.create({
        name: "The grey army",
        xp: 100
      })
      await deck1.createUser({
        username: "saruman",
      });
      const user = await deck1.getUser();
      
      expect(user.username).toBe("saruman");
    });

    it('can associate many Cards with a Deck', async () => {
        const deck1 = await Deck.create({
            username: "saruman",
        });
        await deck1.createCard({
            name: 'Gandalf',
            mojo: 100,
            stamina: 100,
            imgUrl: 'https://www.gandalf.com'
        });
        await deck1.createCard({
            name: 'Frodo',
            mojo: 70,
            stamina: 60,
            imgUrl: 'https://www.frodo.com'
        });
        const cards = await deck1.getCards();

        expect(cards[0].name).toBe('Gandalf');
        expect(cards[0].mojo).toBe(100);
        expect(cards[0].stamina).toBe(100);
        expect(cards[0].imgUrl).toBe('https://www.gandalf.com');
        expect(cards[1].name).toBe('Frodo');
        expect(cards[1].mojo).toBe(70);
        expect(cards[1].stamina).toBe(60);
        expect(cards[1].imgUrl).toBe('https://www.frodo.com');
    });
})