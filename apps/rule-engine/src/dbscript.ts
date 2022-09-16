import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const fillDB = async () => {
  const items = [];
  //create 1000000 items with random rule_id and attribute rule with random string
  for (let i = 0; i < 100000; i++) {
    items.push({
      PutRequest: {
        Item: {
          rule_id: { S: randomUUID() },
          rule: {
            S: randomUUID(),
          },
        },
      },
    });
  }
  console.log("created items");

  try {
    // pull 25 items at a time and write to db
    for (let i = 0; i < items.length; i += 25) {
      const batch = items.slice(i * 25, i * 25 + 25);
      const params = {
        RequestItems: {
          rules_table: batch,
        },
      };
      console.log(i);
      const command = new BatchWriteItemCommand(params);
      const t0 = performance.now();
      await client.send(command);
      const t1 = performance.now();
      console.log("Call took " + (t1 - t0) + " milliseconds.");
    }
  } catch (AmazonDynamoDBException) {
    console.log(AmazonDynamoDBException);
  }
};
