//@ts-check
import { providers, Contract } from "ethers";

class EtherDocsClient {
  constructor(abi, address) {
    //@ts-expect-error
    this.provider = new providers.Web3Provider(window.ethereum);

    // Get the user's account
    this.signer = this.provider.getSigner();

    this.contract = new Contract(address, abi, this.signer);
  }

  async isRegistered() {
    return await this.contract.connect(this.signer).isRegistered();
  }

  async getProfile() {
    return await this.contract.connect(this.signer).getProfile();
  }

  /**
   * @param {string} name
   */
  async registerUser(name) {
    const tx = await this.contract.connect(this.signer).registerUser(name);
    await tx.wait();
    console.log("user registered");
  }

  /**
   * @param {string} name
   */
  async registerIssuer(name) {
    const tx = await this.contract.connect(this.signer).registerIssuer(name);
    await tx.wait();
    console.log("issuer registered");
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isUser() {
    return await this.contract.connect(this.signer).isUser();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isIssuer() {
    return await this.contract.connect(this.signer).isIssuer();
  }

  /**
   *
   * @param {string} userAddr
   * @param {string} uuid
   * @param {string} hashValue
   * @param {string} ipfsUrl
   * @returns
   */
  async issueCertificate(userAddr, uuid, hashValue, ipfsUrl) {
    try {
      const tx = await this.contract
        .connect(this.signer)
        .issueCertificate(userAddr, uuid, hashValue, ipfsUrl);
      await tx.wait();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * @param {string} uuid
   * @returns
   */
  async invalidateCertificate(uuid) {
    try {
      const tx = await this.contract
        .connect(this.signer)
        .invalidateCertificate(uuid);
      await tx.wait();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * @param {string} uuid
   */
  async getCertificate(uuid) {
    try {
      const result = await this.contract
        .connect(this.signer)
        .getCertificate(uuid);
      return {
        issuerAddr: result[0],
        userAddr: result[1],
        uuid: result[2],
        ipfsUrl: result[3],
        isValid: result[4],
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   *
   * @param {string} uuid
   * @param {string} issuerAddr
   * @param {string} userAddr
   * @param {string} hashValue
   * @returns
   */
  async verifyCertificate(uuid, issuerAddr, userAddr, hashValue) {
    try {
      const result = await this.contract
        .connect(this.signer)
        .verifyCertificate(uuid, issuerAddr, userAddr, hashValue);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCertificatesIssuedFor() {
    try {
      const [issuers, users, uuids, ipfsUrls, isValids] = await this.contract
        .connect(this.signer)
        .getCertificatesIssuedFor();
      return issuers.map((issuerAddr, index) => {
        return {
          issuerAddr,
          userAddr: users[index],
          uuid: uuids[index],
          ipfsUrl: ipfsUrls[index],
          isValid: isValids[index],
        };
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCertificatesIssuedBy() {
    try {
      const [issuers, users, uuids, ipfsUrls, isValids] = await this.contract
        .connect(this.signer)
        .getCertificatesIssuedBy();
      return issuers.map((issuerAddr, index) => {
        return {
          issuerAddr,
          userAddr: users[index],
          uuid: uuids[index],
          ipfsUrl: ipfsUrls[index],
          isValid: isValids[index],
        };
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default EtherDocsClient;
