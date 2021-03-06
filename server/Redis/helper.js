const getAsync = (client, key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        console.error(`Error retrieving value for ${key}: ${error}`);
        reject(error);
      }
      resolve(result);
    });
  });
};

const delAsync = (client, keys) => {
  return new Promise((resolve, reject) => {
    client.del(keys, (error, result) => {
      if (error) {
        console.error(`Error deleting keys ${keys}: ${error}`);
        reject(error);
      }
      resolve(result);
    });
  });
}

const formatAuthSecret = token => `auth-${token}`;

const formatAuthSocket = token => `socket-${token}`;

const formatAccessToken = clientId => `access-token-${clientId}`;
const formatAccessTokenSecret = clientId => `access-token-secret-${clientId}`;

module.exports = {
  getAsync,
  delAsync,
  formatAuthSecret,
  formatAuthSocket,
  formatAccessToken,
  formatAccessTokenSecret
};
