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

//      var candidatesSelect = $('#candidatesSelect');
//      candidatesSelect.empty();
  
      for (var i = 1; i <= userCount; i++) {
        userInstance.personalset(i).then(function(useropen) {
          var id = useropen[0];
          var civil_score = useropen[1];
          var interestRate = useropen[2];
          var city = useropen[3];
          var salary = useropen[4];


          // Render candidate Result
          var userTemplate = '<tr id="row$(id)"><td></td><td>' + id + "</td><td>" + civil_score + "</td><td>" + interestRate + "</td><td>" + city + "</td><td>" + salary + '</td></tr>'
          userResults.append(userTemplate);
  
          // Render candidate ballot option
//          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
//          candidatesSelect.append(candidateOption);
          return useropen[5];
        }).then(function(hasPermission) {
          // Do not allow a user to vote
          if(hasPermission==0) {
            temp = "<tr><td>cant share </td></tr>"
            userResults.append(temp);
          }
        });

      }
      loader.hide();
      content.show();

    }).catch(function(error) {
      console.warn(error);
    });
  },
  tryclaim: function(e) {
    var value1 = $("#text-value");
    console.log(value1[0].value)
    var id0 = value1[0].value;

    App.contracts.engine.deployed().then(function(instance){
      claimInstance=instance;
      claimInstance.personalset(id0).then(function(ii){check=ii;
      
      if (check[5]==1){
        claimInstance.claim(id0).then(function(result){
          var user_address = result[0];
          var name = result[1];
          var phone = result[2];
          var email1 = result[3];
          var home = result[4];
          
          var userOutput = $("#user-output");
          var userTemplate1 = '<table><tr><td>Blockchain ID:</td><td>' + user_address + '</td></tr><tr><td>Name</td><td>' + name + '</td></tr><tr><td>Phone:</td><td>' + phone + '</td></tr><tr><td>Email ID:</td><td>' + email1 + '</td></tr><tr><td>Address:</td><td>' + home + '</td></tr></table>'
          userOutput.append(userTemplate1);
        })
      }
    
      else{
        console.log("chalani")
      }
    })
    });
    
/*    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      setTimeout(2);
      document.location.reload(true);
    }).catch(function(err) {
      console.error(err);
    });*/
  }
};


$(function() {
  $(window).load(function() {
    App.init();
  });
});

