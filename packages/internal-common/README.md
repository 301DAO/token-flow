### Run DynamoDB using Docker and expose it on port 8000

```sh
docker run -p 8000:8000 amazon/dynamodb-local
```

### To use the services in this package, make sure to import the `index.ts` file, just the file, then you can import the services you need.

```ts
import 'database/src/index.ts'
import { UserModel } from 'database/src/models/user.ts'
```

// To be continued