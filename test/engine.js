var engine = artifacts.require("./engine.sol");

contract("engine",function(accounts){ 

    it("intializes with 5 candidates",function(){
        return engine.deployed().then(function(instance){
            return instance.userCount();
        }).then(function(count){
            assert.equal(count,5);
        })
    })

    

});