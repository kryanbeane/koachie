import { z } from "zod";

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
	"Hypertrophy",
	"Strength",
	"Powerbuilding",
	"Sport-Specific",
	"Power",
	"Cardiovascular",
	"Flexibility"
]);

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

export const experienceLevelEnum = z.enum(["Beginner", "Intermediate", "Advanced"]);
