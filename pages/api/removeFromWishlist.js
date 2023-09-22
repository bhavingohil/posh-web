import Shopify from "@shopify/shopify-api";
import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const user = req.body.user;

  const shopify = createShopifyClient();

  const client = new shopify.clients.Graphql({
    session: {
      id: req.body.user.id.substring(23),
      accessToken: process.env.NEXT_PUBLIC_ADMIN,
      shop: process.env.SHOPIFY_STORE_DOMAIN,
    },
  });

  if (user.favoriteItems.length === 0) {
    const data = await client.query({
      data: {
        query: `mutation metafieldDelete($input: MetafieldDeleteInput!) {
          metafieldDelete(input: $input) {
            deletedId
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          input: {
            id: user.wishlistId,
          },
        },
      },
    });
  } else {
    let newString = "";
    if (user.favoriteItems.length !== 0) {
      newString = user.favoriteItems.join(",");
    }

    try {
      const userReturned = await client.query({
        data: {
          query: `mutation customerUpdate($input: CustomerInput!) {
                customerUpdate(input: $input) {
                  customer {
                    id
                    metafields(first: 100) {
                      edges {
                        node {
                          id
                          namespace
                          key
                          value
                        }
                      }
                    }
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }`,
          variables: {
            input: {
              id: req.body.user.id,
              metafields: [
                {
                  id: req.body.user.wishlistId,
                  value: newString,
                },
              ],
            },
          },
        },
      });
    } catch (e) {
      res.send({ ERROR: e });
    }
  }
}
