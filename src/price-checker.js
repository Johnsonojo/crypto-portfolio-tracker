import axios from "axios";
import { load } from "cheerio";
import open from "open";

class CryptoPriceChecker {
  static async checkBtcPrice() {
    const btcPriceUrl = "https://coinmarketcap.com/currencies/bitcoin";
    try {
      const response = await axios.get(btcPriceUrl);
      const $ = load(response.data);
      const btcPrice = $(".main-content")
        .find(".priceTitle")
        .find(".priceValue")
        .find("span")
        .text();
      let cleanedBtcPrice = btcPrice.replace(/\$/g, "");
      cleanedBtcPrice = cleanedBtcPrice.replace(/\,/g, "");
      console.log("This is the current btc price: ", btcPrice);
      if (cleanedBtcPrice >= 10000) {
        open(btcPriceUrl);
      } else {
        return btcPrice;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

setInterval(() => {
  CryptoPriceChecker.checkBtcPrice();
}, 5000);
