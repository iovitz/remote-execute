import { useEffect, useState } from "react";
import { size } from "window-size";

export function useWindowSize() {
	const s = size();
	console.log(s);
	const [windowSize, setWindowSize] = useState({
		width: size.width,
		height: undefined,
	});

	const handleWindowSizeChange = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		process.stdout.on("resize", handleWindowSizeChange);

		handleResize();

		return () => {
			process.stdout.off("resize", handleWindowSizeChange);
		};
	}, []);

	return windowSize;
}
