import { mysqlDataSource } from "../database/MyDataSource";
import { defaultRedisClient } from "../database/Redis";
import { W2EPaymentGateway } from "../external_service/impl/W2EPaymentGateway";
import { BlockchainRepo } from "../repositories/impl/BlockchainRepo";
import { ContractRepo } from "../repositories/impl/ContractRepo";
import { CurrencyRepo } from "../repositories/impl/CurrencyRepo";
import { LogRepo } from "../repositories/impl/LogRepo";
import { WalletTransactionRepo } from "../repositories/impl/WalletTransactionRepo";
import { ExchangeService } from "../services/impl/ExchangeService";
import { PaymentService, newPaymentService } from "../services/impl/PaymentService";

async function startSyncCheckClaim() {
  const INTERVAL = 10 * 60 * 1000;
  console.log("test");

  const dataSource = mysqlDataSource;
  await dataSource.initialize();
  const paymentService: PaymentService = newPaymentService(dataSource);
  setInterval(async () => {
    try {
      await paymentService.checkClaim();
    } catch (error) {
      console.error(error);
    }
  }, INTERVAL);
}

startSyncCheckClaim();
