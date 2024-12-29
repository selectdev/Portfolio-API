import { FastifyReply, FastifyRequest } from "fastify";
import "dotenv/config";

export default {
	url: "/spotify/@top",
	method: "GET",
	schema: {
		summary: "Get top 4 tracks",
		description: "Returns the top 4 tracks listened by portfolio owner",
		tags: ["spotify"],
	},
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		const params = new URLSearchParams();
		params.append("grant_type", "refresh_token");
		params.append("refresh_token", process.env.SPOTIFY_REFRESH);

		const auth = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
				).toString("base64")}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params.toString(),
		}).then(async (a) => {
			if (!a.ok) {
				const errorData = await a.json();
				console.error("Failed to refresh access token:", errorData);
				throw new Error(`HTTP error! status: ${a.status}`);
			} else return await a.json();
		});

		await fetch(
			"https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=4&offset=0",
			{
				headers: {
					Authorization: "Bearer " + auth.access_token,
				},
			}
		).then(async (a) => {
			if (!a.ok) {
				const errorData = await a.json();
				console.error("Failed to refresh access token:", errorData);
				throw new Error(`HTTP error! status: ${a.status}`);
			} else {
				const d = await a.text();
				if (d === null || d === "")
					return reply.send({
						message: "Sorry! I'm not currently listening to music!",
						error: true,
					});
				else return reply.send(JSON.parse(d));
			}
		});
	},
};
