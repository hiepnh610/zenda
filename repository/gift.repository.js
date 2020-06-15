const DB = require("../models");
const Gift = DB.Gift;

const getGiftsList = async () => {
  try {
    return await Gift.findAll();
  } catch (error) {
    return { error };
  };
};

const createGift = async (payload) => {
  try {
    return await Gift.create(payload);
  } catch (error) {
    return { error };
  }
};

const removeGift = async (id) => {
  try {
    await Transaction.destroy({
      where: { id }
    });

    return {
      message: 'Delete successfully.'
    };
  } catch (e) {
    return { error };
  };
};

module.exports = {
  getGiftsList,
  createGift,
  removeGift
};
