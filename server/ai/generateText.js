const hesitation = ["honestly", "idk", "maybe", "like", "literally", "kinda"];
const endings = ["...", "lol", "imo", "tho", "smh"];

async function generateAIText(category, level, config) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let baseText = "";
  if (category === 'reviews') baseText = "the product is alright. it functions but setup was confusing.";
  if (category === 'tweets') baseText = "saw the new show. it was pretty okay nothing mind blowing.";
  if (category === 'jobs') baseText = "looking for a developer. need 3 yrs exp in fast paced team.";
  if (category === 'headlines') baseText = "local restaurant wins award for new recipe, neighborhood celebrates.";

  // Dynamic emotional / humanizing ai realism based on level
  if (config.aiRealism > 0.4) {
      baseText = `${hesitation[Math.floor(Math.random()*hesitation.length)]} ${baseText} ${endings[Math.floor(Math.random()*endings.length)]}`;
  }
  
  // Messy grammar
  if (level >= 3) {
      baseText = baseText.replace("the", "teh"); 
      baseText = baseText.toLowerCase();
  }

  // Ultra realism / Slang
  if (level >= 4) {
      baseText = baseText.replace("alright", "mid");
      baseText = baseText.replace("pretty okay", "kinda mid tbh");
  }

  return baseText;
}

module.exports = { generateAIText };
