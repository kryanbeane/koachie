import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

Deno.serve(async (req) => {
	const { email } = await req.json();

	const supabase = createClient(
		Deno.env.get('SUPABASE_URL') ?? '',
		Deno.env.get('SUPABASE_ANON_KEY') ?? ''
	);

	const { error } = await supabase.auth.signInWithOtp({
		email: email,
		options: {
			shouldCreateUser: true,
			emailRedirectTo: 'https://app.koach.ie/home'
		}
	});

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const data = {
		message: `Magic link sent to ${email}!`
	};

	return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
});
