$(document).ready(function() {
    var menuItems

    $.get('/api/burgers', function(data) {
        menuItems = data;
        console.log(menuItems)
        if (!menuItems) {
            $('.menu').html('<h2> No Burgers Yet! Add one below to get started!')
        } else {
            for (var i = 0; i < menuItems.length; i++) {
                if (!menuItems[i].devoured) {
                    getMenu(menuItems[i].id, menuItems[i].burger_name, menuItems[i].burger_type)
                }
            }
        $('.delete').click(deleteData)
        $('.eat').click(updateData)
        }
    })

    $('.submit').on('click', function() {
        var bNewName = $('.bName').val().trim();
        var bNewType = $('.bType').val().trim();
        console.log(bNewName)
        console.log(bNewType)
        var newBurger = {
            bName: bNewName,
            bType: bNewType,
        }
        console.log(newBurger);
        postData(newBurger)
    })

    function postData(BurgerTime) {
        $.post('/api/burgers', BurgerTime, function() {
            window.location.href = '/'
        })
    }

    function deleteData() {
        var selector = $(this).attr('id');
        $.ajax({
            method: "DELETE",
            url: '/api/burgers/' + selector
        }).done(
            window.location.href = '/'
        );
    }

    function updateData() {
        var selector = ""
        selector = $(this).attr('id');
        var eaten = true;
        var body = {
            id: selector,
            devoured: eaten,
        }
       $.ajax({
           method: "PUT",
           url: "/api/burgers",
           data: body
        }).done(function() {
            window.location.href = "/";
        });
    }

    function getMenu (number, burger, toppings) {  
        var newItem = $('<li>');
        var button = $('<button>Delete</button>');
        var eatButton = $('<button>Eat Me!</button>')
        var id = number;

        $(newItem).append('<h2> Burger Name: ' + burger + '<br> Toppings: ' + toppings + "</h2>")
        $(eatButton).attr('class', 'eat');
        $(eatButton).attr('id', id);
        $(button).attr('class', 'delete');
        $(button).attr('id', id);

        $(newItem).append(button);
        $(newItem).append(eatButton);           
        $('.menu').append(newItem);
    }
})