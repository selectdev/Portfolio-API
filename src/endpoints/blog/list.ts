import * as database from "../../database/database.js";
import { FastifyReply, FastifyRequest } from "fastify";

export default {
	url: "/blog/list",
	method: "GET",
	schema: {
		summary: "Get all blog posts",
		description: "Returns all blog posts.",
		tags: ["blog"],
	},
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		let posts = await database.BlogPosts.GetAllPosts();
		return reply.send(posts);
	},
};
