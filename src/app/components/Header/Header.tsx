import { DarkModeToggle } from "@/shared/components/DarkModeToggle";
import Link from "next/link";
import React from "react";

function Header() {
	return (
		<header className="fixed top-2 z-30 w-full md:top-6">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="relative flex h-14 items-center justify-between gap-3 bg-white dark:bg-black px-3 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.03] backdrop-blur-sm">
					{/* App Logo or App Name */}
					<div className="flex flex-1 items-center">
						<Link href="/">
							<p className="font-heading text-2xl">foodAI</p>
						</Link>
					</div>
					{/* Actions */}
					<ul className="flex flex-1 items-center justify-end gap-3">
						<li>
							<DarkModeToggle />
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
