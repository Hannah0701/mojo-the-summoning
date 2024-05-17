const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Card } = require('./index');
const { db } = require("../db/config");

let card;

describe('Card', () => {

    beforeAll(async () => {
        await db.sync({ force: true});
        card = await Card.create({
            name: 'Gandalf',
            mojo: 100,
            stamina: 100,
            imgUrl: 'https://www.gandalf.com'
        });
    });

    afterAll(async () => {
        await db.sync({ force: true })
    });

    it("has an id", async () => {
        expect(card).toHaveProperty('id');
    });

    it("can create a Card", async () => {
        expect(card.name).toBe("Gandalf");
        expect(card.mojo).toBe(100);
        expect(card.stamina).toBe(100);
        expect(card.imgUrl).toBe("https://www.gandalf.com");
    });

    it("can update a Card", async () => {
        await card.update({
            name: "Frodo",
            mojo: 50,
            stamina: 50,
            imgUrl: "https://www.frodo.com"
        });

        expect(card.name).toBe("Frodo");
        expect(card.mojo).toBe(50);
        expect(card.stamina).toBe(50);
        expect(card.imgUrl).toBe("https://www.frodo.com");
    });

    it("can delete a Card", async () => {
        await card.destroy();
        const deletedCard = await Card.findByPk(card.id);
        expect(deletedCard).toBeNull();
    });

    it('can associate a Deck with a Card', async () => {
        const card1 = await Card.create({
            name: 'Gandalf',
            mojo: 100,
            stamina: 100,
            imgUrl: 'https://www.gandalf.com'
        });
        await card1.createDeck({
            name: 'The grey army',
            xp: 100
        });
        const deck = await card1.getDeck();

        expect(deck.name).toBe('The grey army');
        expect(deck.xp).toBe(100);
    });

    it('can associate many Attacks with a Card', async () => {
        const card1 = await Card.create({
            name: 'Gandalf',
            mojo: 100,
            stamina: 100,
            imgUrl: 'https://www.gandalf.com'
        });
        await card1.createAttack({
            title: 'Fireball',
            mojoCost: 10,
            staminaCost: 10
        });
        await card1.createAttack({
            title: 'Iceball',
            mojoCost: 5,
            staminaCost: 5
        });
        const attacks = await card1.getAttacks();

        expect(attacks[0].title).toBe('Fireball');
        expect(attacks[0].mojoCost).toBe(10);
        expect(attacks[0].staminaCost).toBe(10);
        expect(attacks[1].title).toBe('Iceball');
        expect(attacks[1].mojoCost).toBe(5);
        expect(attacks[1].staminaCost).toBe(5);
    });

});

