var posts = [
  {
    id: 1,
    permalink: 'about',
    title: 'About Learn by building a front end framework',
    content: "Master JS by buidling a front end framework from scratch.",
    comments: [
      { id: 1, comment: "Can you please explain in detail the popstate?", postedBy: "learner"},
      { id: 1, comment: "Sure I will", postedBy: "rajesh"},
    ]
  },
  {
    id: 2,
    permalink: 'favs',
    title: 'How to use the router like a boss',
    content: '<p>Favorite: Getting into the depth of router</p>'
  },
];

var router = new Router();

router.map(function () {
    this.route("posts", { path: '/posts'});
    this.route("post", { path: '/post/:permalink'});
    this.route("comments", { path: '/posts/:permalink/comments'});
    this.route("favorites", { path: '/favs'});
});
