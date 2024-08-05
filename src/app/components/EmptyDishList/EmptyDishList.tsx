import React from "react";

function EmptyDishList() {
	return (
		<div className="flex flex-col justify-center items-center ">
			<h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
				Listado vacío.
			</h3>
			<p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400">
				No se encontraron platos. Por favor, sube una imagen para buscar platos.
			</p>
		</div>
	);
}

export default EmptyDishList;
