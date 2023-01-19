//@ts-check

/**
 *
 * @param {string} name
 * @returns {string}
 */
function getEnvVar(name) {
  const val = process.env[name];
  if (!val) {
    throw new Error(`env variable ${name} not defined`);
  }
  return val;
}

const config = {
  contractAddress: getEnvVar("REACT_APP_CONTRACT_ADDRESS"),
};

export default config;
