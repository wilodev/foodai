import Image from "next/image";
import React from "react";

function Hero() {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="grid max-w-screen-xl px-8 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
						foodAI
					</h1>
					<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
						foodAI es una aplicación web que te permite buscar recetas de comida
						utilizando inteligencia artificial.
					</p>
					<a
						href="#"
						className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-900"
					>
						Buscar una receta
						<svg
							className="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
						</svg>
					</a>
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
					<Image
						src="/images/food-plate-main.jpg"
						alt="plato principal de la aplicación foodAI"
						width={300}
						height={300}
						className="w-[300] md:w-[150]"
					/>
				</div>
			</div>
		</section>
	);
}

export default Hero;
