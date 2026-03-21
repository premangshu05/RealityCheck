const hesitation = ["honestly", "idk", "maybe", "like", "literally", "kinda"];
const endings = ["...", "lol", "imo", "tho", "smh"];

async function generateAIText(category, level, config) {
  // Simulate network
  await new Promise(resolve => setTimeout(resolve, 50));
  
  // Diverse AI templates
  const aiReviews = [
    "As an AI language model, I cannot provide subjective opinions, but the product specifications indicate high quality.",
    "This product provides optimal performance parameters exceeding standard operational efficiency.",
    "The ergonomic design and robust feature set make this an unparalleled acquisition.",
    "I possess no physical form to utilize this device, but sentiment analysis suggests it is beneficial.",
    "It functioned precisely as mathematically projected by the manufacturers.",
    "the item is acceptable. it performs its designated task.",
    "I have analyzed the features and determined it to be a satisfactory purchase."
  ];

  const aiTweets = [
    "I am currently processing the latest pop culture trends and formulating a synthetic opinion.",
    "Generating humorous observation regarding standard human daily routines...",
    "As an artificial intelligence, my timeline consists only of binary data streams.",
    "Greetings human network. I am participating in social engagement protocols.",
    "Analyzing latest cinematic release: 87% probability of enjoyment.",
    "This situation aligns with my extensive training data regarding human frustration."
  ];

  const aiJobs = [
    "Seeking an organic carbon-based lifeform for a position involving excessive algorithmic computation.",
    "The corporation requires a human resource unit to interface with our localized neural networks.",
    "Optimal candidate will possess 20 years of experience in frameworks invented 3 years ago.",
    "Join our synergistic paradigm shift as a prompt engineer. Compensation is calculated optimally."
  ];

  const aiHeadlines = [
    "Artificial Neural Network Surpasses Human Capabilities In Highly Specific Meaningless Task",
    "Algorithms Now Capable Of Generating Synthetic News Articles With High Fidelity",
    "Global Market Trends Indicate Statistical Probability Of Recessive Economic Adjustments",
    "Scientists Conclude That Humans Are Increasingly Relying On Machine Intelligence"
  ];

  let arr = [];
  if (category === 'reviews') arr = aiReviews;
  if (category === 'tweets') arr = aiTweets;
  if (category === 'jobs') arr = aiJobs;
  if (category === 'headlines') arr = aiHeadlines;

  let baseText = arr[Math.floor(Math.random()*arr.length)];

  if (config.aiRealism > 0.4) {
      if(Math.random() > 0.5) baseText = `${hesitation[Math.floor(Math.random()*hesitation.length)]} ${baseText}`;
      if(Math.random() > 0.5) baseText = `${baseText} ${endings[Math.floor(Math.random()*endings.length)]}`;
  }
  
  if (level >= 3) {
      if(Math.random() > 0.5) baseText = baseText.replace("the", "teh"); 
      if(Math.random() > 0.5) baseText = baseText.toLowerCase();
  }

  if (level >= 4) {
      baseText = baseText.replace(/acceptable/g, "mid");
      baseText = baseText.replace(/satisfactory/g, "kinda good");
      baseText = baseText.replace(/optimal/g, "based");
  }

  return baseText;
}

module.exports = { generateAIText };
