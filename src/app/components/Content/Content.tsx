"use client";
import { ImageUpload } from "@/shared/components/ImageUpload";
import React from "react";

import { DishList } from "../DishList";
import { useContent } from "./useContent";
import { Loading } from "@/shared/components/Loading";
import { EmptyDishList } from "../EmptyDishList";

function Content() {
	const { isLoading, dishes, onSearchDish } = useContent();
	return (
		<div className="grid max-w-screen-xl px-8 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12 columns-2">
			<div className="mr-auto lg:col-span-5">
				<div className="">
					<ImageUpload onSearchDish={onSearchDish} isLoading={isLoading} />
				</div>
			</div>
			<div className="col-span-7">
				{!isLoading && dishes.length === 0 && <EmptyDishList />}
				{isLoading && dishes.length === 0 && <Loading />}
				{!isLoading && dishes.length > 0 && (
					<div className="w-full justify-center">
						<h3 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white text-center">
							Listado de Platos.
						</h3>
						<DishList dishes={dishes} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Content;
