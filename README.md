# penguins

This is a work in progress art project. Intended to be backend for a small collection game to be played by scanning qr code stickers in Melbourne.

## Todo

- test on vps / domain name
- add penguins
- add collection count details to users (this can be a hard function to count the penguin names to collection type mapping?)
- prettify the pages a LOT
- add a "recently collected" penguins live feed to all pages?
-

## Verbiage to use when writing out explanations:

Scan QR Codes: Players find and scan QR codes in various locations around Melbourne.
Collect Penguins: Players can choose to add the discovered penguin to their collection by linking it to their username.
Suburb-Specific Penguins: Some penguins are only available in specific suburbs.
Street-Specific Penguins: Certain penguins are found only on popular streets.
Rarity: Some penguins are rarer and harder to find, making them special additions to a collection.
Collection Tracking: Players can see how many penguins they have collected overall and within specific suburbs.

## Ideas to implement maybe

- Add descriptions or short made up backstories to penguins
- Add a "recently collected" penguins live feed to the homepage
  - This could show "username" collected "penguin name" x days ago
- If someone finds the "suburb penguin", then show the street name for the "street penguin" in that area
- Sharing and social links, this might help with publicity if people want

## Warnings

- docker written but not used yet

## Set up

POSTGRES LOCAL

- sudo docker compose -f docker-compose.dev.yml up -d
- sudo docker compose -f docker-compose.dev.yml down

FRONTEND LOCAL

- npm run dev

BACKEND LOCAL

- npm run dev

## Notes

- https://www.stickeroo.com.au/products/circle-stickers-premium-laminated-white-vinyl
  - Can do smaller amounts, and pricing works same as above
  - High tack with lamination seems the best so far
  - $17 minimum for 10
- ssh penguinuser@170.64.238.174

## Penguins to print

### Drop 1

- Common
  Cool 3d penguin

Kensington
Brunswick
CBD
Carlton

Sydney Road
Lygon Street

### Drop 2

Fitzroy
Collingwood
St Kilda

### Drop 3

South Yarra
Richmond
