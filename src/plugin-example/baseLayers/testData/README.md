
## Using Test Cases with different mock data.

In the baseLayerTest.js file, the mock data variables are replaced with functions that return the values ​​of the selected data.

The selection of data occurs in the switch statement with the condition of the given environment variable.

Environment variables can be added to the .env.test file or written from in the terminal when running the script using the following documentation (https://create-react-app.dev/docs/adding-custom-environment-variables#adding-temporary-environment-variables-in-your-shell)

For example for bash terminal:

```bash
salesChannel=test mappedChannels=development widgetLocation=test productIdentifiers=development widgets=test trustbadge=development reviewChannel=development npm run dev:test
# or
salesChannel=test mappedChannels=development widgetLocation=test productIdentifiers=development widgets=test trustbadge=development reviewChannel=development yarn dev:test

```

The values ​​of the variables are set in string format (dev, test, case1 ...), and the necessary data must be specified in the function

To add new data, you can create the desired case for a particular variable.
For example: we want to add multipleShopChannels, we open the getSalesChannels() function and add a new case and fill in new data:

```js 
export const getSalesChannels = (defaultEnv?: string | number): { [key: string]: string }[] => {
  switch (process.env.salesChannel || (defaultEnv && defaultEnv.toString())) {
    case 'development': // value for dev
      return [
        {
          id: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          name: 'eTrusted TestMock Shop',
          url: 'demoshop.trustedshops.com',
          locale: 'de_DE',
        },
        {
          id: 'shop-1e570f63-10f8-4d5a-ae18-21d3d933eb93',
          name: 'Test shop',
          url: 'http://www.my.shopp/',
          locale: 'en_US',
        },
      ]

    ... // new case for multipleShopChannels
    case 'multipleShopChannels':
      return [
        {
          id: 'german-shop',
          name: '25022022012613_german_shop.com',
          url: '25022022012613_german_shop.com',
          locale: 'de_DE',
        },
        {
          id: 'austria-shop',
          name: '25022022012613_austria_shop.com',
          url: '25022022012613_austria_shop.com',
          locale: 'de_AT',
        },
      ]
    ...//

    default:
      return []
  }
}
```
And then when running the script, add the value `multipleShopChannels` to the `salesChannel` variable : 

```bash
salesChannel=multipleShopChannels mappedChannels=development widgetLocation=test productIdentifiers=dev widgets=test trustbadge=development reviewChannel=development yarn dev:test
```

Environment variable and functions where they are called:

salesChannel - getSalesChannels()

mappedChannels - getMappedChannels()

trustbadge - getTrustbadge()

widgetLocation - getWidgetLocation()

productIdentifiers - getProductIdentifiers()

widgets - getWidgets()

reviewChannel - getValueReviewChannel()

locale - getLocale()

infoSystem - getInformationOfSystem()