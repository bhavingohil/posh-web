export default async function handler(req, res) {
  const response = await fetch(
    "https://posh-consignment-by-v-boca.myshopify.com/admin/api/2022-10/storefront_access_tokens.json",
    {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": "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",
      },
    }
  );
  const tokens = await response.json();
  let accessTokens = [];
  if (tokens.storefront_access_tokens) {
    tokens.storefront_access_tokens.map((token) => {
      accessTokens.push(token.id);
    });
    accessTokens.map(async (id) => {
      await fetch(
        `https://posh-consignment-by-v-boca.myshopify.com/admin/api/2022-10/storefront_access_tokens/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "X-Shopify-Access-Token": "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",
          },
        }
      );
    });
  }
}
