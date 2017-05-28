function render(name, options) {
    var qs = options.qs;
    var post = posts.filter(function (p) {
        if (p.permalink === qs) {
            return p;
        }
    })[0];
    console.log("post: ", qs, post);
    $.get(`/templates/${name}.hbs`).then(function (response){
        var template = Handlebars.compile(response);
        $("#outlet").html(template({post: post}));
    })
}
