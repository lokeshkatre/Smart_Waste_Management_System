// connect to mongoDB Cluster

async function run() {
  try {
      await client.connect();
      console.log("Connected correctly to server");
  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}
run().catch(console.dir);

export default function run()