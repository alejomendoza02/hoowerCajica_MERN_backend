import Post from "../models/Post.js";


// ---------------------Private zone---------------------

// Create a post

const newPostAdmin = async (req, res) => {

  // Create the post with the info that has been sent
  const post = new Post(req.body);

  // Assign the creator of the post.

  post.author = req.admin._id;

  // Trycatch for save the post

  try {
    // Save the post in the DB

    const postSaved = await post.save();
    res.json(postSaved);
  } catch (error) {
    console.log(error);
  }
};

// Get posts

const getPostsAdmin = async (req, res) => {

  // How is only a Blog for one person, it doesn't matter if the other admins edit a Post that the haven't created

  const posts = await Post.find().sort({createdAt: 'desc'});
  res.json(posts);
};

// Get a single post

const getPostAdmin = async (req, res) => {

  const { id } = req.params;

  if (id.length < 24) {
    const error = new Error("Este post no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Found the post based on the ID

  const post = await Post.findById(id);

  // Verify if the post exists

  if (!post) {
    const error = new Error("Post no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(post);
};

const editPostAdmin = async (req, res) => {

  const { id } = req.params;

  if (id.length < 24) {
    const error = new Error("Este post no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Found the post based on the ID

  const post = await Post.findById(id);
  // Verify if the post exists

  if (!post) {
    const error = new Error("Post no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // If the info was sended replace it, in the other case, left the same information

  post.title = req.body.title || post.title;
  post.img_header = req.body.img_header || post.img_header;
  post.body = req.body.body || post.body;
  post.tipo = req.body.tipo || post.tipo;
  post.published = req.body.published || post.published;

  try {
    const postSaved = await post.save();
    res.json(postSaved);
  } catch (error) {
    console.log(error);
  }
};

const deletePostAdmin = async (req, res) => {

  const { id } = req.params;

  if (id.length < 24) {
    const error = new Error("Este post no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Found the post based on the ID

  const post = await Post.findById(id);
  // Verify if the post exists

  if (!post) {
    const error = new Error("Post no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
      await post.deleteOne();
      res.json({
          msg: "Post eliminado con éxito"
      })
  } catch (error) {
      console.log(error);
  }
};

// ---------------------Public zone---------------------

const getPosts = async (req, res) => {
  const posts = await Post.find().where("published").equals(true).sort({createdAt: 'desc'});
  res.json(posts);
};

const getPost = async (req, res) => {

  const { id } = req.params;

  if (id.length < 24) {
    const error = new Error("Este post no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Found the post based on the ID

  const post = await Post.findById(id);

  // Verify if the post exists

  if (!post || post.published === false) {
    const error = new Error("Post no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(post);
};

export {
  getPostsAdmin,
  newPostAdmin,
  getPostAdmin,
  editPostAdmin,
  deletePostAdmin,
  getPosts,
  getPost,
};
