// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";

export default class PostsController {


  /**
   * name
   */
  public async index({ response }) {
    const getposts = await Post.all();
    return response.ok(getposts);
  }


  public async store({ request, response }) {
    // First Method By creating a object
    const post = new Post()
    //accepting inputs
    post.name = request.body().name
    post.description = request.body().description
    //saving inputs
    await post.save()
    // const array = ["Posts"];
    // array.push(post);
    return response.ok(post);
  }

  public async update({ request, params, response }) {
    // return "HTING";
    const post = await Post.findOrFail(params.id);

    if (!post) {
      return response.notFound({ message: "Post Not Found" });
    }

    post.name = request.body().name
    post.description = request.body().description
    await post.save();
    return response.ok("Updated Successfully");
  }

  public async destroy({ response, request, params }) {
    const post = await Post.find(params.id);
    if (!post) {
      return response.notFound({ message: "Post Not Found" });
    }
    post.delete();
    return response.ok("Deleted Successfully");
  }
}
