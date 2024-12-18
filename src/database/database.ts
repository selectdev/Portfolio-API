// Import packages
import { blogposts, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Configure PrismaClient

// BlogPosts
class BlogPosts {
	static async createPost(post: blogposts): Promise<boolean | Error> {
		try {
			await prisma.blogposts.create({
				data: post,
			});

			return true;
		} catch (error) {
			return error;
		}
	}

	static async get(data: Prisma.blogpostsWhereUniqueInput) {
		const doc = await prisma.blogposts.findUnique({
			where: data,
		});

		if (!doc) return null;
		else return doc;
	}

	static async find(data: Prisma.blogpostsWhereInput) {
		const docs = await prisma.blogposts.findMany({
			where: data,
		});

		return docs;
	}

	static async GetAllPosts() {
		const docs = await prisma.blogposts.findMany();
		return docs;
	}

	static async updatePost(id: string, data: any): Promise<boolean | Error> {
		try {
			await prisma.blogposts.update({
				where: {
					id: id,
				},
				data: data,
			});

			return true;
		} catch (err) {
			return err;
		}
	}

	static async delete(id: string) {
		try {
			await prisma.blogposts.delete({
				where: {
					id: id,
				},
			});

			return true;
		} catch (err) {
			return err;
		}
	}
}

// Export Classes
export { BlogPosts };
