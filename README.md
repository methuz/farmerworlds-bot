# farmerworlds-bot


I develope this project to use on my own, So some features might not be included for example, breeding. 
Private key safety depends on the server you are running. Use it at your own risk.
This project is not for non-programmer users. No support will be provided.

Feel free to fork or pull request.
Star and follow for upcoming project.

# How to

You need Anchor wallet instead of WAX Wallet to be able to export private key

1. Install NodeJS
2. `npm install`
3. `npm install -g pm2` or use any cron you want
4. config .env
5. config items.json
6. pm2 start index.js --cron "*/10 * * * *" --no-autorestart // Auto refill energy, Auto crops
7. pm2 start scripts/feedCow.js --cron "*/10 * * * *" --no-autorestart //Auto feed cow


```
KEY=<your key (must be anchor)
ACCOUNT=<your account name>
ENABLE_REFILL_ENERGY=<true if you want to auto refill the energy, otherwise put false>
ENERGY_TRSH=<Threshold of missing energy to trigger auto refill>
```

LICENSE MIT
