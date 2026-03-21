const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const generateHumanTexts = (category) => {
    let arr = [];
    for(let i=0; i<150; i++) {
        if (category === 'reviews') {
            const feelings = ["loved it", "hated it", "thought it was okay", "was pretty disappointed", "was pleasantly surprised", "think it's a scam", "would buy again"];
            const issues = ["the shipping took forever", "the box was dented", "it works flawlessly", "set up was a breeze", "customer support was rude", "the battery is awful", "it looks great in person"];
            arr.push(`I ${feelings[Math.floor(Math.random()*feelings.length)]} mainly because ${issues[Math.floor(Math.random()*issues.length)]}.`);
        }
        if (category === 'tweets') {
            const topics = ["this new movie", "my coffee today", "the traffic on I-95", "my cat", "learning react", "my new job", "this weather"];
            const reactions = ["is literally the worst", "has me questioning reality", "is so good fr", "needs to stop", "cured my depression", "is making me crazy", "is a vibe"];
            arr.push(`${topics[Math.floor(Math.random()*topics.length)]} ${reactions[Math.floor(Math.random()*reactions.length)]} 😭`);
        }
        if (category === 'jobs') {
            const roles = ["React Developer", "UX Designer", "Data Analyst", "Project Manager", "Software Engineer", "Marketing Intern", "Backend Architect"];
            const perks = ["unlimited PTO", "pizza fridays", "competitive salary", "remote work", "toxic environment lol jk", "free gym", "no equity"];
            arr.push(`We are hiring a ${roles[Math.floor(Math.random()*roles.length)]}! Must have 3+ years experience. Perks include ${perks[Math.floor(Math.random()*perks.length)]}.`);
        }
        if (category === 'headlines') {
            const subjects = ["Local Mayor", "Florida Man", "Tech Billionaire", "Small Dog", "Scientists", "Local Teen", "Anonymous Hacker"];
            const actions = ["Discovers New Planet", "Eats Unbelievable Amount of Hotdogs", "Bans Javascript", "Saves Family from Fire", "Promises AI Revolution", "Steals Entire ATM", "Cries Over Spilled Milk"];
            arr.push(`BREAKING: ${subjects[Math.floor(Math.random()*subjects.length)]} ${actions[Math.floor(Math.random()*actions.length)]}`);
        }
    }
    return [...new Set(arr)]; // ensure unique
}

fs.writeFileSync(path.join(dir, 'reviews.json'), JSON.stringify(generateHumanTexts('reviews'), null, 2));
fs.writeFileSync(path.join(dir, 'tweets.json'), JSON.stringify(generateHumanTexts('tweets'), null, 2));
fs.writeFileSync(path.join(dir, 'jobs.json'), JSON.stringify(generateHumanTexts('jobs'), null, 2));
fs.writeFileSync(path.join(dir, 'headlines.json'), JSON.stringify(generateHumanTexts('headlines'), null, 2));

console.log('Datasets generation complete.');
