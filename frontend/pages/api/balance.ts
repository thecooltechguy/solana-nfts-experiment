// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Connection} from '@metaplex/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connection = new Connection('mainnet-beta');
  const ownerPublickey = new PublicKey('FvWDz96asutR5k3agFF9gPKrsKNvVzmaqMdkffE87SGm');
  
  const tokenMint = '9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK';
  const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
  const tokenMetadata = await Metadata.load(connection, metadataPDA);
  console.log(tokenMetadata.data);

  const nftsmetadata = await Metadata.findDataByOwner(connection, ownerPublickey);
  console.log(nftsmetadata)

  res.status(200).json({ name: 'John Doe' })
}
