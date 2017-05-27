Handlebars.registerHelper('toJSON', function(object){
	return new Handlebars.SafeString(JSON.stringify(object));
});

function render(name, options) {
    $.get(`/templates/${name}.hbs`).then(function (response){
        var template = Handlebars.compile(response);
        $("#outlet").html(template({posts: posts}));
    })
}
