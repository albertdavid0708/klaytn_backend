export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function baseJob(
  breakLoop: (...args: any[]) => boolean,
  run: (...args: any[]) => Promise<void>,
  duration = 1000
) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const isBreak = breakLoop();
      if (isBreak) {
        break;
      }
      await run();
    } catch (e) {
      console.error(e);
    }
    await console.log("Start", new Date().getTime());
    await delay(duration);
    await console.log("end", new Date().getTime());
  }
}
