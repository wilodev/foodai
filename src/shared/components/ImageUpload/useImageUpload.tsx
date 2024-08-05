import React, { useState } from "react";
import { IImageUploadProps } from "./types";

export function useImageUpload({ onSearchDish }: IImageUploadProps) {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string>("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (
			file &&
			file.size <= 3 * 1024 * 1024 &&
			(file.type === "image/jpeg" ||
				file.type === "image/png" ||
				file.type === "image/webp")
		) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setError(
				"Por favor, selecciona una imagen válida (JPG, PNG, WEBP) y de tamaño menor a 3MB."
			);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreview(null);
	};

	const handleSearch = () => {
		if (image) {
			// Aquí puedes agregar la lógica para subir la imagen y realizar la búsqueda con la IA.
			onSearchDish(image);
		} else {
			setError("Por favor, sube una imagen primero.");
		}
	};

	return {
		preview,
		handleImageChange,
		handleRemoveImage,
		handleSearch,
		error,
	};
}
