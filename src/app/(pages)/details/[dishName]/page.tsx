"use client";
import Image from "next/image";
import { IDishProps } from "./types";
import useStore from "@/shared/store";
import { useRouter } from "next/navigation";

export default function Home(props: IDishProps) {
	const {
		params: { dishName },
	} = props;
	const { dishes } = useStore();
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};
	const dish = dishes.find((dish) => {
		return dish.name === dishName.replace("%20", " ");
	});

	if (!dish) {
		return (
			<div className="container flex justify-center flex-col items-center">
				<h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
					404 Dish not found
				</h1>
			</div>
		);
	}
	return (
		<div className="container flex justify-center flex-col items-center">
			<button
				type="button"
				className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 self-start"
				onClick={handleBack}
			>
				<svg
					className="w-6 h-6 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 8 14"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
					/>
				</svg>
				<span className="sr-only">Back</span>
			</button>
			<h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
				{dish.name}
			</h1>
			<Image
				src={dish.imageUrl}
				alt={dish.name}
				className="w-56 h-56 mx-auto mt-8"
				width={300}
				height={300}
			/>
			<div className="flex justify-center col-2 gap-4 py-8">
				<p className="text-gray-900 dark:text-gray-100">
					<span>Calorías: </span>
					<span>{dish.calories}</span>
				</p>
				<p className="text-gray-900 dark:text-gray-100">
					<span>Tiempo de Preparación: </span>
					<span>{dish.preparationTime}</span>
				</p>
			</div>
			<div className="flex flex-col justify-center w-1/2 ">
				<h3 className="text-lg font-bold py-8">Ingredientes</h3>
				<ul className="w-full">
					{dish?.ingredients.map((item) => (
						<li key={item.name} className="flex justify-between py-2">
							<span>{item.name}</span>
							<span className="w-64 gap-2 flex justify-end">
								<span>{item.quantity}</span>
								<span>{item.weight}</span>
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col justify-center w-1/2 ">
				<h3 className="text-lg font-bold py-8">Preparación</h3>
				<ul className="w-full">
					{dish?.steps.map((item, index) => (
						<li key={`${item}-${index}`} className="flex py-2 gap-4">
							<span>{index + 1} </span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
