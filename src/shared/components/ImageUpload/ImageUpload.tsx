"use client";
import React from "react";
import { useImageUpload } from "./useImageUpload";
import { IImageUploadProps } from "./types";
import Image from "next/image";

function ImageUpload({ onSearchDish, isLoading }: IImageUploadProps) {
	const { preview, handleImageChange, handleRemoveImage, handleSearch, error } =
		useImageUpload({ onSearchDish, isLoading });
	return (
		<section className="container w-full py-4 mx-auto items-center">
			<div className="max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden items-center py-4 ">
				<div className="px-4">
					<div
						id="image-preview"
						className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-950 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer relative"
					>
						{preview ? (
							<div className="relative">
								{isLoading && (
									<div className="w-full h-full bg-slate-600/50 absolute top-0 right-0">
										<div className="absolute top-1/3 m-auto w-full h-full">
											<svg
												role="status"
												className="inline w-12 h-12 text-white animate-spin  z-30"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="#E5E7EB"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentColor"
												/>
											</svg>
										</div>
									</div>
								)}
								{!isLoading && (
									<button
										type="button"
										className="absolute top-2 right-0 z-30 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
										onClick={handleRemoveImage}
									>
										<svg
											className="w-3 h-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 14 14"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
											/>
										</svg>
									</button>
								)}
								<Image
									src={preview}
									alt="Preview"
									className="w-full h-full object-cover"
									width={300}
									height={300}
								/>
							</div>
						) : (
							<>
								<input
									id="upload"
									type="file"
									className="hidden"
									accept="image/*"
									onChange={handleImageChange}
								/>
								<label htmlFor="upload" className="cursor-pointer relative">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-8 h-8 text-gray-700 dark:text-gray-100 mx-auto mb-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
										/>
									</svg>
									<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
										Subir Imagen
									</h5>
									<p className="font-normal text-sm text-gray-400 md:px-6">
										Sube tu imagen aquí. El tamaño máximo de la imagen es de{" "}
										<b className="text-gray-600 dark:text-gray-200">3mb</b>
									</p>
									<p className="font-normal text-sm text-gray-400 md:px-6">
										y debe estar en formato{" "}
										<b className="text-gray-600 dark:text-gray-200">
											JPG, PNG.
										</b>{" "}
									</p>
									<span
										id="filename"
										className="text-gray-500 bg-gray-200 z-50"
									></span>
								</label>
								{error && <p className="text-red-500">{error}</p>}
							</>
						)}
					</div>
					<div className="flex items-center justify-center">
						<div className="w-full">
							<button
								type="button"
								disabled={isLoading}
								onClick={handleSearch}
								className="w-full text-white bg-cyan-500 hover:bg-cyan-500/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
							>
								{isLoading && (
									<svg
										role="status"
										className="inline w-4 h-4 text-white animate-spin  z-30"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
								)}
								<span className="text-center ml-2">Buscar Receta</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ImageUpload;
