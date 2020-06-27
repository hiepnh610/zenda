const DB = require("../models");
const Gift = DB.Gift;

const getGiftsList = async (offset) => {
  try {
    let query = {};

    if (offset) {
      query = {
        limit: 5,
        offset,
        order: [['updatedAt', 'DESC']]
      };
    }

    return await Gift.findAndCountAll(query);
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

const updateGift = async (payload) => {
  try {
    const {
      id,
      name,
      image,
      quantity,
      points
    } = payload;

    await Gift.update(
      { name, image, quantity, points },
      { where: { id } }
    );

    return { message: 'Update successfully.' };
  } catch (error) {
    return { error };
  };
};

const getGiftDetail = async (id) => {
  try {
    return await Gift.findOne({
      where: { id }
    });
  } catch (error) {
    return { error };
  };
};

module.exports = {
  getGiftsList,
  createGift,
  updateGift,
  getGiftDetail
};
