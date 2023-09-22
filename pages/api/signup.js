import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const user = req.body.userForm;

  const shopify = createShopifyClient();

  const storefrontClient = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });
  try {
    const products = await storefrontClient.query({
      data: {
        query: `mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                firstName
                lastName
                email
                id
                metafield(key: "wishlist", namespace: "wishlist") {
                  id
                  value
                }
              }
              customerUserErrors {
                field
                message
                code
              }
            }
          }`,
        variables: {
          input: user,
        },
      },
    });

    if (products.body.data.customerCreate.customer) {
      res.send(products.body.data.customerCreate);
    } else {
      res.send(products.body.data.customerCreate.customerUserErrors);
    }
  } catch (e) {
    res.send(e.response);
  }
}
