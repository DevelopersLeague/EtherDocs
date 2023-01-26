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

  async isUser() {
    return await this.contract.connect(this.signer).isUser();
  }

  async isIssuer() {
    return await this.contract.connect(this.signer).isIssuer();
  }
}

export default EtherDocsClient;
