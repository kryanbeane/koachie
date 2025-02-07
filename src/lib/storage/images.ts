import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadImageFromUrl(
	supabase: SupabaseClient,
	url: string,
	user_id: string
): Promise<string> {
	const response = await fetch(url);
	const imageBlob = await response.blob();
	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(user_id, imageBlob, { upsert: true, contentType: "image/jpeg" });
	if (error) {
		throw new Error(error.message);
	}
	return data.fullPath;
}

// export async function fetchImage(supabase: SupabaseClient, user_id: string): Promise<string> {
//     const { signedURL, error } = await supabase.storage.from("avatars").createSignedUrl(user_id, 60);
//     if (error) {
//         throw new Error(error.message);
//     }
//     return signedURL;
// }
