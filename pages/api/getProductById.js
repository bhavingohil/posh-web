import { createShopifyClient } from "../../utils/ShopifyClient";

export default async function handler(req, res) {
  const shopify = createShopifyClient();

  const storefrontClient = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });

  try {
    const product = await storefrontClient.query({
      data: `
        query {
            productByHandle(handle: "${req.body.handle}") {
               title
               description 
               totalInventory
               id
               options {
                  name
                  values
               }
               handle
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
    let productObj = {};
    productObj.id = product.body.data.productByHandle.id;
    productObj.title = product.body.data.productByHandle.title;
    productObj.totalInventory =
      product.body.data.productByHandle.totalInventory;
    productObj.description = product.body.data.productByHandle.description;
    productObj.handle = product.body.data.productByHandle.handle;
    productObj.featuredImage =
      product.body.data.productByHandle.featuredImage?.url;
    productObj.price =
      product.body.data.productByHandle.variants.edges[0].node.price.amount;
    productObj.images = product.body.data.productByHandle.images.edges;
    product.body.data.productByHandle.options.map((option) => {
      productObj[option.name] = option.values;
    });
    productObj.variantId =
      product.body.data.productByHandle.variants.edges[0].node.id;
    res.json(productObj);
  } catch (e) {
    res.send({ error: e });
  }
}
