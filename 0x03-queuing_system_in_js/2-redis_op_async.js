#!/usr/bin/env node

import { promisify } from 'util';
import { createClient, print } from 'redis';

const client = createClient();
client.on('error', (err) => console.log(`Redis client not connected to the server: ${err.toString()}`));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

async function displaySchoolValue(schoolName) {
  console.log(await promisify(client.get).bind(client)(schoolName));
}

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
