$(function () {
    var input_new_task = $("input[type=text]");
    $("form").bind("submit", function (event) {
        event.preventDefault();
        process_new_task_input(input_new_task);
    });
    test_add_task(input_new_task);
});

function process_new_task_input(input) { 
    var task_name = input.val();
    add_task(task_name);
    input.val("");
}

function add_task(task_name) {
    var new_task_element = create_task_element(task_name); 
    $("ul").append(new_task_element);
}

function test_add_task(input_new_task) {
    input_new_task.val("Task1");
    $("form").submit();
}

function create_task_element(task_name) {
    var new_task_element = $("<li>");
    var checkbox_element = $("<input type='checkbox' />");
    checkbox_element.bind('click', function() {
        alert("checkbox clicked");
    });
    new_task_element.append(checkbox_element);
    new_task_element.append(task_name);
    
    return new_task_element;
}

