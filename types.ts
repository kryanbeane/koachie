export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			client_invites: {
				Row: {
					coach_id: string;
					code: string;
					email: string;
					first_name: string;
					id: string;
					invite_complete: boolean;
					last_name: string;
				};
				Insert: {
					coach_id: string;
					code?: string;
					email?: string;
					first_name?: string;
					id?: string;
					invite_complete?: boolean;
					last_name?: string;
				};
				Update: {
					coach_id?: string;
					code?: string;
					email?: string;
					first_name?: string;
					id?: string;
					invite_complete?: boolean;
					last_name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'client_invites_coach_id_fkey';
						columns: ['coach_id'];
						isOneToOne: false;
						referencedRelation: 'coaches';
						referencedColumns: ['id'];
					}
				];
			};
			coaches: {
				Row: {
					accessed_alpha_already: boolean;
					alpha_key: number;
					avatar_url: string | null;
					company_name: string | null;
					full_name: string | null;
					id: string;
					website: string | null;
				};
				Insert: {
					accessed_alpha_already?: boolean;
					alpha_key?: number;
					avatar_url?: string | null;
					company_name?: string | null;
					full_name?: string | null;
					id: string;
					website?: string | null;
				};
				Update: {
					accessed_alpha_already?: boolean;
					alpha_key?: number;
					avatar_url?: string | null;
					company_name?: string | null;
					full_name?: string | null;
					id?: string;
					website?: string | null;
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
						foreignKeyName: 'days_program_id_fkey';
						columns: ['program_id'];
						isOneToOne: false;
						referencedRelation: 'programs';
						referencedColumns: ['id'];
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
					muscle_groups: Database['public']['Enums']['muscle_group'][];
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
					muscle_groups: Database['public']['Enums']['muscle_group'][];
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
					muscle_groups?: Database['public']['Enums']['muscle_group'][];
					name?: string;
					note?: string;
					updated_at?: string;
					video?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_exercises_userId_fkey';
						columns: ['coach_id'];
						isOneToOne: false;
						referencedRelation: 'coaches';
						referencedColumns: ['id'];
					}
				];
			};
			library_workouts: {
				Row: {
					coach_id: string;
					id: string;
					name: string;
				};
				Insert: {
					coach_id?: string;
					id?: string;
					name?: string;
				};
				Update: {
					coach_id?: string;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'library_workouts_coach_id_fkey';
						columns: ['coach_id'];
						isOneToOne: false;
						referencedRelation: 'coaches';
						referencedColumns: ['id'];
					}
				];
			};
			programs: {
				Row: {
					experience_level: Database['public']['Enums']['experienceLevel'];
					id: string;
					modality: Database['public']['Enums']['modality'];
					name: string;
					split_length: number;
					user_id: string;
				};
				Insert: {
					experience_level?: Database['public']['Enums']['experienceLevel'];
					id?: string;
					modality?: Database['public']['Enums']['modality'];
					name?: string;
					split_length?: number;
					user_id?: string;
				};
				Update: {
					experience_level?: Database['public']['Enums']['experienceLevel'];
					id?: string;
					modality?: Database['public']['Enums']['modality'];
					name?: string;
					split_length?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_programs_userId_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'coaches';
						referencedColumns: ['id'];
					}
				];
			};
			workout_instances: {
				Row: {
					day_id: string;
					id: string;
				};
				Insert: {
					day_id: string;
					id?: string;
				};
				Update: {
					day_id?: string;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'workout_instances_day_id_fkey';
						columns: ['day_id'];
						isOneToOne: false;
						referencedRelation: 'days';
						referencedColumns: ['id'];
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
				| 'Muscle Gain'
				| 'Fat Loss'
				| 'Body Recomposition'
				| 'Strength Gain'
				| 'Maintenance'
				| 'Endurance'
				| 'Speed'
				| 'Sport'
				| 'Other';
			dayType: 'RestDay' | 'TrainingDay';
			default_tracking_field:
				| 'weight'
				| 'reps'
				| 'rir'
				| 'rest'
				| 'distance'
				| 'pace'
				| '%1rm'
				| '%hr';
			equipment:
				| 'Dumbbell'
				| 'Barbell'
				| 'Pin Machine'
				| 'Plate Machine'
				| 'Smith Machine'
				| 'Cable';
			experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
			happiness: 'angry' | 'frown' | 'meh' | 'smile' | 'laugh';
			modality:
				| 'Hypertrophy'
				| 'Strength'
				| 'Powerbuilding'
				| 'Sport-Specific'
				| 'Power'
				| 'Cardiovascular'
				| 'Flexibility';
			muscle_group:
				| 'Biceps'
				| 'Triceps'
				| 'Forearm Flexors'
				| 'Forearm Extensors'
				| 'Side Delts'
				| 'Front Delts'
				| 'Rear Delts'
				| 'Chest'
				| 'Traps & Rhomboids'
				| 'Lats'
				| 'Abs'
				| 'Glutes'
				| 'Hamstrings'
				| 'Quads'
				| 'Adductors'
				| 'Calves';
			unit: 'kgs' | 'lbs';
			variation:
				| 'Standing'
				| 'Seated'
				| 'Lying (Face-Up)'
				| 'Lying (Face-Down)'
				| 'Incline'
				| 'Decline'
				| 'Kneeling'
				| 'Split-Stance'
				| 'Side-Lying'
				| 'Wall-Supported'
				| 'Hanging'
				| 'Plank-Position'
				| 'Bent-Over'
				| 'Chest-Supported'
				| 'Forward-Leaning';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
