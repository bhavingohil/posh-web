import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const shopify = createShopifyClient();

  const client = new shopify.clients.Graphql({
    session: {
      id: req.body.user.id.substring(23),
      accessToken: process.env.NEXT_PUBLIC_ADMIN,
      shop: process.env.SHOPIFY_STORE_DOMAIN,
    },
  });

  if (req.body.user.wishlistId) {
    let newString = req.body.id;
    const request = req.body.user.favoriteItems.map((item) => {
      newString = newString + "," + item;
    });
    try {
      Promise.all(request).then(async () => {
        const userReturned = await client.query({
          data: {
            query: `mutation customerUpdate($input: CustomerInput!) {
               customerUpdate(input: $input) {
                 customer {
                   id
                   email
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
      });
      res.send(req.body.user.favoriteItems.push(req.body.id));
    } catch (e) {
      res.send({ ERRORS: e.response?.errors || e });
    }
  } else {
    try {
      const userReturned = await client.query({
        data: {
          query: `mutation customerUpdate($input: CustomerInput!) {
             customerUpdate(input: $input) {
               customer {
                 id
                 email
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
                  namespace: "wishlist",
                  key: "wishlist",
                  type: "single_line_text_field",
                  value: req.body.id,
                },
              ],
            },
          },
        },
      });

      res.send({
        wishlistId:
          userReturned.body.data.customerUpdate.customer.metafields.edges[0]
            .node.id,
        favoriteItems: [
          userReturned.body.data.customerUpdate.customer.metafields.edges[0]
            .node.value,
        ],
      });
    } catch (e) {
      res.send({ EROR: e });
    }
  }
}
