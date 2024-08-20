const xpub = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/xpub/xpub');
const { HDPublicKey, PublicKey, Address, Networks } = require('bitcore-lib');

  const Xpub = async (ID: any) => {
  const xpubkey = await xpub.pubkey(ID);
  const hdPublicKey = HDPublicKey(xpubkey);
  console.log(xpubkey);
  console.log(hdPublicKey);
  
  for (let i = 0; i < 1; i++) {
 
  const orderPublicKey = hdPublicKey.deriveChild(0).deriveChild(i)
  
  var pubkey = PublicKey(orderPublicKey.publicKey)
  var address = Address.fromPublicKey(pubkey, Networks.testnet)
  console.log("address", address)
 }
}

module.exports = { Xpub };