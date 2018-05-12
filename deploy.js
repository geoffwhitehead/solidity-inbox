const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3")
const { interface, bytecode } = require ("./compile");

//https://rinkeby.infura.io/1sbPLqIfIUFuBhHJV4QW

const provider = new HDWalletProvider(
  "demise depend swamp body license verb ill domain coffee add token cotton",
  "https://rinkeby.infura.io/1sbPLqIfIUFuBhHJV4QW"
)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts  = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0])
  console.log(accounts)

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ["Hi there!"]})
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address)
}

deploy();