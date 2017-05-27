var posts = [
  {
    permalink: 'about',
    title: 'About Learn by building a front end framework',
    content: "Master JS by buidling a front end framework from scratch."
  },
  {
    permalink: 'favs',
    title: 'How to use the router like a boss',
    content: '<p>Favorite: Getting into the depth of router</p>'
  },
];

var router = new Router();

router.map(function () {
    this.route("posts", { path: '/posts'});
    this.route("post", { path: '/posts/:permalink'});
    this.route("favorites", { path: '/favs'});
});
