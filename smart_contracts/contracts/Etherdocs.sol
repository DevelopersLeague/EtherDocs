// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Issuer {
    string name;
    address addr;
    bool isCreated;
}

struct User {
    string name;
    address addr;
    bool isCreated;
}

struct Certificate {
    string name;
    address issuerAddr;
    address userAddr;
    string uuid;
    string hashValue;
    string ipfsUrl;
    bool isCreated;
    bool isValid;
}

contract Etherdocs {
    address adminAddr;

    mapping(address => Issuer) issuers;
    address[] issuerAddrs;

    mapping(address => User) users;
    address[] userAddrs;

    mapping(string => Certificate) certificates;
    string[] certificateUUIDs;

    constructor() {
        adminAddr = msg.sender;
    }

    function registerUser(string memory _name) public {
        address addr = msg.sender;
        User storage user = users[addr];
        require(user.isCreated == false, "user already registered");
        require(isIssuer(addr) == false, "already registered as issuer");
        user.addr = addr;
        user.isCreated = true;
        user.name = _name;
        userAddrs.push(addr);
    }

    function registerIssuer(string memory _name) public {
        address addr = msg.sender;
        Issuer storage issuer = issuers[addr];
        require(issuer.isCreated == false, "issuer already registered");
        require(isUser(addr) == false, "already registered as user");
        issuer.addr = addr;
        issuer.isCreated = true;
        issuer.name = _name;
        issuerAddrs.push(addr);
    }

    function getProfile()
        public
        view
        returns (address, string memory, string memory)
    {
        address addr = msg.sender;
        if (!isRegistered(addr)) {
            return (addr, "NA", "NA");
        }
        if (isUser(addr)) {
            User memory user = users[addr];
            return (user.addr, user.name, "User");
        } else if (isIssuer(addr)) {
            Issuer memory issuer = issuers[addr];
            return (issuer.addr, issuer.name, "Issuer");
        } else {
            revert("invalid role");
        }
    }

    function issueCertificate(
        string memory _name,
        address _userAddr,
        string memory _uuid,
        string memory _hashValue,
        string memory _ipfsUrl
    ) public {
        require(
            isIssuer(msg.sender) == true,
            "only issuer can issue certificates"
        );
        require(
            isUser(_userAddr) == true,
            "certificate can be issued to users only"
        );
        require(
            certificates[_uuid].isCreated == false,
            "certificate with same uuid already registered"
        );
        address issuerAddr = msg.sender;
        Certificate storage certificate = certificates[_uuid];

        certificate.isCreated = true;
        certificate.name = _name;
        certificate.issuerAddr = issuerAddr;
        certificate.userAddr = _userAddr;
        certificate.uuid = _uuid;
        certificate.hashValue = _hashValue;
        certificate.ipfsUrl = _ipfsUrl;
        certificate.isValid = true;

        certificateUUIDs.push(_uuid);
    }

    function invalidateCertificate(string memory _uuid) public {
        Certificate storage certificate = certificates[_uuid];
        //certificate must exists
        require(certificate.isCreated == true, "invalide certificate uuid");
        // only issuer can invalidate certificates
        require(
            msg.sender == certificate.issuerAddr,
            "only issuer can invalidate certificate"
        );
        certificate.isValid = false;
    }

    function getCertificate(
        string memory _uuid
    )
        public
        view
        returns (string memory, address, address, string memory, string memory, bool)
    {
        Certificate storage certificate = certificates[_uuid];
        // only user and issuer can get certificate details
        require(
            msg.sender == certificate.issuerAddr ||
                msg.sender == certificate.userAddr,
            "only user and issuer can get certificate details"
        );
        return (
            certificate.name,
            certificate.issuerAddr,
            certificate.userAddr,
            certificate.uuid,
            certificate.ipfsUrl,
            certificate.isValid
        );
    }

    function verifyCertificate(
        string memory _uuid,
        address _issuerAddr,
        address _userAddr,
        string memory _hashValue
    ) public view returns (bool) {
        Certificate storage certificate = certificates[_uuid];
        if (!certificate.isValid || !certificate.isCreated) {
            return false;
        }
        if (
            certificate.issuerAddr == _issuerAddr &&
            certificate.userAddr == _userAddr &&
            areEqual(certificate.hashValue, _hashValue)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function isRegistered() public view returns (bool) {
        address _addr = msg.sender;
        return isRegistered(_addr);
    }

    function isUser() public view returns (bool) {
        address _addr = msg.sender;
        return isUser(_addr);
    }

    function isIssuer() public view returns (bool) {
        address _addr = msg.sender;
        return isIssuer(_addr);
    }

    function getCertificatesIssuedFor()
        public
        view
        returns (
            string[] memory
        )
    {
        return getCertificatesIssuedFor(msg.sender);
    }

    function getCertificatesIssuedBy()
        public
        view
        returns ( 
            string[] memory
        )
    {
        return getCertificatesIssuedBy(msg.sender);
    }

    // private functions
    function isUser(address _addr) private view returns (bool) {
        bool is_user = users[_addr].isCreated;
        return is_user;
    }

    function isIssuer(address _addr) private view returns (bool) {
        bool is_issuer = issuers[_addr].isCreated;
        return is_issuer;
    }

    function isRegistered(address _addr) private view returns (bool) {
        bool is_user = users[_addr].isCreated;
        bool is_issuer = issuers[_addr].isCreated;

        if (!is_user && !is_issuer) {
            return false;
        } else {
            return true;
        }
    }

    function areEqual(
        string memory str1,
        string memory str2
    ) private pure returns (bool) {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    function getIssuedForCount(
        address _userAddr
    ) private view returns (uint256) {
        uint256 count = 0;
        for (uint i = 0; i < certificateUUIDs.length; i++) {
            Certificate memory certificate = certificates[certificateUUIDs[i]];
            if (certificate.userAddr == _userAddr) {
                count++;
            }
        }
        return count;
    }

    function getIssuedForCount(
    ) public view returns (uint256) {
        return getIssuedForCount(msg.sender);
    }

    function getCertificatesIssuedFor(
        address _userAddr
    )
        private
        view
        returns (  
            string[] memory
        )
    {
        uint256 count = getIssuedForCount(_userAddr);
        string[] memory ret_uuids = new string[](count);

        uint256 index = 0;

        for (uint i = 0; i < certificateUUIDs.length; i++) {
            Certificate memory certificate = certificates[certificateUUIDs[i]];
            if (certificate.userAddr == _userAddr) {
                ret_uuids[index] = certificate.uuid;
                index++;
            }
        }

        return (ret_uuids);
    }

    function getIssuedByCount(
        address _isserAddr
    ) private view returns (uint256) {
        uint256 count = 0;
        for (uint i = 0; i < certificateUUIDs.length; i++) {
            Certificate memory certificate = certificates[certificateUUIDs[i]];
            if (certificate.issuerAddr == _isserAddr) {
                count++;
            }
        }
        return count;
    }

    function getIssuedByCount(
    ) public view returns (uint256) {
        return getIssuedByCount(msg.sender);
    }

    function getCertificatesIssuedBy(
        address _userAddr
    )
        private
        view
        returns (
            string[] memory
        )
    {
        uint256 count = getIssuedByCount(_userAddr);
        string[] memory ret_uuids = new string[](count);

        uint256 index = 0;

        for (uint i = 0; i < certificateUUIDs.length; i++) {
            Certificate memory certificate = certificates[certificateUUIDs[i]];
            if (certificate.issuerAddr == _userAddr) {
                ret_uuids[index] = certificate.uuid;
                index++;
            }
        }

        return (ret_uuids);
    }
}