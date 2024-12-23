const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const handler = async (req: Request): Promise<Response> => {
	const { invite } = await req.json();
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`
		},
		body: JSON.stringify({
			from: 'bryan@koach.ie',
			to: invite.email,
			subject: 'A Koach has invited you to join their team!',
			html: `Click this link https://app.koach.ie/invite/${invite.code} to join the team!`
		})
	});

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

Deno.serve(handler);
