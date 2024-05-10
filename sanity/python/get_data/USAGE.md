## How to use this?

1. Get data from `Google Sheets` API and format them

```bash
python ./sanity/python/get_data/get_data.py
```

2. Import `.ndjson` file to `Sanity CMS`

```bash
npx @sanity/import -p 68r5ov2e -d production -t skwTXCsbhsbq0MpsVF3Jr5HPb3oXydhse9lOMlcd09VCUXgl5WRImKiOTIkXMSWLjsh536uLneWRTNI8e9D2P8kW3qUO8edHSToSPjeOU1P9RQJ8Pzx1I5IS9Yg6p7wXdnlxVIU8PmDe3nKvYFIV9qmDr04HvyGiHGKZxOvP5Su7kWqT6u7t python/get_data/formatted_data.ndjson

```
