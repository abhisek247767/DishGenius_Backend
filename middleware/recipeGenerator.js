const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", generationConfig: {
    maxOutputTokens: 1000, 
    temperature: 0.1,
    topP: 0.8,
    topK: 10
  } });

const generateRecipe = async ({ ingredients, members, cuisine, language }) => {
  const prompt = `
  Create a detailed ${cuisine || 'Indian'} recipe using the following ingredients: ${ingredients.join(", ")}.
  
  Requirements:
  - Recipe must serve ${members} people
  - Provide the response in ${language}
  - Include exact quantity for each ingredient
  - Provide step-by-step cooking instructions with step numbers
  - Add 3-2 serving suggestions

  📌 Return the result ONLY as JSON in this format:
  {
    "title": "Recipe Title",
    "ingredients": [{"item": "ingredient", "quantity": "amount"}],
    "instructions": [{"step": 1, "description": "instruction"}],
    "servingSuggestions": ["suggestion1", "suggestion2"]
  }

  ❗ Do not add any markdown, no headings, no explanations — only raw JSON.
`;


  try {
    const result = await model.generateContent(prompt);
    // console.log("Full AI Response:", result); // Log the entire response object

    let jsonData = result.response.text().trim();
    jsonData = jsonData.replace(/```json|```/g, ""); 

    // Parse the cleaned JSON data
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(
      "Error generating content:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate recipe");
  }
};

module.exports = { generateRecipe };
