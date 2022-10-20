export const ClassEnum = {
	BRICKFACE: 1,
	SKY: 2,
	FOLIAGE: 3,
	CEMENT: 4,
	WINDOW: 5,
	PATH: 6,
	GRASS: 7
} as const;

export function getClassEnumDefinitions(): Record<typeof ClassEnum[keyof typeof ClassEnum], string> {
	return {
		[ClassEnum.BRICKFACE]: "Brick Face",
		[ClassEnum.SKY]: "Sky",
		[ClassEnum.FOLIAGE]: "Foliage",
		[ClassEnum.CEMENT]: "Cement",
		[ClassEnum.WINDOW]: "Window",
		[ClassEnum.PATH]: "Path",
		[ClassEnum.GRASS]: "Grass",
	}
}
