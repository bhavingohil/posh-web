import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const shopify = createShopifyClient();

  const client = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });

  try {
    const data = await client.query({
      data: {
        query: `mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
          customerResetByUrl(password: $password, resetUrl: $resetUrl) {
            customerUserErrors {
              code
              field
              message
            }
          }
        }`,
        variables: {
          email: req.body.email,
        },
      },
    });
    res.send(data.body.data.customerRecover.customerUserErrors);
  } catch (e) {
    res.send({ ERROR: e.response?.errors || e });
  }
}
