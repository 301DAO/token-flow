async function wait(t: number) {
  return await new Promise((resolve) => setTimeout(() => resolve(null), t));
}

const main = async () => {
  while (true) {
    console.log("Hello World");
    await wait(1000);
  }
};

main();

export {};
