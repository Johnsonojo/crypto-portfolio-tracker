import axios from "axios";
import { load } from "cheerio";

const coinPortfolioHoldings = async (numberOfTokens, actualTokenName) => {
  try {
    const tokenDetailUrl = `https://coinmarketcap.com/currencies/${actualTokenName}/`;
    const response = await axios.get(tokenDetailUrl);
    const $ = load(response.data);
    const tokenPrice = $(".main-content")
      .find(".priceTitle")
      .find(".priceValue")
      .find("span")
      .text();
    const cleanedTokenPrice = tokenPrice.replace(/\$/g, "");
    const portfolioHolding = numberOfTokens * cleanedTokenPrice;
    return portfolioHolding;
  } catch (error) {
    console.log(error.message);
  }
};

const getTotalPortfolioHoldings = async () => {
  const first = await coinPortfolioHoldings(471000, "unistake");
  const second = await coinPortfolioHoldings(3000, "revomon");
  const totalPortfolioHolding = first + second;
  console.log(
    `Your total portfolio holding as at ${new Date().toLocaleString()} is: $${totalPortfolioHolding.toFixed(
      2
    )}`
  );
  return totalPortfolioHolding;
};

setInterval(() => {
  getTotalPortfolioHoldings();
}, 5000);
