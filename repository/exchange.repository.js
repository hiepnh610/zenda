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
        { receive_bag: getUserInfo.receive_bag - getTransactionInfo.amount },
        { transaction }
      );

      return {
        message: 'Delete successfully.'
      };
    });
  } catch (error) {
    return { error };
  }
};

module.exports = {
  giftExchange
};
