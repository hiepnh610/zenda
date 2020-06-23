const DB = require("../models");
const Gift = DB.Gift;
const User = DB.User;
const Exchange = DB.Exchange;

const giftExchange = async (payload) => {
  try {
    const {
      user_id,
      gift_id
    } = payload;

    return await DB.sequelize.transaction(async (transaction) => {
      const getGiftInfo = await Gift.findOne(
        { where: { id: gift_id } },
        { transaction }
      );

      const getUserInfo = await User.findOne(
        { where: { user_id: user_id } },
        { transaction }
      );

      if (getUserInfo.receive_bag > 0) {
        await getUserInfo.update(
          { receive_bag: getUserInfo.receive_bag - getGiftInfo.points },
          { transaction }
        );

        await getGiftInfo.update(
          { quantity: getGiftInfo.quantity - 1 },
          { transaction }
        );

        return await Exchange.create(
          {
            display_name: getUserInfo.display_name,
            gift_name: getGiftInfo.name,
            status: false
          },
          { transaction }
        );
      }
    });
  } catch (error) {
    return { error };
  }
};

const giftExchangeList = async () => {
  try {
    return await Exchange.findAll({ order: [['updatedAt', 'DESC']] });
  } catch (error) {
    return { error };
  }
};

const giftExchangeStatus = async (payload) => {
  try {
    const {
      id,
      status
    } = payload;

    return await Exchange.update(
      { status },
      { where: { id } }
    );
  } catch (error) {
    return { error };
  };
};

const removeGiftExchange = async (id) => {
  try {
    await Exchange.destroy({
      where: { id }
    });

    return {
      message: 'Delete successfully.'
    };
  } catch (error) {
    return { error };
  };
};

module.exports = {
  giftExchange,
  giftExchangeList,
  giftExchangeStatus,
  removeGiftExchange
};
