const adminRepository = require('../repository/admin.repository');
const auth = require('../auth');

const login = async (payload) => {
  const adminInfo = await adminRepository.getAdminInfo(payload);

  if (!adminInfo) {
    return {
      error: 'User not exist.'
    };
  }

  const { password } = payload;
  const instanceMethods = adminInfo._modelOptions.instanceMethods;
  const passwordIsMatching = instanceMethods.validPassword(password, adminInfo.password);

  if (!passwordIsMatching) {
    return {
      error: 'Wrong Password.'
    };
  }

  const token = auth.signToken({
    id: adminInfo.id,
    username: adminInfo.user_name
  });

  return token;
};

module.exports = {
  login
};
