import axios from "axios";

interface IGetSwapPairs {
  first?: number;
  minreserve?: number;
  orderBy?: number;
}

export const getSushiSwapPairs = async ({
  first,
  minreserve,
  orderBy,
}: IGetSwapPairs) => {
  const _first = first || 1000;
  const _minreserve = minreserve || 100;
  const _orderBy = orderBy || "reserveUSD";

  try {
    const response = await axios.post(
      "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange",
      {
        query: `{
                pairs(first: ${_first}, orderBy: ${_orderBy}, where: {reserveUSD_gte: ${_minreserve}}){
                    id
                    token0 {
                        id
                        symbol
                        decimals
                    }
                    token1 {
                        id
                        symbol
                        decimals
                    }
                    reserveUSD
                    reserve0
                    reserve1
                }
            }`,
      }
    );

    return response?.data?.data?.pairs;
  } catch (error) {
    console.error("Failed to fetch SushiSwap pairs");
    throw error;
  }
};

let oldDataStore: any = undefined;
let newDatastore: any = undefined;

let trendStore: any = {};

async function getPairs() {
  const results = await getSushiSwapPairs({});
  if (!results) {
    console.log("No results");
    return;
  }
  if (!oldDataStore) {
    oldDataStore = results;
  } else {
    oldDataStore = newDatastore;
    newDatastore = results;

    // loop through old data store
    for (let i = 0; oldDataStore && i < oldDataStore.length; i++) {
      const oldPair = oldDataStore[i];
      const newPair = newDatastore[i];
      const key = `${oldPair.token0.symbol}-${oldPair.token1.symbol}`;

      if (oldPair.reserveUSD !== newPair.reserveUSD) {
        const reservePercentage =
          ((newPair.reserveUSD - oldPair.reserveUSD) / oldPair.reserveUSD) *
          100;
        const token0ReservePercentage =
          ((newPair.reserve0 - oldPair.reserve0) / oldPair.reserve0) * 100;
        const token1ReservePercentage =
          ((newPair.reserve1 - oldPair.reserve1) / oldPair.reserve1) * 100;

        const log =
          `${key} Reserve USD Change (${reservePercentage.toFixed(5)}%) ` +
          `: ${Number.parseFloat(oldPair.reserveUSD).toFixed(
            1
          )} -> ${Number.parseFloat(newPair.reserveUSD).toFixed(1)} ` +
          ``;

        const trend = {
          token0: parseFloat(token0ReservePercentage.toFixed(5)),
          token1: parseFloat(token1ReservePercentage.toFixed(5)),
        };

        const percentCheck = 0.5;
        const maxLimit = 80;
        if (
          (Math.abs(trend.token0) > percentCheck ||
            Math.abs(trend.token1) > percentCheck) &&
          Math.abs(trend.token0) < maxLimit &&
          Math.abs(trend.token1) < maxLimit
        ) {
          if (!trendStore[key]) {
            trendStore[key] = [trend];
          } else {
            trendStore[key].push(trend);
          }

          // send notification
          console.log("Sending notification");
          // send axios request to zapier webhook with reserve percentage in body

          // trend average
          let token0Average = 0;
          let token1Average = 0;
          trendStore[key].forEach((trend: any) => {
            token0Average += trend.token0;
            token1Average += trend.token1;
          });
          token0Average = token0Average / trendStore[key].length;
          token1Average = token1Average / trendStore[key].length;
          const response = await axios.post(
            "https://hooks.zapier.com/hooks/catch/13288570/bekqjts/",
            {
              log,
              trendKey: trendStore[key],
              trendAverage: `${token0Average.toFixed(
                5
              )}% , ${token1Average.toFixed(5)}%`,
            }
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
          // exit app
          // process.exit(0);
        }
        console.log(log + "\n");
        //
      }
    }
  }
}

async function main() {
  while (true) {
    console.log("Re-fetching pairs");
    await getPairs();
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
main();
