import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  let items = [];
  if (req.body?.user?.wishlistId) {
    const shopify = createShopifyClient();

    const client = new shopify.clients.Storefront({
      storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      domain: process.env.SHOPIFY_STORE_DOMAIN,
    });

    const request = req.body.user.favoriteItems.map(async (itemId) => {
      let productReturned = {};
      if (itemId !== "") {
        try {
          const product = await client.query({
            data: `query {
               product(id: "${itemId}") {
                  title
                  description
                  id
                  handle
                  totalInventory
                  featuredImage {
                     url
                  }
                  images (first: 10) {
                     edges {
                        node {
                           url
                        }
                     }
                  }
                  variants(first: 10) {
                     edges {
                        node {
                           id
                           price {
                              amount
                           }
                        }
                     }
                  }
               }
            }`,
          });
          productReturned = product;
        } catch (e) {
          res.send({ error: e.response.errors });
        }
      }

      if (productReturned.body?.data) {
        let productObj = {};
        productObj.id = productReturned.body.data.product?.id;
        productObj.totalInventory =
          productReturned.body.data.product.totalInventory;
        productObj.title = productReturned.body.data.product?.title;
        productObj.description = productReturned.body.data.product?.description;
        productObj.handle = productReturned.body.data.product?.handle;
        productObj.featuredImage =
          productReturned.body.data.product?.featuredImage?.url;
        productObj.price =
          productReturned.body.data.product?.variants.edges[0].node.price.amount;
        productObj.images = productReturned.body.data.product?.images.edges;
        items.push(productObj);
        productObj.variantId =
          productReturned.body.data.product?.variants.edges[0].node.id;
      }
    });
    Promise.all(request)
      .then(() => {
        res.send(items);
      })
      .catch((e) => res.send({ error: e }));
  } else {
    res.send({ error: "No id" });
  }
}
