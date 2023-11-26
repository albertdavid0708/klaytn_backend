import { defaultRedisClient } from "../database/Redis";
import { ExchangeService } from "../services/impl/ExchangeService";

async function startSyncBlockchain() {
  const INTERVAL = 10 * 60 * 1000;
  const exchangeService = new ExchangeService(defaultRedisClient);
  await exchangeService.syncPrice(["USDT,BNB,BTC"]);
  setInterval(async () => {
    try {
      await exchangeService.syncPrice(["USDT,BNB,BTC"]);
    } catch (error) {
      console.error(error);
    }
  }, INTERVAL);
}

startSyncBlockchain();
