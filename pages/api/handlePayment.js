import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const { products } = req.body;
  const shopify = createShopifyClient();

  const client = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });
  try {
    const response = await client.query({
      data: {
        query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
            email
            webUrl
        }
        checkoutUserErrors {
            message
        }
        queueToken
      }
    }`,
        variables: {
          input: {
            lineItems: products || [],
          },
        },
      },
    });
    res.send(response.body.data.checkoutCreate.checkout);
  } catch (e) {
    res.send(e);
  }
}
