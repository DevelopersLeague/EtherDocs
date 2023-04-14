<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://user-images.githubusercontent.com/56788568/231415603-6ba5f1a4-8332-4e4b-8e33-b314fdbb6b71.png" alt="Logo" width="" height="80">
  </a>


  <p align="center">
    A Student Document Management System based on Ethereum Blockchain
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"> Demo </a>
    ·
    <a href="https://docs.google.com/document/d/1sppiQj26EkYNXkIXrftMLM5NyRNs-Max/edit?usp=sharing&ouid=115366311442097501535&rtpof=true&sd=true"> Project Report </a>
    ·
    <a href="https://docs.google.com/presentation/d/1nivByAA7K9lYjc4rBcU_hRLC60PjHlErP0Kn1kY2ooQ/edit?usp=sharing">Slide deck</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">



https://user-images.githubusercontent.com/56788568/231788183-82c27094-03e5-41fb-978c-b225dc37c579.mp4


</p> 


Etherdocs is a project that aims to implement an efficient anti-forgery mechanism for academic documents, such as mark sheets, transcripts, diplomas, and other certificates. The goal is to ensure the authenticity of academic documents, reducing the incidence of counterfeit certificates, and saving time and financial resources for all parties involved in document verification.

The solution proposed by Etherdocs revolves around three roles or entities: **an Issuer, a Verifier, and a Student**. 
* The issuer is the authority that creates and issues the electronic version of the certificate, eg: A university issuing graduating certificates
* Verifier is the potential employer or any person who wants to verify the authenticity of the certificate provided by the student, eg: A potential employer doing background check. 
* Finally, the student is the recipient of the certificate and can only view the documents issued to him.

 Etherdocs is a project that provides an efficient anti-forgery mechanism for academic documents. By using a combination of blockchain, IPFS, and hash functions, the authenticity of the certificate can be ensured, reducing the incidence of counterfeit certificates and saving time and financial resources for all parties involved in document verification.
 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- **Immutable transactions:** Blockchain being an immutable ledger will not allow any room for tampering
- **On-time donations:** Normally it might even take many months upto years for gathering of funds and deliverun to the needy people due to the tedious and manual nature of existing systems, but Blockchain technology ensures that the transactions will not take a long time to transfer funds to deprived people
- **Eliminating middlemen:** Blockchain eliminates the need for a middleman due to Peer-to-Peer transactions. With large, centralized charities, there is always the possibility that too many levels of management will eat into their funds. With blockchain-based charities, the number of middlemen between donors and those they want to help is brought to a minimum
- **Clear and concise UI:** The front-end is built with minimalistic Chakra UI components. Since users are generally cautious when it comes to transactions, the application provides descriptive steps through toastcards, alerts, etc.

## Motivation

The existing fundraising platforms suffer from the following problems:
- Even with legitimate charitable organizations, some of these charities only allocate a small portion of their donations to the actual cause and the remaining goes to corporate sponsors and private operators.
- Tampering of transactions

**Enter blockchain technology**, an immutable ledger where every record can be traced to its creation. Decentralized and distributed among its users, blockchain allows them to track transactions and be sure of the absence of fraudulent activities.


**Why only Ethereum Blockchain**

- The currency of Ethereum network is Ether which is a well established cryptocurrency. These days there are many new cryptocurrencies Scam Initial Coin Offerings(ICO) are completely fabricated, with fake bios of nonexistent team members and technical whitepapers
- The community of developers which would help us in bug resolution

## Corner-cases

**What if owner of fund is not a legitimte person and uses the fund for his own benefits after withdrawal?**
- A safety and trust team could be created to verify personal information, the identity of recipients, and they make sure that all funds raised on Etherfunds are going to the right place. They work closely with state and local officials and law enforcement to assist in any investigations.
- The goal is to automate the process with least human interactions therby eliminating any chances of malpractice during transaction and establishing a P2P network

**What if owner is a NGO and then they distribute money to management as well as to the cause, but they majorly used their funds for management, can you do something about it?**
- same as above
- Or we can have seperate privacy policies or terms of usage for such cases

<br />

## Architecture 

We tried to follow ideal Software Development Design Principles such as.
- Do not repeat yourself (DRY)
- Keep it short and simple (KISS)
- You Ain’t Gonna Need It (YAGNI)

<br />

The presentation for Etherfunds can be found [here](https://www.canva.com/design/DAE3pEWUc1Y/Lrnk-dxztwBzIL4UkxrQvg/view#1).

### Block diagram

- The block diagram shows the overview of the system.
<br />
<img src="./docs/block_digram_svg.svg" />
<br />

### E-R diagram

- ER diagram shows the databases involved

<br />
<img src="./docs/er_diagram.svg" width="90%"/>
<br />


## Technologies Used

- Workflow and Architecture Design
  - Excalidraw • Draw.io
- Frontend
  - React.js and related packages
  - CSS and related packages
- Blockchain network: Ethereum
- Smart contracts are written in **Solidity** programming language
- Smart contracts compilation and deployment to test network was done using **Hardhat**
- Blockchain wallet used: **MetaMask** 
- Javascript library to communicate with blockchain: **Ethers.js**


## Local-Setup

1. clone the project to your local environment
2. make sure you have node.js version ^14.19.0
3. make sure you have npm version ^8.5.5
4. run `$ npm install` to install dependencies for react app
5. run `$ cp .env.example .env.development.local`
6. run `$ cd src/backend` to cd into the backend directorry
7. run `$ npm install` to install dependencies for the backend
8. open two terminals in one terminal run `$ npx hardhat node` to start a local blockchain
9. in second terminal run `$ npx hardhat run --network localhost scripts/deploy_etherfund.js` to deploy the smart contract and copy the address printed in the terminal
10. open the `.env.development.local` file from project root and set the variable `REACT_APP_CONTRACT_ADDRESS` to the address copied above
11. run `$ cd ../..` to go back to the project root and run `$ npm start` to start the react project
12. Now in your React-app, enter password in your metamask wallet or any other blockchain wallet
13. Switch to TestNetwork or add one preferably having `RPC URL` as ```http://localhost:8545``` with chain-id of 31337
14. Create dummy accounts, you can find the private keys of dummy accounts in the terminal where ``npx hardhat node`` was ran
15. You may see an error in browser console of ``call revert exception``, in that case, kindly reset your account and refresh the page
16. You can use the site, congrats 🎉
17. In case of any other errors, kindly create an [issue here](https://github.com/DevelopersLeague/Etherfunds/issues/new)


### License 📜

[GNU General Public License v3.0](/LICENSE)

### Authors

- Aniket More
    - [LinkedIn](https://www.linkedin.com/in/aniket-more-2b97571b1/) • [Twitter](https://twitter.com/aniket_more311) 
- Chirag Mahajan
    - [Linkedin](https://www.linkedin.com/in/chirag-mahajan-b09144137/) • [GitLab](https://gitlab.com/chiragmahajan3101)
- Shyren More
    - [LinkedIn](https://www.linkedin.com/in/shyrenmore/) • [Gmail](mailto:shyren.more30@gmail.com)
<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
