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

      await getUserInfo.update(
        { receive_bag: getUserInfo.receive_bag - getGiftInfo.points },
        { transaction }
      );

      await Exchange.create(
        {
          display_name: getUserInfo.display_name,
          gift_name: getGiftInfo.name
        },
        { transaction }
      );

      return {
        message: 'Create successfully.'
      };
    });
  } catch (error) {
    return { error };
  }
};

const exchangeList = async () => {
  try {
    return await Exchange.findAll();
  } catch (error) {
    return { error };
  }
};

const exchangeStatus = async (payload) => {
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

module.exports = {
  giftExchange,
  exchangeList,
  exchangeStatus
};
