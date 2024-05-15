var express = require('express');
var util = require('../config/util.js');
var router = express.Router();

// Include contract interaction library (replace with your actual library)
const MyContract = require('../contracts/ChessGameContract.json');

// Assuming you have a separate function to connect to the blockchain (replace with your implementation)
function connectToBlockchain() {
  // Your blockchain connection logic (e.g., using Web3.js)
}

router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

// Potential integration point for calling win function after successful game
router.post('/game/win', function(req, res) {
  // Assuming you have logic to identify the winner
  const winner = '0xd9145CCE52D386f254917e481eB44e9943F39138'/* Your logic to get winner address */;

  // Connect to the blockchain
  const web3 = connectToBlockchain();

  // Create contract instance
  const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';  // Replace with your contract address
  const myContract = new web3.eth.Contract(MyContract.abi, contractAddress);

  // Call win function on the contract
  myContract.methods.win()
    .send({ from: winner })  // Replace with logic to get winner address for 'from'
    .then((tx) => {
      console.log("Win transaction hash:", tx.transactionHash);
      // Update game state or display win message with rewards information to user
      res.send({ success: true, message: "You won! Rewards claimed." });
    })
    .catch((error) => {
      console.error("Win function call failed:", error);
      res.send({ success: false, message: "Win function call failed." });
    });
});

module.exports = router;
