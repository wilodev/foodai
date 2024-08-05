import type { NextApiRequest, NextApiResponse } from "next";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { IRecipeDetail } from "@/shared/types/global";

const google = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});
const openai = createOpenAI({
	apiKey: process.env.OPEN_AI_API_KEY,
});
const model =
	process.env.MODEL === "gemini"
		? google("models/gemini-1.5-flash-latest")
		: openai("gpt-3.5-turbo-1106");

//const model = google("models/gemini-1.5-pro-latest");
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { imageBase64 } = req.body;
	if (!imageBase64) {
		return res.status(400).json({ message: "Image base64 is required" });
	}
	const prompt = `Analyze the following base64 encoded image and determine if it contains food. If it does, suggest three dishes that could be the one in the image, including their details. Provide the information strictly in the following JSON format without any additional text or comments:
	{
	  "food_present": boolean,
	  "possible_dishes": [
		{
		  "full_name": string,
		  "ingredients": [
			{ "name": string, "quantity": string, "weight": string }
		  ],
		  "calories": string,
		  "preparation_time": string,
		  "steps": [
			string
		  ]
		}
	  ]
	}

	Base64 Image:
	${imageBase64}`;

	try {
		// Realiza la llamada a Google Gemini (o el servicio que estés utilizando)
		const response = await generateText({
			model,
			prompt,
			temperature: 0.8,
			maxTokens: 3000,
		});
		// Elimina los delimitadores de código de la respuesta
		const cleanedResponseText = response.text
			.replace(/```json/g, "")
			.replace(/```/g, "");

		const jsonResponse = JSON.parse(cleanedResponseText);
		const dishes: IRecipeDetail[] = jsonResponse.possible_dishes.map(
			(dish: any) => ({
				id: new Date().toString(), // Asume una función generateUniqueId para generar IDs únicos
				imageUrl: "", // Puedes agregar la URL de la imagen si tienes una forma de almacenarla
				name: dish.full_name,
				description: "", // Si quieres agregar una descripción adicional
				ingredients: dish.ingredients.map((ingredient: any) => ({
					name: ingredient.name,
					quantity: parseFloat(ingredient.quantity),
					weight: ingredient.weight,
				})),
				steps: dish.steps,
				calories: parseInt(dish.calories, 10),
				preparationTime: dish.preparation_time,
			})
		);

		return res.status(200).json({ dishes });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" + error });
	}
}
