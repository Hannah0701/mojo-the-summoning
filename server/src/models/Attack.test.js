const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Attack } = require('.');
const { db } = require("../db/config");

let attack;

describe('Attack', () => {

    beforeAll(async () => {
        await db.sync({ force: true });
        attack = await Attack.create({
            title: 'Fireball',
            mojoCost: 10,
            staminaCost: 10
        });
    });

    afterAll(async () => {
        await db.sync({ force: true })
    });

    it("has an id", async () => {
        expect(attack).toHaveProperty('id');
    });

    it("can create an Attack", async () => {
        expect(attack.title).toBe("Fireball");
        expect(attack.mojoCost).toBe(10);
        expect(attack.staminaCost).toBe(10);
    });

    it("can update an Attack", async () => {
        await attack.update({
            title: "Iceball",
            mojoCost: 5,
            staminaCost: 5
        });

        expect(attack.title).toBe("Iceball");
        expect(attack.mojoCost).toBe(5);
        expect(attack.staminaCost).toBe(5);
    });

    it("can delete an Attack", async () => {
        await attack.destroy();
        const deletedAttack = await Attack.findByPk(attack.id);
        expect(deletedAttack).toBeNull();
    });

    it('can associate many Cards with an Attack', async () => {
        const attack1 = await Attack.create({
            title: 'Fireball',
            mojoCost: 10,
            staminaCost: 10
        });
        await attack1.createCard({
            name: 'Gandalf',
            mojo: 100,
            stamina: 100,
            imgUrl: 'https://www.gandalf.com'
        });
        await attack1.createCard({
            name: 'Frodo',
            mojo: 50,
            stamina: 50,
            imgUrl: 'https://www.frodo.com'
        });
        const cards = await attack1.getCards();

        expect(cards[0].name).toBe('Gandalf');
        expect(cards[0].mojo).toBe(100);
        expect(cards[0].stamina).toBe(100);
        expect(cards[0].imgUrl).toBe('https://www.gandalf.com');
        expect(cards[1].name).toBe('Frodo');
        expect(cards[1].mojo).toBe(50);
        expect(cards[1].stamina).toBe(50);
        expect(cards[1].imgUrl).toBe('https://www.frodo.com');
    });
});