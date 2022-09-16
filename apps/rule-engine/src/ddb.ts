import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
/**
 * item shape:
 * {
 *     rule_id: { S: 'a28e73c3-a47f-4e77-b8ec-2781b9d5c142' },
 *     rule: { S: '4f54885f-eb91-4bf4-8477-35bf0a470b48' }
 *  }
 * @returns items
 */
//scan all items in rules_engine table
const scan = async () => {
  //TESTING
  // const t2 = performance.now();
  // const params = {
  //   TableName: "rules_table",
  // };
  // const command = new ScanCommand(params);
  // const items1 = await ddb.send(command);
  // const t3 = performance.now();
  // console.log("Call took " + (t3 - t2) + " milliseconds.");
  // return items1;

  //need to update this to have around 1500 items per segment
  const concurrency = 2;
  const segments: number[] = Array.from({ length: concurrency }, (_, i) => i);
  const items: ScanCommandOutput["Items"] = [];
  console.log(`Started parallel scan with ${concurrency} threads.`);
  const t0 = performance.now();
  await Promise.all(
    segments.map(async (_, segmentIndex) => {
      const segmentItems = await getItemsFromSegment({
        concurrency,
        segmentIndex,
      });

      items.push(...segmentItems!);
    })
  );
  const t1 = performance.now();
  console.log("Parallel scan took " + (t1 - t0) + " milliseconds.");
  console.log(
    `Finished parallel scan with ${concurrency} threads. Fetched ${items.length} items`
  );

  return items;
};

async function getItemsFromSegment({
  concurrency,
  segmentIndex,
}: {
  concurrency: number;
  segmentIndex: number;
}): Promise<ScanCommandOutput["Items"]> {
  const segmentItems: ScanCommandOutput["Items"] = [];
  let ExclusiveStartKey: ScanCommandInput["ExclusiveStartKey"];

  const params: ScanCommandInput = {
    TableName: "rules_table",
    Segment: segmentIndex,
    TotalSegments: concurrency,
  };

  console.log(`[${segmentIndex}/${concurrency}][start]`, { ExclusiveStartKey });

  do {
    if (ExclusiveStartKey) {
      params.ExclusiveStartKey = ExclusiveStartKey;
    }

    const command = new ScanCommand(params);
    const { Items, LastEvaluatedKey, ScannedCount } = await ddb.send(command);
    ExclusiveStartKey = LastEvaluatedKey;

    segmentItems.push(...Items!);
  } while (ExclusiveStartKey);

  return segmentItems;
}

export default scan;
