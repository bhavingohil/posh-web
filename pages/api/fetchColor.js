import Shopify from "@shopify/shopify-api";

export default async function handler(req, res) {
  const storefrontClient = new Shopify.Clients.Storefront(
    process.env.SHOPIFY_STORE_DOMAIN,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN
  );
  try {
    let temp = [];
    const products = await storefrontClient.query({
      data: `query {
      products(first: ${req.body.page}) {
         edges {
            node {
               id
               title
               handle
               createdAt
               options {
                  name
                  values 
               }
               tags
               featuredImage {
                  url
               }
               variants (first: 10) {
                  edges {
                     node {
                        price {
                           amount
                        }
                     }
                  }
                 
               }
            }
         }
      }
   }`,
    });
    products.body.data.products.edges.map((product) => {
      if (
        product.node.options[0]["name"] === "Color" &&
        product.node.options[0]["values"][0] === req.body.color
      ) {
        temp.push(product);
      }
    });
    res.send(temp);
  } catch (e) {
    res.send({ error: e.response?.errors || e });
  }
}
