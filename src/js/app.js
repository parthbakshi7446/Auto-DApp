App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("engine.json", function(engine1) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.engine = TruffleContract(engine1);
      // Connect provider to interact with contract
      App.contracts.engine.setProvider(App.web3Provider);


      return App.render();
    });
  },



  render: function() {
    var userInstance;
    var loader = $("#loader");
    var content = $("#content");
    var claim = $("#claim_btn");
  
    loader.show();
    content.hide();
  
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#account-address").html("Your Account: " + account);
      }
    });
  
    // Load contract data
    App.contracts.engine.deployed().then(function(instance) {
      userInstance = instance;
      return userInstance.userCount();
    }).then(function(userCount) {
      var userResults = $("#user-result");
      userResults.empty();

      userResults.append("<th><td> user ID </td><td> Civil Score </td><td> Interest Rate </td><td> City </td><td> Salary </td></th>");


  
      for (var i = 1; i <= userCount; i++) {
        userInstance.personalset(i).then(function(useropen) {
          var id = useropen[0];
          var civil_score = useropen[1];
          var interestRate = useropen[2];
          var city = useropen[3];
          var salary = useropen[4];
//          var hash = useropen[5];

          // let bufferOriginal = Buffer.from(JSON.parse(hash).data);
          // console.log(bufferOriginal);


          // Render user Result
          var userTemplate = '<tr id="row$(id)"><td></td><td>' + id + "</td><td>" + civil_score + "</td><td>" + interestRate + "</td><td>" + city + "</td><td>" + salary + '</td></tr>'
          userResults.append(userTemplate);
  

          return useropen[5];
        }).then(function(hasPermission) {
          
          if(hasPermission==0) {
            temp = "<p></p>"
            //userResults.append(temp);
          }
        });

      }
      loader.hide();
      content.show();

    }).catch(function(error) {
      console.warn(error);
    });
  },
  add_detail: function(event){

    App.contracts.engine.deployed().then(function(instance2){
      detailInstance=instance2;
      var _name=$('#nam')[0].value;
      var _phno=$('#ph')[0].value;
      var _email=$('#em')[0].value;
      var _house=$('#ho')[0].value;
      var _civil=$('#ci_sc')[0].value;
      var _rate=$('#irate')[0].value;
      var _city=$('#cit')[0].value;
      var _sal=$('#sal')[0].value;
      var _perm=$('#perm')[0].value;
      var _add=$('#add')[0].value;
      detailInstance.addUser(_add,_perm,_name,_phno,_email,_house,_civil,_rate,_city,_sal).then(function(e){
        var last = $('#last');
        var last1 = '<p>user details registered</p>'
        last.append(last1);

      }).catch(function(error){
        console.log(error);
      })
    })



  },
  tryclaim: function(e) {
    var value1 = $("#text-value");
    var id0 = value1[0].value;

    App.contracts.engine.deployed().then(function(instance1){
      claimInstance=instance1;
//      xxxx=claimInstance.userCount();
//      console.log(xxxx);
      return claimInstance.userCount()
    }).then(function(userCount1){
      var userOutput = $("#user-output");
      if (id0>=1 && id0<=userCount1)
      {

      claimInstance.personalset(id0).then(function(ii){check=ii;

      
        if (check[5]==1){
         claimInstance.claim.call(id0).then(function(result){

          var user_address = result[0];
          var name = result[1];
          var phone = result[2];
          var email1 = result[3];
          var home = result[4];
          
          userOutput.append("<h3> Personal Details of User:"+id0+"</h3>");
          var userTemplate1 = '<table><tr><td>Blockchain ID:</td><td>' + user_address + '</td></tr><tr><td>Name</td><td>' + name + '</td></tr><tr><td>Phone:</td><td>' + phone + '</td></tr><tr><td>Email ID:</td><td>' + email1 + '</td></tr><tr><td>Address:</td><td>' + home + '</td></tr></table>'
          
          userOutput.append(userTemplate1);
          })
        }
    
        else{
        console.log("personal details access denied")
        userOutput.empty();
        userOutput.append('<p>User:' + id0 + ' do not want to share Personal Details</p>')
        }
      })
      }
      else{
          userOutput.empty();
          userOutput.append('<p>Enter Valid User ID</p>')
      }
    }); 
  }
};

// const IPFS = require('../../node_modules/ipfs-api');//C:\Users\Parth\Desktop\project\Dapp\Ad_Engine\node_modules
// const ipfs = new IPFS({host: 'ipfs.infura.in', port: 5001, protocol: 'htps'});


$(function() {
  $(window).load(function() {
    App.init();
  });
});

