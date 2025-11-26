function getEnv(varName) {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Environment variable ${varName} is not set`);
  }
  return value;
}

const mongoUser = getEnv("INIT_DB_USERNAME");
const mongoPass = getEnv("INIT_DB_PASSWORD");
const mongoDb = getEnv("INIT_DB_NAME");

// app default user
const initUsername = getEnv("INIT_USERNAME");
const initName = getEnv("INIT_NAME");
const initPasswordHash = getEnv("INIT_PASSWORD_HASH");

const data = [
  {
    title: "First blog",
    author: "Admin",
    url: "http://example.com/first-blog",
    likes: 10,
  },
];

const init = async () => {
  console.log("MongoDB initialization script");

  db.createUser({
    user: mongoUser,
    pwd: mongoPass,
    roles: [
      {
        role: "dbOwner",
        db: mongoDb,
      },
    ],
  });

  db.createCollection("users");

  const { insertedId: userId } = await db.users.insertOne({
    username: initUsername,
    name: initName,
    passwordHash: initPasswordHash,
    blogs: [],
  });

  console.log("Created initial user:", userId);

  db.createCollection("blogs");

  for (let blog of data) {
    const createdBlog = await db.blogs.insertOne({
      ...blog,
      user: userId,
    });

    console.log("Created blog:", createdBlog.insertedId);
    await db.users.updateOne(
      { _id: userId },
      { $push: { blogs: createdBlog.insertedId } }
    );
  }
};
init()
  .then(() => {
    console.log("MongoDB initialization completed");
  })
  .catch((error) => {
    console.log("Error during MongoDB initialization:", error);
  });
