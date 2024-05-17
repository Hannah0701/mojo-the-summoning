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
})