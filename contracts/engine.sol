pragma solidity ^0.5.0;

contract engine{

    struct user_parameter{
        uint u_id;
        uint civil_score;
        uint interestRate;
        string city;
        string salary;
        uint permission;
//        string param6;
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

    mapping(uint => address) private integerset;

    mapping(address => user_info) private userinfo; //private

    mapping(uint => user_parameter) public personalset;

    constructor() public{
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth","111-111-111", "parth1@gm.com","CP",800,10,"Delhi","100000");
        addUser(0x770A036484E998662d29196F39887B761ecadDB1,1,"parth2","222-222-222", "parth2@gm.com","keshav puram",900,12,"Mumbai","200000");
        addUser(0xC257274276a4E539741Ca11b590B9447B26A8051,0,"parth3","333-333-333", "parth3@gm.com","ashok vihar",1800,12,"Delhi","300000");
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth4","444-444-444", "parth4@gm.com","city park",1000,12,"Lucknow","400000");
        addUser(0x3E6C109e49A7A1eFfE3Bb82EF436bf524E71ECC4,0,"parth5","555-555-555", "parth5@gm.com","rohini",900,10,"Chandigarh","500000");
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth6","111-111-111", "parth6@gm.com","CP",800,10,"Delhi","100000");
        addUser(0x770A036484E998662d29196F39887B761ecadDB1,1,"parth7","222-222-222", "parth7@gm.com","keshav puram",900,2,"Mumbai","200000");
        addUser(0xC257274276a4E539741Ca11b590B9447B26A8051,0,"parth8","333-333-333", "parth8@gm.com","ashok vihar",1800,12,"Delhi","300000");
        addUser(0xaDE14d335409696E0057151c4dF025E4AF83d228,1,"parth9","444-444-444", "parth9@gm.com","city park",1000,12,"Lucknow","400000");
        addUser(0x3E6C109e49A7A1eFfE3Bb82EF436bf524E71ECC4,0,"parth0","555-555-555", "parth0@gm.com","rohini",900,12,"Chandigarh","500000");
    }

    function addUser(address aa, uint _perm,string memory _name,string memory _phno,string memory _email,string memory _home,uint _civilscore,uint _interestRate,string memory _city,string memory _salary) 
    public{
        userCount++;
        integerset[userCount]=aa;
        userinfo[aa]=user_info(userCount,aa,_name,_phno,_email,_home);
        personalset[userCount]=user_parameter(userCount,_civilscore,_interestRate,_city,_salary,_perm);

    }

    function claim(uint _id) 
    public
    returns (address a1,string memory out1,string memory out2,string memory out3,string memory out4) {
        require(personalset[_id].permission==1);
        a1 = integerset[_id];
        out1 = userinfo[a1].name;
        out2 = userinfo[a1].phno;
        out3 = userinfo[a1].email;
        out4 = userinfo[a1].house_address;
        return (a1,out1,out2,out3,out4);

    }

}