const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const reviews = Array.from({length: 30}, (_, i) => `I bought this ${i} months ago. Best decision ever. Highly recommend if you are on the fence.`);
const tweets = Array.from({length: 30}, (_, i) => `Just had my ${i}th coffee of the day. Why do I do this to myself. send help`);
const jobs = Array.from({length: 30}, (_, i) => `Hiring Junior Developer role ${i}. Must have 10 years React experience. Competitive salary of pizza on Fridays.`);
const headlines = Array.from({length: 30}, (_, i) => `Breaking News ${i}: Local Cat Stuck in Tree Refuses Firefighter Help, Demands Salmon.`);

fs.writeFileSync(path.join(dir, 'reviews.json'), JSON.stringify(reviews, null, 2));
fs.writeFileSync(path.join(dir, 'tweets.json'), JSON.stringify(tweets, null, 2));
fs.writeFileSync(path.join(dir, 'jobs.json'), JSON.stringify(jobs, null, 2));
fs.writeFileSync(path.join(dir, 'headlines.json'), JSON.stringify(headlines, null, 2));

console.log('Datasets generation complete.');
