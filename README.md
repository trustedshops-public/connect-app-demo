## Connect App Demo
[![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/trustedshops-public/connect-app-demo/blob/main/LICENSE)

## Public Documentation
This demo App is part of Trusted Shop´s SDK for building plugins based on our new plattform and architecture. You can find our detailed documentation publicly available [here](https://developers.etrusted.com/solutions/newgen-sdk/introduction.html). Please follow these instructions to build your own plugin to connect eTrusted products with a shopsoftwaresystem.


## Getting started

#### Node must be installed on the computer to run the demo application https://nodejs.org/en/

### Download example and install dependencies
- Clone this repository:
```sh
git clone git@github.com:trustedshops-public/connect-app-demo.git
```
- Install npm dependencies:
```sh
cd connect-app-demo
npm install
or
yarn install
```
- then
```sh
yarn run dev
or
npm run dev
```

## Let's play the demo
After you have successfully started the app in your browser you will be presented with a pre-configured setup and a login screen.
### Request Development credentials
To authenticate and get the whole experience,you need Client ID and Client Secret of a Trusted Shops members account.
If you haven't any yet, you can get developer credentials at request for testing. 
Please write to our support team (productintegration@trustedshops.com) to request development credentials.

### Configure your setup
You may change the pre-configuration to your needs.
To do so you want to edit the configuration stated inside baseLayerData in file src/database-container/data-config.ts:
```ts
locale: 'en-GB',
infoSystem: {
    nameOfSystem: 'Demo-app',
    versionNumberOfSystem: '1.0.0',
    versionNumberOfPlugin: '1.0.0',
    allowsEstimatedDeliveryDate: true,
    allowsEventsByOrderStatus: true,
    allowsSendReviewInvitesForPreviousOrders: true,
    allowsSendReviewInvitesForProduct: true,
    allowsEditIntegrationCode: true,
    allowsSupportWidgets: true,
  }

```
Further readings: https://developers.etrusted.com/solutions/newgen-sdk/event_reference.html#information_of_system

For the demo two sales channels are pre-configured. These represent the frontends of a shop.
You can change them by editing 
```ts
salesChannels: [
    {
      id: 'shop-sales-channel-1',
      name: 'Sales Channel EN',
      url: 'www.example.com/en',
      locale: 'en_GB',
    },
    {
      id: 'shop-sales-channel-2',
      name: 'Sales Channel DE',
      url: 'www.example.com/de',
      locale: 'de_DE',
    },
  ]
```
inside configuration file mentioned above.
Further readings: https://developers.etrusted.com/solutions/newgen-sdk/integration/channels.html



