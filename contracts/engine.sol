pragma solidity ^0.5.0;

contract engine{

    struct user_parameter{
        uint u_id;
        uint civil_score;
        uint interestRate;
        string city;
        string salary;
        uint permission;
    }

    struct user_info  {
        uint u_id;
        address block_id;
        string name;
        string phno;
        string email;
        string house_address;

    }
    uint public userCount;
    mapping(uint => address) public integerset;

    mapping(address => user_info) public userinfo; //private

    mapping(uint => user_parameter) public personalset;

    constructor() public{
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth","989818", "part1@gm.com","keshav",800,12,"delhi","100000");
        addUser(0x770A036484E998662d29196F39887B761ecadDB1,1,"parth2","989811", "part2@gm.com","keshav2",800,12,"delhi2","200000");
        addUser(0xC257274276a4E539741Ca11b590B9447B26A8051,1,"parth3","989817", "part3@gm.com","keshav3",800,12,"delhi3","300000");
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth4","989817", "part4@gm.com","keshav4",800,12,"delhi4","400000");
        addUser(0x3E6C109e49A7A1eFfE3Bb82EF436bf524E71ECC4,1,"parth5","989817", "par5t@gm.com","keshav5",800,12,"delhi5","500000");
    }

    function addUser(address aa, uint _perm,string memory _name,string memory _phno,string memory _email,string memory _home,uint _civilscore,uint _interestRate,string memory _city,string memory _salary) public{
        userCount++;
        integerset[userCount]=aa;
        userinfo[aa]=user_info(userCount,aa,_name,_phno,_email,_home);
        personalset[userCount]=user_parameter(userCount,_civilscore,_interestRate,_city,_salary,_perm);

    }

    function claim(uint _id) public returns (address a1,string memory out1,string memory out2,string memory out3,string memory out4) {
        
        a1 = integerset[_id];
        out1 = userinfo[a1].name;
        out2 = userinfo[a1].phno;
        out3 = userinfo[a1].email;
        out4 = userinfo[a1].house_address;
        return (a1,out1,out2,out3,out4);

    }

}