#!/usr/bin/env node

import { promisify } from 'util';
import { createClient, print } from 'redis';

const client = createClient();
client.on('error', (err) => console.log(`Redis client not connected to the server: ${err.toString()}`));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

async function setHSet(schoolName, obj) {
  for (const [field, value] of Object.entries(obj)) {
    await client.HSET(schoolName, field, value, print);
  }
}

async function displayHSet(schoolName) {
  await client.HGETALL(schoolName, (error, value) => console.log(value));
}

async function displaySchoolValue(schoolName) {
  console.log(await promisify(client.get).bind(client)(schoolName));
}

async function main() {
  await setHSet('HolbertonSchools', {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  });
  await displayHSet('HolbertonSchools');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
