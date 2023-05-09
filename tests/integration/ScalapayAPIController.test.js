const server = require('../../index')
const nock = require('nock')
const request = require('supertest')

const mock200RequestBody = {
    body: {
        'totalAmount': {
            'amount': '190.00',
            'currency': 'EUR'
        },
        'consumer': {
            'phoneNumber': '0400000001',
            'givenNames': 'Joe',
            'surname': 'Consumer',
            'email': 'test@scalapay.com'
        },
        'billing': {
            'name': 'Joe Consumer',
            'line1': 'Via della Rosa, 58',
            'suburb': 'Montelupo Fiorentino',
            'postcode': '50056',
            'countryCode': 'IT',
            'phoneNumber': '0400000000'
        },
        'shipping': {
            'name': 'Joe Consumer',
            'line1': 'Via della Rosa, 58',
            'suburb': 'Montelupo Fiorentino',
            'postcode': '50056',
            'countryCode': 'IT',
            'phoneNumber': '0400000000'
        },
        'items': [
            {
                'name': 'T-Shirt',
                'category': 'clothes',
                'subcategory': [
                    'shirt',
                    'long-sleeve'
                ],
                'brand': 'TopChoice',
                'gtin': '123458791330',
                'sku': '12341234',
                'quantity': 1,
                'price': {
                    'amount': '10.00',
                    'currency': 'EUR'
                }
            },
            {
                'name': 'Jeans',
                'category': 'clothes',
                'subcategory': [
                    'pants',
                    'jeans'
                ],
                'brand': 'TopChoice',
                'gtin': '123458722222',
                'sku': '12341235',
                'quantity': 1,
                'price': {
                    'amount': '20.00',
                    'currency': 'EUR'
                }
            }
        ],
        'discounts': [
            {
                'displayName': '10% Off',
                'amount': {
                    'amount': '3.00',
                    'currency': 'EUR'
                }
            }
        ],
        'merchant': {
            'redirectConfirmUrl': 'https://portal.integration.scalapay.com/success-url',
            'redirectCancelUrl': 'https://portal.integration.scalapay.com/failure-url'
        },
        'merchantReference': 'merchantOrder-1234',
        'taxAmount': {
            'amount': '3.70',
            'currency': 'EUR'
        },
        'shippingAmount': {
            'amount': '10.00',
            'currency': 'EUR'
        },
        'type': 'online',
        'product': 'pay-in-3',
        'frequency': {
            'number': '1',
            'frequencyType': 'monthly'
        },
        'orderExpiryMilliseconds': 600000
    }
}

describe('Call POST Scalapay API', () => {
  const expectedResponse = { token: '', expires: '', checkoutUrl: '' }
  const expectedResponseProperties = ['token', 'expires', 'checkoutUrl']

  beforeAll(() => {
    nock(process.env.SCALAPAY_DOMAIN).post('/v2/orders').reply(200, expectedResponse);
  })

  afterAll(async () => {
    await server.close()
  })

  describe('Given correct body', () => {
    test(`should return 200 and response properties ${expectedResponseProperties}`, async () => {
      return request(server).post('/orders').send(mock200RequestBody).expect(200, expectedResponse)
    })
  })
})


