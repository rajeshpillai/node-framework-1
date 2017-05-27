Handlebars.registerHelper('toJSON', function(object){
	return new Handlebars.SafeString(JSON.stringify(object));
});

function render(name, options) {
    console.log("rendering: ", name, posts);
    $.get(`/templates/${name}.hbs`).then(function (response){
        console.log("response: ", response);
        var template = Handlebars.compile(response);
        $("#outlet").html(template({posts: posts}));
    })
}
