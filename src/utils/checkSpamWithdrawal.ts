import { defaultRedisClient } from "../database/Redis";

export async function isDuplicateWithdrawal(address: string, withdrawalId: string|undefined): Promise<boolean> {
    if (!withdrawalId) {
        return false
    }
    const latestWithdrawalId = await defaultRedisClient.hget('withdrawal-request', address);
    await defaultRedisClient.hset('withdrawal-request', address, withdrawalId);
    if (!latestWithdrawalId) {
        return false;
    } else if (latestWithdrawalId != withdrawalId) {
        return false;
    } else {
        return true;
    }
}
