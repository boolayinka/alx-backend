#!/usr/bin/env node

import { createQueue } from 'kue';

const queue = createQueue({ name: 'push_notification_code' });
const job = queue.create('push_notification_code', {
  phoneNumber: '15540',
  message: 'Your verification code is: 15906',
});

job
  .on('enqueue', () => console.log(`Notification job created: ${job.id}`))
  .on('complete', () => console.log('Notification job completed'))
  .on('failed', (error) => console.log('Notification job failed'));

job.save();
