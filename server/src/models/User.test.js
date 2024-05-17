const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User } = require('./index')
const { db } = require("../db/config");

// define in global scope
let user;

describe('User', () => {

  // clear db and create new user before tests
  beforeAll(async () => {
    await db.sync({ force: true })
    user = await User.create({
      username: 'gandalf'
    });
  });

  // clear db after tests
  afterAll(async () => {
    await db.sync({ force: true })
  });

  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  });

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it("can create a User", async() => {
    expect(user.username).toBe("gandalf");
  });

  it("can update a User", async() => {
    await user.update({username: "frodo"});
    expect(user.username).toBe("frodo");
  });

  it("can destroy a User", async() => {
    await user.destroy();
    const deletedUser = await User.findByPk(user.id)
    expect(deletedUser).toBeNull();
  });

  it("can associate a Deck with a User", async() => {
    const user1 = await User.create({
      username: "saruman",
    })
    await user1.createDeck({
      name: "The grey army",
      xp: 100
    });
    const deck = await user1.getDeck();

    expect(deck.name).toBe("The grey army");
    expect(deck.xp).toBe(100);
  });

});
