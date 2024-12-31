//@ts-check
import { BrowserProvider ,Contract } from "ethers";

class EtherDocsClient {
  constructor() {
    //@ts-expect-error
    this.provider = new BrowserProvider(window.ethereum);

    // Get the user's account
    this.signer = null
    this.contract = null

  }

  async setup(abi, address){
    this.signer = await this.provider.getSigner()
    this.contract = new Contract(address, abi, this.signer)
  }

  async isRegistered() {
    return await this.contract.connect(this.signer).isRegistered();
  }

  async getProfile() {
    const res = await this.contract.connect(this.signer).getProfile();
    return {
      address: res[0],
      name: res[1],
      role: res[2],
    };
  }
  async getProfileByAddress(address) {
    const res = await this.contract.connect(this.signer).getProfileByAddress(address);
    return {
      address: res[0],
      name: res[1],
      role: res[2],
    };
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
   * @param {string} name
   * @param {string} userAddr
   * @param {string} uuid
   * @param {string} hashValue
   * @param {string} ipfsUrl
   * @returns
   */
  async issueCertificate(name, userAddr, uuid, hashValue, ipfsUrl) {
    try {
      const tx = await this.contract
        .connect(this.signer)
        .issueCertificate(name, userAddr, uuid, hashValue, ipfsUrl);
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
        name: result[0],
        issuerAddr: result[1],
        userAddr: result[2],
        uuid: result[3],
        ipfsUrl: result[4],
        isValid: result[5],
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
      const uuids = await this.contract
        .connect(this.signer)
        .getCertificatesIssuedFor();
      return Promise.all(
        uuids.map((uuid) => {
          return this.getCertificate(uuid);
        })
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCertificatesIssuedBy() {
    try {
      const uuids = await this.contract
        .connect(this.signer)
        .getCertificatesIssuedBy();
      return Promise.all(
        uuids.map((uuid) => {
          return this.getCertificate(uuid);
        })
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default EtherDocsClient;
