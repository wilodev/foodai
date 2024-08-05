import { IRecipeDetail } from "@/shared/types/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DishList({ dishes }: { dishes: IRecipeDetail[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{dishes.map((dish, index) => (
				<div key={`${dish.name}-${index}`} className="card">
					<Image
						src={dish.imageUrl}
						alt={dish.name}
						className="w-full h-48 object-cover"
						width={300}
						height={200}
					/>
					<div className="p-4">
						<h2 className="text-xl font-bold">{dish.name}</h2>
						<Link href={`/details/${dish.name}`} className="text-blue-500">
							Ver detalles
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}

export default DishList;
