# farmerworlds-bot

I develope this project to use on my own, So some features might not be included for example, breeding.
Feel free to fork or pull request

You need Anchor wallet instead of WAX Wallet to be able to export private key

1. Install NodeJS
2. `npm install`
3. `npm install -g pm2` or use any cron you want
4. config .env

```
KEY=<your key (must be anchor)
ACCOUNT=<your account name>
ENABLE_REFILL_ENERGY=<true if you want to auto refill the energy, otherwise put false>
ENERGY_TRSH=<Threshold of missing energy to trigger auto refill>
```
