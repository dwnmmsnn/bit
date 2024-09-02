const { HDPublicKey, PublicKey, Address, Networks } = require('bitcore-lib');

  const pub = async (pub: any) => {
  const hdPublicKey = HDPublicKey(pub);
  console.log(hdPublicKey);
  
  for (let i = 0; i < 1; i++) {
 
  const orderPublicKey = hdPublicKey.deriveChild(0).deriveChild(i)
  
  var pubkey = PublicKey(orderPublicKey.publicKey)
  var address = Address.fromPublicKey(pubkey, Networks.testnet)
  console.log("address", address)
 }
}

module.exports = { pub };