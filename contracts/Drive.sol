// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Drive {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) value;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) ownerShip;
    mapping(address => mapping(address => bool)) prevData;

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address _user) external {
        ownerShip[msg.sender][_user] = true;
        if (prevData[msg.sender][_user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            prevData[msg.sender][_user] = true;
        }
    }

    function disAllow(address _user) external {
        ownerShip[msg.sender][_user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownerShip[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
