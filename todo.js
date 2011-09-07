$(function () {
    var input_new_task = $("input[type=text]");
    $("form").bind("submit", function (event) {
        event.preventDefault();
        process_new_task_input(input_new_task);
    });
    test(input_new_task);
});

function process_new_task_input(input) { 
    var task_name = input.val();
    var task_element = create_task_element(task_name);
    add_task_to_unfinished(task_element);
    input.val("");
}

function add_task_to_unfinished(task_element) {
    var checkbox_element = $("input", task_element);
    checkbox_element.unbind('change');
    checkbox_element.bind('change', function() {
        move_task_element_to_finished(task_element);
    }); 
    $("ul.todo").append(task_element);
}

function create_task_element(task_name) {
    var task_element = $("<li>");
    var checkbox_element = $("<input type='checkbox' />");
    task_element.append(checkbox_element);
    task_element.append(task_name);
    return task_element;
}


function move_task_element_to_finished(task_element) {
    var checkbox_element = $("input", task_element);
    checkbox_element.unbind('change');
    checkbox_element.bind('change', function () {
        add_task_to_unfinished(task_element);
    });
    $(".finished ul").append(task_element);
}

/* TEST SUITE */

function test(input_new_task) {
    test_add_task(input_new_task, "Task1");
    test_add_task(input_new_task, "Task2");
    $("ul.todo li:contains(Task2) input").trigger("click");
}

function test_add_task(input_new_task, task_name) {
    input_new_task.val(task_name);
    $("form").submit();
}
