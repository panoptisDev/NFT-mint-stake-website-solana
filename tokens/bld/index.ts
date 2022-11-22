import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import * as fs from "fs";
import { bundlrStorage, findMetadataPda, keypairIdentity, Metaplex, toMetaplexFile, } from "@metaplex-foundation/js";
import { DataV2, createCreateMetadataAccountV2Instruction, } from "@metaplex-foundation/mpl-token-metadata";

const initializeKeypair = "[174,97,181,249,250,137,239,19,122,63,108,212,123,49,241,74,26,66,234,211,234,180,177,141,214,209,124,209,43,45,79,216,248,109,2,104,147,197,148,136,116,166,51,245,91,79,134,210,50,37,196,15,90,195,49,216,119,192,129,68,115,74,25,193]";
const TOKEN_NAME = "Willow";
const TOKEN_SYMBOL = "WLW";
const TOKEN_DESCRIPTION = "A token for Willows";
const TOKEN_IMAGE_NAME = "collection.png"; // Replace unicorn.png with your image name
const TOKEN_IMAGE_PATH = `tokens/bld/assets/${TOKEN_IMAGE_NAME}`;

async function createBldToken(
  connection: web3.Connection,
  payer: web3.Keypair
) {
    const tokenMint = await token.createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    2
    );
    const metaplex = Metaplex.make(connection).use(keypairIdentity(payer)).use(bundlrStorage({ address: "https://devnet.bundlr.network", providerUrl: "https://api.devnet.solana.com", timeout: 60000, }));
    const imageBuffer = fs.readFileSync(TOKEN_IMAGE_PATH);
    const file = toMetaplexFile(imageBuffer, TOKEN_IMAGE_NAME);
    const imageUri = await metaplex.storage().upload(file);
    const { uri } = await metaplex.nfts().uploadMetadata({ name: TOKEN_NAME, description: TOKEN_DESCRIPTION, image: imageUri, })
    const metadataPda = findMetadataPda(tokenMint);
    const tokenMetadata = { name: TOKEN_NAME, symbol: TOKEN_SYMBOL, uri: uri, sellerFeeBasisPoints: 0, creators: null, collection: null, uses: null, } as DataV2
    const instruction = createCreateMetadataAccountV2Instruction({ metadata: metadataPda, mint: tokenMint, mintAuthority: payer.publicKey, payer: payer.publicKey, updateAuthority: payer.publicKey }, { createMetadataAccountArgsV2: { data: tokenMetadata, isMutable: true }})
    const transaction = new web3.Transaction()
    transaction.add(instruction)

    const transactionSignature = await web3.sendAndConfirmTransaction(connection, transaction, [payer])
}

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const payer = initializeKeypair;
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
