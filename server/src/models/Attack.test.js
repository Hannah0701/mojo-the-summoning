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
    })
});