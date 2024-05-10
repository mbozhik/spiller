const fs = require('fs')

const sanityClient = require('@sanity/client')
const sanityImport = require('@sanity/import')

const client = sanityClient({
  projectId: '<your project id>',
  dataset: '<your target dataset>',
  token: '<token-with-write-perms>',
  useCdn: false,
})

const input = fs.createReadStream('formatted_data.ndjson')

const options = {
  client: client,
  operation: 'create',

  onProgress: (progress) => {
    /* report progress */
  },

  allowAssetsInDifferentDataset: false,
  allowFailingAssets: false,
  replaceAssets: false,
  skipCrossDatasetReferences: false,
  allowSystemDocuments: false,
}

sanityImport(input, options)
  .then(({numDocs, warnings}) => {
    console.log('Imported %d documents', numDocs)
    console.warn('Warnings:', warnings)
  })
  .catch((err) => {
    console.error('Import failed: %s', err.message)
  })

// npx @sanity/import -p 68r5ov2e -d production -t skwTXCsbhsbq0MpsVF3Jr5HPb3oXydhse9lOMlcd09VCUXgl5WRImKiOTIkXMSWLjsh536uLneWRTNI8e9D2P8kW3qUO8edHSToSPjeOU1P9RQJ8Pzx1I5IS9Yg6p7wXdnlxVIU8PmDe3nKvYFIV9qmDr04HvyGiHGKZxOvP5Su7kWqT6u7t python/formatted_data.ndjson
