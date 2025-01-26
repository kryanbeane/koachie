import { z } from "zod";

export type Option = {
	value: string;
	label: string;
};

export const defaultTrackingFields = z.enum([
	"weight",
	"reps",
	"rir",
	"rest",
	"distance",
	"pace",
	"%1rm",
	"%hr"
]);

export const muscleGroupEnum = z.enum([
	"Biceps",
	"Triceps",
	"Forearm Flexors",
	"Forearm Extensors",
	"Side Delts",
	"Front Delts",
	"Rear Delts",
	"Chest",
	"Traps & Rhomboids",
	"Lats",
	"Abs",
	"Glutes",
	"Hamstrings",
	"Quads",
	"Adductors",
	"Calves"
]);

export const modalityEnum = z.enum([
	"hypertrophy",
	"strength",
	"powerbuilding",
	"power",
	"cardiovascular",
	"flexibility",
	"endurance",
	"speed",
	"recovery",
	"mixed"
]);

export const ModalityValues: Option[] = [
	{ value: "hypertrophy", label: "Hypertrophy" },
	{ value: "strength", label: "Strength" },
	{ value: "powerbuilding", label: "Powerbuilding" },
	{ value: "power", label: "Power" },
	{ value: "cardiovascular", label: "Cardiovascular" },
	{ value: "flexibility", label: "Flexibility" },
	{ value: "endurance", label: "Endurance" },
	{ value: "speed", label: "Speed" },
	{ value: "recovery", label: "Recovery" },
	{ value: "mixed", label: "Mixed" }
];

export const experienceLevelEnum = z.enum(["beginner", "intermediate", "advanced"]);

export const ExperienceLevelValues: Option[] = [
	{ value: "beginner", label: "Beginner" },
	{ value: "intermediate", label: "Intermediate" },
	{ value: "advanced", label: "Advanced" }
];

export const equipmentEnum = z.enum([
	"Dumbbell",
	"Barbell",
	"Pin Machine",
	"Plate Machine",
	"Smith Machine",
	"Cable"
]);

export const movementTypeEnum = z.enum([
	"Lower Body Hinge",
	"Lower Body Squat",
	"Upper Body Vertical Pull",
	"Upper Body Vertical Push",
	"Upper Body Horizontal Pull",
	"Upper Body Horizontal Push",
	"Core",
	"Cardio"
]);
