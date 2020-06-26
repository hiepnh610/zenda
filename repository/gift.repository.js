const DB = require("../models");
const Gift = DB.Gift;

const getGiftsList = async () => {
  try {
    return await Gift.findAndCountAll({
      limit: 5,
      offset: 0,
      order: [['updatedAt', 'DESC']]
    });
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

const removeGift = async (id) => {
  try {
    await Gift.destroy({
      where: { id }
    });

    return {
      message: 'Delete successfully.'
    };
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
  removeGift,
  updateGift,
  getGiftDetail
};
