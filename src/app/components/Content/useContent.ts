import useStore from "@/shared/store";

export function useContent() {
	const { dishes, setDishes, isLoading, setLoading, setImage, imageBase64 } =
		useStore();
	const onSearchDish = async (image: File) => {
		if (!image) {
			alert("Por favor, sube una imagen primero.");
			return;
		}
		// Iniciar estado de carga
		setLoading(true);
		try {
			// Convert image to base64
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onloadend = async () => {
				const base64String = reader.result as string;
				setImage(base64String);
				// Upload image
				const formData = new FormData();
				formData.append("file", image);
				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});
				const { imageUrl } = await uploadResponse.json();
				// Perform search
				if (base64String) {
					const searchResponse = await fetch("/api/search", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ imageBase64: base64String }),
					});
					const textResponse = await searchResponse.text();
					try {
						const jsonResponse = JSON.parse(textResponse);

						if (jsonResponse?.dishes) {
							const dishesList = jsonResponse?.dishes;
							const updatedDishes = dishesList.map((dish: any) => ({
								...dish,
								name: dish.name ?? dish.full_name,
								preparationTime: dish.preparationTime,
								imageUrl: base64String,
							}));
							setDishes(updatedDishes);
						} else {
							alert("No se ha detectado comida en la imagen.");
						}
					} catch (error) {
						console.error("Error parsing JSON response:", error);
						alert("Error al procesar la respuesta del servidor.");
					} finally {
						// Finalizar estado de carga
						setLoading(false);
					}
				}
			};
		} catch (error) {
			console.error("Error during search:", error);
			setLoading(false);
		}
	};
	return { isLoading, dishes, onSearchDish, imageBase64 };
}
