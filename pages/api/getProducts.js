import { createShopifyClient } from "../../utils/ShopifyClient";

const filterOptions = (product, selectedOption, selectedFilter) => {
  const filteredOption = product.options.find(
    (option) => option.name === selectedOption
  );

  if (filteredOption && filteredOption.values.includes(selectedFilter)) {
    return true;
  }
  return false;
};

export default async function handler(req, res) {
  const { page, filters, categories, sortOption, colors, priceFilter } =
    req.body;
  const shopify = createShopifyClient();

  const storefrontClient = new shopify.clients.Storefront({
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
  });

  let result;
  const getMore =
    !!colors ||
    !!filters?.designer ||
    !!filters?.category ||
    !!filters?.material ||
    categories?.length > 0;

  try {
    let params = `first: ${getMore ? 250 : page}${
      sortOption?.option?.length > 0
        ? `, sortKey: ${sortOption?.option}, reverse: ${sortOption?.setReverse}`
        : ""
    }`;
    const products = await storefrontClient.query({
      data: `query {
      products(${params}) {
         edges {
            node {
               id
               title
               handle
               totalInventory
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
                        id
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
    if (filters?.designer || filters?.category || filters?.material) {
      let productsReturned = products.body.data.products.edges;
      const temp = productsReturned.filter((product, i) => {
        if (
          filters?.designer &&
          (product.node.tags?.includes(filters?.designer.toLowerCase()) ||
            filterOptions(product.node, "Designer", filters?.designer?.trim()))
        ) {
          return true;
        }

        if (
          filters?.category &&
          (product.node.tags?.includes(filters?.category.toLowerCase()) ||
            filterOptions(product.node, "Category", filters?.category?.trim()))
        )
          return true;
        if (
          filters?.material &&
          (product.node.tags?.includes(filters?.material.toLowerCase()) ||
            filterOptions(product.node, "Material", filters?.material?.trim()))
        )
          return true;
        return false;
      });

      result = temp;
    } else {
      result = products.body.data.products.edges;
    }

    if (colors?.length > 0) {
      let temp = result;

      result = temp.filter((product) => {
        const options = product.node.options;
        for (let i = 0; i < options.length; i++) {
          if (
            options[i]["name"] === "Color" &&
            options[i]["values"].indexOf(colors) > -1
          ) {
            return true;
          }
        }
        return false;
      });
    }

    if (categories?.length > 0) {
      let temp = result;
      result = temp.filter((product) =>
        product.node.tags.some(
          (tag) =>
            categories.includes(tag) ||
            categories?.map((v) => v?.toLowerCase()).includes(tag)
        )
      );
    }

    if (priceFilter) {
      let temp = result;
      result = temp.filter(
        (item) => item.node.variants.edges[0].node.price.amount <= priceFilter
      );
    }

    res.send(result);
  } catch (e) {
    console.log("error here", JSON.stringify(e));
    res.send({ error: e?.response?.errors || e });
  }
}
