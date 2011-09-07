function TodoList() {
    var finished_list_element = $(".finished ul");
    var unfinished_list_element = $(".unfinished ul");
    var input_new_task = $("input[type=text]");
    
    $("form").bind("submit", function (event) {
        event.preventDefault();
        process_new_task_input(input_new_task);
    });
    
    input_new_task.focus();

    function process_new_task_input(input) { 
        var task_name = input.val();
        add_task(task_name);
        input.val("");
    }

    function add_task(task_name) {
        var new_task_element = create_task_element(task_name);
        move_task_element_to_unfinished(new_task_element);
    }

    function create_task_element(task_name) {
        var task_element = $("<li>");
        var checkbox_element = $("<input type='checkbox' />");
        task_element.append(checkbox_element);
        task_element.append(task_name);  
        task_element.append(create_delete_element(task_element));
        return task_element;
    }
    
    function create_delete_element(task_element) {
        var a_delete_element = $("<a href='#'>[x]</a>");
        a_delete_element.click(function(event){
            event.preventDefault();
            if (window.confirm("Do you want to delete this task?")) {
                task_element.remove();
            }
        });
        return a_delete_element;
    }
    
    function move_task_element_to_finished(task_element) {
        var checkbox_element = $("input", task_element);
        checkbox_element.unbind("change");
        checkbox_element.bind("change", function () {
            move_task_element_to_unfinished(task_element);
        });
        finished_list_element.append(task_element);
    }

    function move_task_element_to_unfinished(task_element) {
        var checkbox_element = $("input", task_element);
        checkbox_element.unbind("change");
        checkbox_element.bind("change", function() {
            move_task_element_to_finished(task_element);
        });
        unfinished_list_element.append(task_element);
    }
}
