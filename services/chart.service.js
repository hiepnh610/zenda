const userRepository = require('../repository/user.repository');
const transactionRepository = require('../repository/transaction.repository');

const getTopUserHasHighestPoints = async () => {
  return await userRepository.getTopUserHasHighestPoints();
};

const getTopGivePointsUser = async () => {
  const users = await userRepository.getUserList();
  const transactions = await transactionRepository.getTopGivePointsUser();

  const counts = transactions.reduce((prev, curr) => {
    const count = prev.get(curr.user_request_id) || 0;

    prev.set(
      curr.user_request_id,
      curr.amount + count
    );

    return prev;
  }, new Map());

  const reducedObjArr = [...counts].map(([user_request_id, amount]) => {
    return {
      user_request_id,
      amount
    }
  });

  let topUsers = [];

  users.rows.map((user) => {
    reducedObjArr.forEach((item) => {
      if (item.user_request_id === user.user_id) {
        topUsers.push({
          display_name: user.display_name,
          amount: item.amount
        });
      }
    });
  });

  return topUsers;
};

module.exports = {
  getTopUserHasHighestPoints,
  getTopGivePointsUser
};
