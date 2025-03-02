export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			client_invites: {
				Row: {
					coach_id: string;
					code: string;
					email: string;
					id: string;
				};
				Insert: {
					coach_id: string;
					code?: string;
					email: string;
					id?: string;
				};
				Update: {
					coach_id?: string;
					code?: string;
					email?: string;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "client_invites_coach_id_fkey";
						columns: ["coach_id"];
						isOneToOne: false;
						referencedRelation: "coaches";
						referencedColumns: ["id"];
					}
				];
			};
			clients: {
				Row: {
					coach_id: string | null;
					created_at: string;
					DOB: string | null;
					email: string | null;
					first_name: string | null;
					gender: Database["public"]["Enums"]["gender"] | null;
					height: number | null;
					id: number;
					last_name: string | null;
					updated_at: string | null;
				};
				Insert: {
					coach_id?: string | null;
					created_at?: string;
					DOB?: string | null;
					email?: string | null;
					first_name?: string | null;
					gender?: Database["public"]["Enums"]["gender"] | null;
					height?: number | null;
					id?: number;
					last_name?: string | null;
					updated_at?: string | null;
				};
				Update: {
					coach_id?: string | null;
					created_at?: string;
					DOB?: string | null;
					email?: string | null;
					first_name?: string | null;
					gender?: Database["public"]["Enums"]["gender"] | null;
					height?: number | null;
					id?: number;
					last_name?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "clients_coach_id_fkey";
						columns: ["coach_id"];
						isOneToOne: false;
						referencedRelation: "coaches";
						referencedColumns: ["id"];
					}
				];
			};
			coaches: {
				Row: {
					full_name: string | null;
					id: string;
				};
				Insert: {
					full_name?: string | null;
					id: string;
				};
				Update: {
					full_name?: string | null;
					id?: string;
				};
				Relationships: [];
			};
			days: {
				Row: {
					id: string;
					order: number;
					program_id: string;
				};
				Insert: {
					id?: string;
					order?: number;
					program_id: string;
				};
				Update: {
					id?: string;
					order?: number;
					program_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "days_program_id_fkey";
						columns: ["program_id"];
						isOneToOne: false;
						referencedRelation: "programs";
						referencedColumns: ["id"];
					}
				];
			};
			exercise_instances: {
				Row: {
					client_id: string | null;
					created_at: string;
					exercise_id: string;
					id: string;
					note: string | null;
					sets: Json;
					updated_id: string;
					workout_id: string | null;
				};
				Insert: {
					client_id?: string | null;
					created_at?: string;
					exercise_id: string;
					id?: string;
					note?: string | null;
					sets?: Json;
					updated_id?: string;
					workout_id?: string | null;
				};
				Update: {
					client_id?: string | null;
					created_at?: string;
					exercise_id?: string;
					id?: string;
					note?: string | null;
					sets?: Json;
					updated_id?: string;
					workout_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "exercise_instances_exercise_id_fkey";
						columns: ["exercise_id"];
						isOneToOne: false;
						referencedRelation: "exercises";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "exercise_instances_workout_id_fkey";
						columns: ["workout_id"];
						isOneToOne: false;
						referencedRelation: "workouts";
						referencedColumns: ["id"];
					}
				];
			};
			exercises: {
				Row: {
					coach_id: string | null;
					created_at: string;
					id: string;
					instructions: string[];
					movement_type: string;
					muscle_groups: Database["public"]["Enums"]["muscle_group"][];
					name: string;
					note: string;
					updated_at: string;
					video: string;
				};
				Insert: {
					coach_id?: string | null;
					created_at?: string;
					id?: string;
					instructions: string[];
					movement_type?: string;
					muscle_groups: Database["public"]["Enums"]["muscle_group"][];
					name?: string;
					note?: string;
					updated_at?: string;
					video?: string;
				};
				Update: {
					coach_id?: string | null;
					created_at?: string;
					id?: string;
					instructions?: string[];
					movement_type?: string;
					muscle_groups?: Database["public"]["Enums"]["muscle_group"][];
					name?: string;
					note?: string;
					updated_at?: string;
					video?: string;
				};
				Relationships: [
					{
						foreignKeyName: "public_exercises_userId_fkey";
						columns: ["coach_id"];
						isOneToOne: false;
						referencedRelation: "coaches";
						referencedColumns: ["id"];
					}
				];
			};
			metrics: {
				Row: {
					client_id: number | null;
					created_at: string;
					id: string;
					metric_name: string | null;
					metric_value: string | null;
				};
				Insert: {
					client_id?: number | null;
					created_at?: string;
					id?: string;
					metric_name?: string | null;
					metric_value?: string | null;
				};
				Update: {
					client_id?: number | null;
					created_at?: string;
					id?: string;
					metric_name?: string | null;
					metric_value?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "metrics_client_id_fkey";
						columns: ["client_id"];
						isOneToOne: false;
						referencedRelation: "clients";
						referencedColumns: ["id"];
					}
				];
			};
			programs: {
				Row: {
					experience_level: Database["public"]["Enums"]["experience_level"];
					id: string;
					modality: Database["public"]["Enums"]["modality"];
					name: string;
					split_length: number;
					user_id: string;
				};
				Insert: {
					experience_level?: Database["public"]["Enums"]["experience_level"];
					id?: string;
					modality?: Database["public"]["Enums"]["modality"];
					name?: string;
					split_length?: number;
					user_id?: string;
				};
				Update: {
					experience_level?: Database["public"]["Enums"]["experience_level"];
					id?: string;
					modality?: Database["public"]["Enums"]["modality"];
					name?: string;
					split_length?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "public_programs_userId_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "coaches";
						referencedColumns: ["id"];
					}
				];
			};
			workouts: {
				Row: {
					coach_id: string | null;
					created_at: string;
					description: string;
					experience_level: Database["public"]["Enums"]["experience_level"];
					id: string;
					modality: Database["public"]["Enums"]["modality"];
					name: string;
					updated_at: string;
				};
				Insert: {
					coach_id?: string | null;
					created_at?: string;
					description?: string;
					experience_level?: Database["public"]["Enums"]["experience_level"];
					id?: string;
					modality?: Database["public"]["Enums"]["modality"];
					name?: string;
					updated_at?: string;
				};
				Update: {
					coach_id?: string | null;
					created_at?: string;
					description?: string;
					experience_level?: Database["public"]["Enums"]["experience_level"];
					id?: string;
					modality?: Database["public"]["Enums"]["modality"];
					name?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "workouts_coach_id_fkey";
						columns: ["coach_id"];
						isOneToOne: false;
						referencedRelation: "coaches";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			client_goal:
				| "Muscle Gain"
				| "Fat Loss"
				| "Body Recomposition"
				| "Strength Gain"
				| "Maintenance"
				| "Endurance"
				| "Speed"
				| "Sport"
				| "Other";
			default_tracking_field:
				| "weight"
				| "reps"
				| "rir"
				| "rest"
				| "distance"
				| "pace"
				| "%1rm"
				| "%hr";
			experience_level: "beginner" | "intermediate" | "advanced";
			gender: "male" | "female";
			modality:
				| "hypertrophy"
				| "strength"
				| "powerbuilding"
				| "power"
				| "cardiovascular"
				| "flexibility"
				| "endurance"
				| "recovery"
				| "mixed";
			muscle_group:
				| "Biceps"
				| "Triceps"
				| "Forearm Flexors"
				| "Forearm Extensors"
				| "Side Delts"
				| "Front Delts"
				| "Rear Delts"
				| "Chest"
				| "Traps & Rhomboids"
				| "Lats"
				| "Abs"
				| "Glutes"
				| "Hamstrings"
				| "Quads"
				| "Adductors"
				| "Calves";
			unit: "kgs" | "lbs";
			variation:
				| "Standing"
				| "Seated"
				| "Lying (Face-Up)"
				| "Lying (Face-Down)"
				| "Incline"
				| "Decline"
				| "Kneeling"
				| "Split-Stance"
				| "Side-Lying"
				| "Wall-Supported"
				| "Hanging"
				| "Plank-Position"
				| "Bent-Over"
				| "Chest-Supported"
				| "Forward-Leaning";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
