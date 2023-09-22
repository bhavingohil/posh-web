import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const user = req.body.userForm;

  const shopify = createShopifyClient();

  const storefrontClient = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });
  try {
    const fetchUser = async (accessToken) => {
      try {
        const customer = await storefrontClient.query({
          data: `query {
            customer(customerAccessToken: "${req.cookies.accessToken}") {
              id
              firstName
              lastName
              email
            }
          }`,
        });

        const adminClient = new shopify.clients.Graphql({
          session: {
            id: customer.body.data.customer?.id.substring(23),
            accessToken: process.env.NEXT_PUBLIC_ADMIN,
            shop: process.env.SHOPIFY_STORE_DOMAIN,
          },
        });

        const metafields = await adminClient.query({
          data: `query {
            customer(id: "${customer.body.data.customer?.id}") {
              metafield(namespace: "wishlist", key:"wishlist") {
                id
                value
              }
            }
          }`,
        });

        res.send({
          ...customer.body.data.customer,
          wishlistId: metafields.body.data.customer.metafield?.id,
          favoriteItems:
            metafields.body.data.customer.metafield?.value.split(","),
        });
      } catch (e) {
        res.send({ "FETCH ERROR": e.response?.errors || e });
        res.send({ error: e.response?.errors });
      }
    };

    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      const accessToken = await storefrontClient.query({
        data: {
          query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken,
              expiresAt
            }
            customerUserErrors {
              message
            }
          }
        }`,
          variables: {
            input: user,
          },
        },
      });
      if (accessToken.body.data.customerAccessTokenCreate.customerAccessToken) {
        const head = res.setHeader(
          "Set-Cookie",
          `accessToken=${accessToken.body.data.customerAccessTokenCreate.customerAccessToken.accessToken}; HttpOnly; Secure; expires=${accessToken.body.data.customerAccessTokenCreate.customerAccessToken.expiresAt}`
        );
        fetchUser(
          accessToken.body.data.customerAccessTokenCreate.customerAccessToken
            .accessToken
        );
      } else {
        res.send(
          accessToken.body.data.customerAccessTokenCreate.customerAccessToken
            .customerUserErrors
        );
      }
    } else {
      fetchUser(accessToken);
    }
  } catch (e) {
    res.send({ error: e });
  }
}
