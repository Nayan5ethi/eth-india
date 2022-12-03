import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNFOTMwMTUzNkIxNjBFMTNlNzgyNEJiRkYxZjA0YkM0QkJGQjRBODMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNDg0NDk4NDEsIm5hbWUiOiJldGgtaW5kaWEtcmVhY3QifQ.m-ISyGy_xJTuMMUeCEcpM54eJOcS1Bd_ZHeAQyhZ6z0'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

export async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    return {cid:cid, name:files[0].name}
}
