import scan from "./ddb.js";
async function wait(t: number) {
  return await new Promise((resolve) => setTimeout(() => resolve(null), t));
}

const main = async () => {
  while (true) {
    console.log("Checking rules...");
    const rules = await scan();
    console.log(rules);

    await wait(5000);
  }
};

main();

export {};
