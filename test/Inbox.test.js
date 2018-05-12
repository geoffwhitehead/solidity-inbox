const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require ("../compile");

let accounts;
let inbox;
let initialString = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: [initialString]})
    .send({ from: accounts[0], gas: "5000000"});

  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploys a contract", ()=>{
    assert.ok(inbox.options.address);
  })

  it("it has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialString)
  })

  it("can change the message", async () => {
    const newMessage = "Bye"
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage)
  })
})