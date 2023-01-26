//@ts-check
/**@type {import("./EtherDocsClient").default | null} */
let client = null;

export function getClient() {
  if (client == null) {
    throw new Error("client is null");
  } else {
    return client;
  }
}

/**
 *
 * @param {import("./EtherDocsClient").default} _client
 */
export function setClient(_client) {
  client = _client;
}
